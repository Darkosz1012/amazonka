class Operation {
    constructor(operationName, query, deafultVariables, newVariables) {
        this.operationName = operationName;
        this.query = query;
        this.variables = deafultVariables;
        this.replaceVars(newVariables);
    }

    replaceVars(newVariables) {
        Object.assign(this.variables, newVariables);
        return this;
    }

    createMsg() {
        return {
            operationName: this.operationName,
            query: this.query,
            variables: this.variables,
        };
    }
}

export class RegisterUserOperation extends Operation {
    constructor(newVariables) {
        super(
            "register",
            `mutation register($username: String!, $password: String!, $email: String!) {
				register(username: $username, password: $password, email: $email) {
					accessToken,
					refreshToken,
					user_id,
					username
				}
			}`,
            {
                username: "test_user",
                email: "grzesiekkasprzak@google.com",
                password: "Passw0rd!",
            },
            newVariables
        );
    }
}

export class LoginUserOperation extends Operation {
    constructor(newVariables) {
        super(
            "login",
            `mutation login($username: String!, $password: String!) {
				login(username: $username, password: $password) {
					accessToken,
					refreshToken,
					user_id
					username
				}
			}`,
            {
                username: "test_user",
                password: "Passw0rd!",
            },
            newVariables
        );
    }
}
