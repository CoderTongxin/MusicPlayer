import React from 'react'
import Progress from '../components/progress'
import './player.less'

let duration = null;
class Player extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            progress: '-'
        };
    }
    componentDidMount(){

        $('#player').bind($.jPlayer.event.timeupdate, (e) =>{
            duration = e.jPlayer.status.duration;
            this.setState({
                progress : e.jPlayer.status.currentPercentAbsolute
            });
        })
    }
    componentWillUnmount(){
        $('#player').unbind($.jPlayer.event.timeupdate);
    }

    progressChangeHandler(progressPercent){
        console.log(duration);
        $('#player').jPlayer('play',duration * progressPercent);
    }
    changeVolumeHandler(){

    }
    render(){
        return(
            <div className='player-page'>
                <h1 className='caption'>我的私人音乐坊</h1>
                <div className="mt20 row">
                    <div className="controll-wrapper">
                        <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
                        <h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
                        <div className="row mt20">
                            <div className="volume-container">
                                <i className="icon-volume rt" style={{top:5,left:-5}}> </i>
                                <div className="volume-wrapper">
                                    <Progress progress={this.state.volume} onProgressChange={this.changeVolumeHandler} />
                                </div>
                            </div>
                        </div>
                        <div style={{height:10,lineHeight:'10px'}}>
                            <Progress progress={this.state.progress} onProgressChange={this.progressChangeHandler.bind(this)} />
                            <div className="left-time -col-auto">/*{(this.state.time/60).toFixed(0)>10?10:'0'+(this.state.time/60).toFixed(0)} : {((this.state.time).toFixed(0)%60<10) ? '0'+(this.state.time).toFixed(0)%60 : (this.state.time).toFixed(0)%60}*/ s</div>
                        </div>
                        <div className="mt35 row">
                            <div>
                                <i className="icon prev" onClick={this.playPrev.bind(this)}> </i>
                                <i className={`icon ml20 ${Math.ceil(this.state.time)>= Math.ceil(duration) ? 'play' : this.state.isPlay ? 'pause':'play'}`} onClick={this.play.bind(this)}> </i>
                                <i className="icon next ml20" onClick={this.playNext.bind(this)}> </i>
                            </div>
                            <div className="-col-auto">
                                <i className="icon repeat-cycle"> </i>
                            </div>
                        </div>
                    </div>
                    <div className='-col-auto cover' >
                        <img className={`${Math.ceil(this.state.time)>= Math.ceil(duration) ? 'pause' : this.state.isPlay ? '':'pause'}`} src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
                    </div>
                </div>


                <div id="player"> </div>
                <Progress progress={this.state.progress}
                          onProgressChange={this.progressChangeHandler}> </Progress>
            </div>

        )
    }

}

export default Player