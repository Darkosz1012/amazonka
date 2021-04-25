import React, { Component } from 'react'
import './Input.css'

class Input extends Component {
    render() {
        return (
            <input 
                type={this.props.type}
                placeholder={this.props.placeholder} 
                className={this.props.className}
                value={this.props.value} 
                onChange={this.props.onChange}
            />
        )
    }
}

export default Input;
