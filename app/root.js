import React from 'react';
import Header from './components/header';
import Progress from './components/progress'



class Root extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            progress: '-'
        };
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
         $('#player').bind($.jPlayer.event.timeupdate, (e) =>{
              this.setState({
                  progress : e.jPlayer.status.currentPercentAbsolute
              });
         })
     }

    componentWillUnmount(){
        $('#player').unbind($.jPlayer.event.timeupdate);
    }

    render(){
        return(
            <div>
                <Header />
                <div id="player"> </div>
                <Progress progress={this.state.progress}> </Progress>
            </div>

        )
    }
}


export default Root;