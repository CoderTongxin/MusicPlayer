import React,{Component} from 'react'
import './background.less'

class Cover extends Component{
    render(){
        return(
            <div>
                <div className='coverBox' style={{backgroundImage:`url(${this.props.bg.replace(/130/g,'550')})`}}> </div>
                <div className='coverBg'> </div>
            </div>
        )
    }
}
export default Cover;