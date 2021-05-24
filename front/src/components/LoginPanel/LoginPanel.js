import React, { Component } from "react";
import "./LoginPanel.css";
import LoginForm from "./comp/LoginForm";
import RegisterForm from "./comp/RegisterForm";
import Button from "../UI/Button/Button";
import { Fragment } from "react";

class LoginPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegister: false,
        };
    }

    showLogin = () => {
        this.setState({
            isRegister: false,
        });
    };

    showRegister = () => {
        this.setState({
            isRegister: true,
        });
    };

    render() {
        return (
            <div className="login-register-div">
                <div className="login-div">
                    {!this.state.isRegister && <LoginForm />}
                    {this.state.isRegister && <RegisterForm />}
                </div>
                <div className="buttons">
                    {this.state.isRegister ? (
                        <Fragment>
                            Masz już konto?
                            <Button
                                className="btn btn-outline-primary"
                                onClick={this.showLogin}
                                placeholder="Zaloguj się!"
                            />
                        </Fragment>
                    ) : (
                        <Fragment>
                            Nie masz jeszcz konta?
                            <Button
                                className="btn btn-outline-primary"
                                onClick={this.showRegister}
                                placeholder="Zarejestruj się!"
                            />
                        </Fragment>
                    )}
                </div>
            </div>
        );
    }
}
export default LoginPanel;
