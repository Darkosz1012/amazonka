import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "./../../../store/actions/actions";
import Button from "../../UI/Button/Button";
import { gql, useMutation } from "@apollo/client";
import { Fragment } from "react";
import "./LoginForm.css";

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
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.isAuthenticated);

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const [loginUser] = useMutation(LOGIN_USER, {
        onError() {
            document.getElementById("error-msg").innerHTML =
                "Błędny login lub hasło";
        },
        onCompleted(data) {
            localStorage.setItem("token", data.login.accessToken);
            dispatch(
                actions.userLogin(
                    data.login.accessToken,
                    data.login.refreshToken,
                    data.login.user_id
                )
            );
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
