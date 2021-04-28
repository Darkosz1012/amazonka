import React, { useState, useEffect } from "react";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import { gql, useMutation } from "@apollo/client";

const REGISTER_USER = gql`
    mutation register($username: String!, $password: String!) {
        register(username: $username, password: $password) {
            user_id
        }
    }
`;

const RegisterForm = (props) => {
    const [login, setLogin] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const [registerUser, { data }] = useMutation(REGISTER_USER, {
        onError(err) {
            console.log(err);
        },
    });

    const handleLoginChange = (event) => {
        setLogin(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword1(event.target.value);
    };

    const handlePassword2Change = (event) => {
        setPassword2(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(login, password1, password2);
        if (password2 === password1) {
            registerUser({
                variables: {
                    username: login,
                    password: password1,
                },
            });
        }
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
                value={password1}
                onChange={handlePasswordChange}
            />{" "}
            <br />
            <Input
                type="password"
                placeholder="Powtórz hasło"
                className="text-input"
                value={password2}
                onChange={handlePassword2Change}
            />{" "}
            <br />
            <Button
                type="submit"
                className="submit-btn"
                placeholder="Zarejestruj się"
            />
        </form>
    );
};

export default RegisterForm;
