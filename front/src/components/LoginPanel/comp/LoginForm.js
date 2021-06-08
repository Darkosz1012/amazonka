import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Button from "../../UI/Button/Button";
import { gql, useMutation } from "@apollo/client";
import { Fragment } from "react";
import "./LoginForm.css";
import { useDispatch } from "react-redux";

const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            user_id
            accessToken
            refreshToken
        }
    }
`;

const LoginForm = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const [loginUser] = useMutation(LOGIN_USER, {
        onError() {
            document.getElementById("error-msg").innerHTML =
                "Błędny login lub hasło";
        },
        onCompleted(data) {
            localStorage.setItem("accessToken", data.login.accessToken);
            localStorage.setItem("refreshToken", data.login.refreshToken);
            localStorage.setItem("userId", data.login.user_id);
            dispatch({ type: "LOGIN" });
            setIsAuthenticated(true);
        },
    });

    const handleLoginChange = (event) => {
        setLogin(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        loginUser({
            variables: {
                username: login,
                password: password,
            },
        });
    };

    return (
        <Fragment>
            <div id="error-msg"></div>
            <form data-testid="loginForm" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Login/email"
                    aria-label="login"
                    className="form-control login-input"
                    value={login}
                    onChange={handleLoginChange}
                    autoComplete="username"
                />{" "}
                <br />
                <input
                    type="password"
                    placeholder="Hasło"
                    className="form-control login-input"
                    value={password}
                    onChange={handlePasswordChange}
                    autoComplete="current-password"
                />{" "}
                <br />
                <Button
                    type="submit"
                    placeholder="Zaloguj się"
                    className="btn btn-primary btn-lg"
                    onClick={handleSubmit}
                />
            </form>
            {isAuthenticated ? <Redirect to="/admin/competitions" /> : null}
        </Fragment>
    );
};

export default LoginForm;
