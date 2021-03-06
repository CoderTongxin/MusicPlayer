import React from 'react'
import  './musiclistitem.less'
import Pubsub from 'pubsub-js'

class musicListItem extends React.Component{



    playMusic(musicItem){
        Pubsub.publish('PLAY_MUSIC' , musicItem);
        Pubsub.publish('IS_PLAY' , true);
    }
    deleteMusic(musicItem , event){
        event.stopPropagation();
        Pubsub.publish('DELETE_MUSIC' , musicItem);
        if(this.state.currentMusicItem === musicItem){
            this.playNext('next');
        }
    }


render(){

    let musicItem = this.props.musicItem;

    return(
        <li  onClick={this.playMusic.bind(this,musicItem)} className={`components-listitem row ${this.props.focus ? 'focus':''}`}>
            <p><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
            <p onClick={this.deleteMusic.bind(this,musicItem)} className='-col-auto delete'> </p>
        </li>
    )
}
}

export default musicListItem