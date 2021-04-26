import React, { Component } from 'react'
import './Button.css'

class Button extends Component {
    render() {
        return (
            <button className={this.props.className} onClick={this.props.onClick}> {this.props.placeholder} </button>
        )
    }
}

export default Button;