import React, { useState } from "react";
import Button from "../../UI/Button/Button";
import { gql, useMutation } from "@apollo/client";

const REGISTER_USER = gql`
    mutation register($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password) {
            user_id
        }
    }
`;

const RegisterForm = (props) => {
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const [registerUser, { data }] = useMutation(REGISTER_USER, {
        onError(err) {
            console.log(err);
        },
        onCompleted(data) {
            //there will go what will happen if compleated succesfully
        },
    });

    const handleLoginChange = (event) => {
        setLogin(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePassword1Change = (event) => {
        setPassword1(event.target.value);
    };

    const handlePassword2Change = (event) => {
        setPassword2(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password2 === password1) {
            registerUser({
                variables: {
                    username: login,
                    email: email,
                    password: password1,
                },
            });
        }
    };

    return (
        <form data-testid="registerForm" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Login"
                className="form-control"
                value={login}
                onChange={handleLoginChange}
            />{" "}
            <br />
            <input
                type="email"
                placeholder="Email"
                className="form-control"
                value={email}
                onChange={handleEmailChange}
            />{" "}
            <br />
            <input
                type="password"
                placeholder="Hasło"
                className="form-control"
                value={password1}
                onChange={handlePassword1Change}
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
