import React from 'react'
import './hello.less'

let Hello = React.createClass(
    {
        render(){
            return(
                <div className="hello-component">
                    Hello react,this is gin
                </div>
            )
        }
    }
);

export default Hello;