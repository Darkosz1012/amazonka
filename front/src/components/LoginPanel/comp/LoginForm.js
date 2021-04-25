import React, { Component } from 'react'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'

class LoginForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            login: '',
            password: ''
        }
    }

    handleLoginChange = (event) => {
        this.setState({
            login: event.target.value
        })
    }

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleSubmit = (event) => {
        alert(`${this.state.login} - ${this.state.password}`);
    }

    render() {
        const {login, password} = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <Input 
                    type="text" 
                    placeholder="Login" 
                    className="text-input"
                    value={login} 
                    onChange={this.handleLoginChange}
                    /> <br/>
                <Input 
                    type="password" 
                    placeholder="Hasło"
                    className="text-input"
                    value={password} 
                    onChange={this.handlePasswordChange}
                    /> <br/>
                <Button type="submit" placeholder="Zaloguj się" className="submit-btn"/>
            </form>
        )
    }
}

export default LoginForm;