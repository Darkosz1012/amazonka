import React, { Component } from "react";
import "./Button.css";

class Button extends Component {
    render() {
        return (
            <button
                className={this.props.className}
                onClick={this.props.onClick}
                placeholder={this.props.placeholder}
            >
                {" "}
                {this.props.placeholder}{" "}
            </button>
        );
    }
}
export default Button;
