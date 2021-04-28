import React, { useState, useEffect } from "react";
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
                value={password1}
                onChange={handlePasswordChange}
            />{" "}
            <br />
            <input
                type="password"
                placeholder="Powtórz hasło"
                className="form-control"
                value={password2}
                onChange={handlePassword2Change}
            />{" "}
            <br />
            <Button
                type="submit"
                className="btn btn-primary btn-lg"
                placeholder="Zarejestruj się"
            />
        </form>
    );
};

export default RegisterForm;
