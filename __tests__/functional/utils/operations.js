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

// Register
export class RegisterUserOperation extends Operation {
    constructor(newVariables) {
        super(
            "register",
            `mutation register($username: String!, $password: String!, $email: String!, $reason_for_creating_account: String!) {
				register(username: $username, password: $password, email: $email, reason_for_creating_account: $reason_for_creating_account) {
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
                reason_for_creating_account: "Why not",
            },
            newVariables
        );
    }
}

// Login
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

// Category
export class AddCategoryOperation extends Operation {
    constructor(newVariables) {
        super(
            "addCategory",
            `mutation addCategory($competition_id: ID!, $name: String!, $gender: String!, $start_stand: Int, $end_stand: Int) {
                addCategory(competition_id: $competition_id, name: $name, gender: $gender, start_stand: $start_stand, end_stand: $end_stand) {
                    _id
                    competition_id
                    competition{
                        _id
                    }
                    name
                    gender
                    start_stand
                    end_stand
                    distances{
                        name
                    }
                }
            }`,
            {
                competition_id: "60aff2a49d916cd1cec8629a",
                name: "Juniorzy",
                gender: "M",
            },
            newVariables
        );
    }
}

export class UpdateCategoryOperation extends Operation {
    constructor(newVariables) {
        super(
            "updateCategory",
            `mutation updateCategory($_id: ID!, $name: String, $gender: String, $start_stand: Int, $end_stand: Int) {
                updateCategory(_id: $_id, name: $name, gender: $gender, start_stand: $start_stand, end_stand: $end_stand) {
                    _id
                    competition_id
                    competition{
                        _id
                    }
                    name
                    gender
                    start_stand
                    end_stand
                    distances{
                        name
                    }
                }   
            }`,
            {},
            newVariables
        );
    }
}

export class DeleteCategoryOperation extends Operation {
    constructor(newVariables) {
        super(
            "deleteCategory",
            `mutation deleteCategory($_id: String!) {
                deleteCategory(_id: $_id) {
                    _id
                    competition_id
                    competition{
                        _id
                    }
                    name
                    gender
                    start_stand
                    end_stand
                    distances{
                        name
                    }
                }
            }`,
            {},
            newVariables
        );
    }
}

export class ChooseCategoryOperation extends Operation {
    constructor(newVariables) {
        super(
            "category",
            `query category($_id: String!) {
                category(_id: $_id) {
                    _id
                    competition_id
                    competition{
                        _id
                    }
                    name
                    gender
                    start_stand
                    end_stand
                    distances{
                        name
                    }
                }
            }`,
            {
                _id: "60aff2a49d916cd1cec8629a",
            },
            newVariables
        );
    }
}

export class ChooseCategoriesOperation extends Operation {
    constructor(newVariables) {
        super(
            "categories",
            `query categories($competition_id: ID) {
                categories(competition_id: $competition_id) {
                    _id
                    competition_id
                    competition{
                        _id
                    }
                    name
                    gender
                    start_stand
                    end_stand
                    distances{
                        name
                    }
                }
            }`,
            {},
            newVariables
        );
    }
}

// Competition
export class AddCompetitionOperation extends Operation {
    constructor(newVariables) {
        super(
            "addCompetition",
            `mutation addCompetition($owner_id: ID!, $name: String!, $start_date: String, $end_date: String, $location: String) {
                addCompetition(owner_id: $owner_id, name: $name, start_date: $start_date, end_date: $end_date, location: $location) {
                    _id
                    owner_id
                    name
                    start_date
                    end_date
                    location
                    details_id
                    details {
                        description
                        timetable
                    }
                    categories_id
                }
            }`,
            {
                owner_id: "60aff2a49d916cd1cec8629c",
                name: "Test competition",
            },
            newVariables
        );
    }
}

export class UpdateCompetitionOperation extends Operation {
    constructor(newVariables) {
        super(
            "updateCompetition",
            `mutation updateCompetition($_id: ID!, $name: String, $start_date: String, $end_date: String, $location: String, $details: inputDetails, $categories_id: [ID]) {
                updateCompetition(_id: $_id, name: $name, start_date: $start_date, end_date: $end_date, location: $location, details: $details, categories_id: $categories_id) {
                    _id
                    owner_id
                    name
                    start_date
                    end_date
                    location
                    details_id
                    details {
                        description
                        timetable
                    }
                    categories_id
                }
            }`,
            {},
            newVariables
        );
    }
}

export class DeleteCompetitionOperation extends Operation {
    constructor(newVariables) {
        super(
            "deleteCompetition",
            `mutation deleteCompetition($_id: ID!) {
                deleteCompetition(_id: $_id) {
                    _id
                    owner_id
                    name
                    start_date
                    end_date
                    location
                    details_id
                    details {
                        description
                        timetable
                    }
                    categories_id
                }
            }`,
            {},
            newVariables
        );
    }
}

export class ChooseCompetitionOperation extends Operation {
    constructor(newVariables) {
        super(
            "competition",
            `query competition($_id: ID!) {
                competition(_id: $_id) {
                    _id
                    owner_id
                    name
                    start_date
                    end_date
                    location
                    details_id
                    details {
                        description
                        timetable
                    }
                    categories_id
                }
            }`,
            {
                _id: "60aff2a49d916cd1cec8629a",
            },
            newVariables
        );
    }
}

export class ChooseCompetitionsOperation extends Operation {
    constructor(newVariables) {
        super(
            "competitions",
            `query competitions($owner_id: ID, $name: String) {
                competitions(owner_id: $owner_id, name: $name) {
                    _id
                    owner_id
                    name
                    start_date
                    end_date
                    location
                    details_id
                    details {
                        description
                        timetable
                    }
                    categories_id
                }
            }`,
            {},
            newVariables
        );
    }
}
