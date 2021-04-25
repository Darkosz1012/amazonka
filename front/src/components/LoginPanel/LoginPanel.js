import React, {Component} from 'react';
import './LoginPanel.css'
import LoginForm from './comp/LoginForm'
import RegisterForm from './comp/RegisterForm'
import Button from '../UI/Button/Button';

class LoginPanel extends Component{

    constructor(props)
    {
        super(props)
        this.state = {
            isRegister: false
        }
    }

    showLogin = () => {
        this.setState({
            isRegister: false
        })
    }
    showRegister = () => {
        this.setState({
            isRegister: true
        })
    }

    render(){
        return(
            <div className="login-register-div">
                <div className="buttons">
                    <Button className="choose-btn" onClick={this.showLogin} placeholder="ZALOGUJ SIĘ" />
                    <Button className="choose-btn" onClick={this.showRegister} placeholder="ZAREJESTRUJ SIĘ"/>
                </div>
                <br/>
                <div className="login-div"> 
                    {!this.state.isRegister && <LoginForm />}
                    {this.state.isRegister && <RegisterForm />}
                </div>
            </div>
        )
    }
}
export default LoginPanel;