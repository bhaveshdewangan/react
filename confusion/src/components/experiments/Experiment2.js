import React from "react"
import HOC from './HOC'

const Experiment2 = (props) => {
    let callBackRef = null;
    return (
        <div>
            <input type='text' ref={(element) => { callBackRef = element }}></input>
            <button onClick={props.handleClick}> Search Text</button>
        </div>
    )
}
export default HOC(Experiment2, {style:{ background: 'aqua', height: '40px', width: '100'}});