import React from 'react'
import './progress.less'

class Progress extends React.Component{

    constructor(props) {
        super(props);
        this.changeProgress=this.changeProgress.bind(this)
        /*函数是在浏览器全局对象执行的，此时this不指向react组件部分,使用es6语法的话，需要手动绑定。*/
    }

    changeProgress(e){
       let progressBar = this.refs.progressBar;
       let progressPercent = (e.clientX - progressBar.getBoundingClientRect().left)/progressBar.clientWidth;
        this.props.onProgressChange && this.props.onProgressChange(progressPercent)
    }

    render(){
        return(
            <div className="components-progress" ref="progressBar" onClick={this.changeProgress}>
                <div className="progress" style={{width:`${this.props.progress}%`}} > </div>
            </div>

        );
    }
}

export default Progress;