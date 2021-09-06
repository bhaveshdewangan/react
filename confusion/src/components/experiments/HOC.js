import React, { Component } from "react";

const HOC = (WrappedComponent, data) => {
    class HigerOrderComponent extends Component {
        constructor(props) {
            super(props)
            console.log("DATA", data)
            this.handleClick = this.handleClick.bind(this)
        }

        handleClick() {
            console.log("SEARCH TEXT", this.props);
        }

        render() {
            return (
                <div style={data.style}>
                    <WrappedComponent handleClick={() => this.handleClick()} />
                </div>
            )
        }
    }
    return HigerOrderComponent;
}

export default HOC;