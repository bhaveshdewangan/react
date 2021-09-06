import React, { Component } from "react"
import HOC from './HOC'

class Experiment1 extends Component {
    constructor(props) {
        super(props)
        this.inputRef = React.createRef()
    }

    componentDidMount() {
        this.inputRef.current.focus();
    }

    render() {
        return (
            <div>
                <input type='text' ref={this.inputRef}></input>
                <button onClick={this.props.handleClick}> Search Text</button>
            </div>
        )
    }
}

export default HOC(Experiment1, {style:{ background: 'orange', height: '40px', width: '100'}});