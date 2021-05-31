import React, { useState } from "react";
import "./RegisterForm.css";
import Button from "../../UI/Button/Button";
import { gql, useMutation } from "@apollo/client";

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $password: String!
        $email: String!
        $reason_for_creating_account: String!
    ) {
        register(
            username: $username
            password: $password
            email: $email
            reason_for_creating_account: $reasonForCreatingAccount
        ) {
            user_id
        }
    }
`;

const RegisterForm = (props) => {
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [reasonForCreatingAccount, setReasonForCreatingAccount] =
        useState("");

    const [registerUser] = useMutation(REGISTER_USER, {
        onError(err) {
            document.getElementById("error-msg").innerHTML = "Niepoprawne dane";
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

    const handleReasonForCreatingAccount = (event) => {
        setReasonForCreatingAccount(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!login) {
            document.getElementById("error-msg").innerHTML = "Podaj login";
        } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
            document.getElementById("error-msg").innerHTML = "Błędny email";
        } else if (password1.length < 8) {
            document.getElementById("error-msg").innerHTML =
                "Hasło jest za krótkie";
        } else if (password2 !== password1) {
            document.getElementById("error-msg").innerHTML =
                "Hasła nie są takie same";
        } else if (!reasonForCreatingAccount) {
            document.getElementById("error-msg").innerHTML =
                "Podaj powód rejestracji";
        } else {
            registerUser({
                variables: {
                    username: login,
                    password: password1,
                    email: email,
                    reason_for_creating_account: reasonForCreatingAccount,
                },
            });
        }
    };

    return (
        <div>
            <div id="error-msg"></div>
            <form data-testid="registerForm" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Login"
                    aria-label="login"
                    className="form-control register-input"
                    value={login}
                    onChange={handleLoginChange}
                    autoComplete="username"
                />{" "}
                <br />
                <input
                    type="text"
                    placeholder="Email"
                    aria-label="email"
                    className="form-control register-input"
                    value={email}
                    onChange={handleEmailChange}
                    autoComplete="email"
                />{" "}
                <br />
                <input
                    type="password"
                    placeholder="Hasło"
                    aria-label="haslo"
                    className="form-control register-input"
                    value={password1}
                    onChange={handlePassword1Change}
                    autoComplete="new-password"
                />{" "}
                <br />
                <input
                    type="password"
                    placeholder="Powtórz hasło"
                    className="form-control register-input"
                    value={password2}
                    onChange={handlePassword2Change}
                    autoComplete="new-password"
                />{" "}
                <br />
                <textarea
                    placeholder="Dlaczego chcesz założyć konto?"
                    aria-label="Dlaczego chcesz założyć konto?"
                    className="form-control register-input"
                    rows="5"
                    value={reasonForCreatingAccount}
                    onChange={handleReasonForCreatingAccount}
                    autoComplete="off"
                />{" "}
                <br />
                <Button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    placeholder="Zarejestruj się"
                    onClick={handleSubmit}
                />
            </form>
        </div>
    );
};

export default RegisterForm;
