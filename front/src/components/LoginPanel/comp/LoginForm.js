import React, { useState, useEffect } from "react";
import Button from "../../UI/Button/Button";
import { gql, useMutation } from "@apollo/client";

const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            user_id
        }
    }
`;

const LoginForm = (props) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const [loginUser, { data }] = useMutation(LOGIN_USER, {
        onError(err) {
            console.log(err);
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
        console.log(login, password);
        loginUser({
            variables: {
                username: login,
                password: password,
            },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Login"
                className="form-control"
                value={login}
                onChange={handleLoginChange}
            />{" "}
            <br />
            <input
                type="password"
                placeholder="Hasło"
                className="form-control"
                value={password}
                onChange={handlePasswordChange}
            />{" "}
            <br />
            <Button
                type="submit"
                placeholder="Zaloguj się"
                className="btn btn-primary btn-lg"
            />
        </form>
    );
};

export default LoginForm;
