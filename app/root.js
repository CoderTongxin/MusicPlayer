import React from 'react';
import Header from './components/header';
import Player from "./page/player";
import {MUSIC_LIST} from './config/music'
import MusicList from './page/musiclist'
import Pubsub from 'pubsub-js'
import {Router, IndexRoute, Route, hashHistory} from 'react-router'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            musicList: MUSIC_LIST,
            currentMusicItem: MUSIC_LIST[0],
            isPlay: null,
            repeatType: 'cycle'
        }
    }

    playMusic(musicItem) {
        $('#player').jPlayer('setMedia', {
            mp3: musicItem.file
        }).jPlayer('play');
        this.setState({
            currentMusicItem: musicItem
        })
    }

    playNext(type = 'text') {

        let index = this.findMusicIndex(this.state.currentMusicItem);
        let newIndex = null;
        let length = this.state.musicList.length;
        if (type === 'next') {
            newIndex = (index + 1) % length;
        } else {
            newIndex = (index - 1 + length) % length;
        }
        this.playMusic(this.state.musicList[newIndex])
    }

    getRandomValue(min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    playWhenEnd(){

        if(this.state.repeatType==='random'){
            let length=this.state.musicList.length-1;
            let index=this.findMusicIndex(this.state.currentMusicItem);
            let randomIndex=this.getRandomValue(0, length);
            while(index===randomIndex){
                randomIndex = this.getRandomValue(0, length);
            }
            this.playMusic(this.state.musicList[randomIndex]);
        }else if(this.state.repeatType==='once'){
            this.playMusic(this.state.currentMusicItem);
        }else{
            this.playNext('next');
        }
    }

    findMusicIndex(musicItem) {
        return this.state.musicList.indexOf(musicItem);
    }

    componentDidMount() {

        let repeatList = [
            'cycle',
            'once',
            'random'
        ];

        $('#player').jPlayer({
            supplied: 'mp3',
            wmode: 'window'
        });

        this.playMusic(this.state.currentMusicItem);

        $('#player').bind($.jPlayer.event.ended, (e) => {
            this.playWhenEnd();
        });

        Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
            this.playMusic(musicItem)
        });

        Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
            if (this.state.currentMusicItem === musicItem) {
                this.playNext('next');
            }
            this.setState({
                musicList: this.state.musicList.filter(item => {
                    return item !== musicItem
                })
            });

        });


        Pubsub.subscribe('IS_PLAY', (msg, isPlay) => {
            this.setState({
                isPlay: true
            })
        });
        Pubsub.subscribe('PLAY_PREV', (msg) => {
            this.playNext('prev')
        });
        Pubsub.subscribe('PLAY_NEXT', (msg) => {
            this.playNext('next')
        });

        Pubsub.subscribe('CHANAGE_REPEAT',(msg)=>{

            let index=repeatList.indexOf(this.state.repeatType);
            index=(index+1)%repeatList.length;
            this.setState({
                repeatType:repeatList[index],
                isPlay: true
            });
        })
    }

    componentWillUnmount() {

        Pubsub.unsubscribe('DELETE_MUSIC');
        Pubsub.unsubscribe('PLAY_MUSIC');
        Pubsub.unsubscribe('PLAY_PREV');
        Pubsub.unsubscribe('PLAY_NEXT');
        Pubsub.unsubscribe('IS_PLAY');
        Pubsub.unsubscribe('CHANAGE_REPEAT');
        $('#player').unbind($.jPlayer.event.ended)
    }


    render() {
        return (
            <div>
                <Header/>
                {React.cloneElement(this.props.children, this.state)}
            </div>

        )
    }

}

class Root extends React.Component {

    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={App}>
                    <IndexRoute component={Player}> </IndexRoute>
                    <Route path='/list' component={MusicList}> </Route>
                </Route>
            </Router>
        )
    }
}


export default Root;