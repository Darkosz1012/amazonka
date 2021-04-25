import React, { Component } from 'react'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'

class RegisterForm extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            login: '',
            password: '',
            password2: ''
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

    handlePassword2Change = (event) => {
        this.setState({
            password2: event.target.value
        })
    }

    handleSubmit = (event) => {
        alert(`${this.state.login} - ${this.state.password}`);
    }

    render() {
        const {login, password1, password2} = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <Input type="text" placeholder="Login" className="text-input" value={login} onChange={this.handleLoginChange}/> <br/>
                <Input type="password" placeholder="Hasło" className="text-input" value={password1} onChange={this.handlePasswordChange}/> <br/>
                <Input type="password" placeholder="Powtórz hasło" className="text-input" value={password2} onChange={this.handlePassword2Change}/> <br/>
                <Button type="submit" className="submit-btn" placeholder="Zarejestruj się"/>
            </form>
        )
    }
}

export default RegisterForm;