import React, { useState, useEffect } from "react";
import Input from "../../UI/Input/Input";
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

    const [loginUser, { data }] = useMutation(LOGIN_USER);

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

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <form onSubmit={handleSubmit}>
            <Input
                type="text"
                placeholder="Login"
                className="text-input"
                value={login}
                onChange={handleLoginChange}
            />{" "}
            <br />
            <Input
                type="password"
                placeholder="Hasło"
                className="text-input"
                value={password}
                onChange={handlePasswordChange}
            />{" "}
            <br />
            <Button
                type="submit"
                placeholder="Zaloguj się"
                className="submit-btn"
            />
        </form>
    );
};

export default LoginForm;
