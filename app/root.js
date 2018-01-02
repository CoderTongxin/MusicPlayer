import React from 'react';
import Header from './components/header';
import Player from "./page/player";
import {MUSIC_LIST} from './config/music'
import MusicList from './page/musiclist'
import {Router, IndexRouter,Link, Route,hashHistory} from 'react-router'

class App extends React.Component{

    constructor(props){
        super(props);
        this.state= {
            musicList: MUSIC_LIST,
            currentMusicItem: MUSIC_LIST[0],
            isPlay:null
        }
    }

    componentDidMount(){

        $('#player').jPlayer({
            ready:function(){
                $(this).jPlayer('setMedia',{
                    mp3:'http://res.webftp.bbs.hnol.net/zhangyu/music/cd114/01.mp3'
                }).jPlayer('play');
            },
            supplied:'mp3',
            wmode:'window'
        });
    }

    componentWillUnmount(){

    }


    render() {
        return (
            <div>
                <Header/>
                <Player currentMusicItem={this.state.currentMusicItem}/>
                <MusicList currentMusicItem={this.state.currentMusicItem} musicList={this.state.musicList}/>
            </div>

        )
    }

}

class Root extends React.Component{

    render(){
        return (
            <Router history={hashHistory}>
                <Route path='/' component={App}>
                    <Route> </Route>
                </Route>
            </Router>
        )
    }
}


export default Root;