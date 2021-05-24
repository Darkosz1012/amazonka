import * as actionTypes from "./../actions/actionTypes";

const initialState = {
    isAuthenticated: false,
    accessToken: "",
    refreshToken: "",
    userId: "",
    username: "",
};

const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties,
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default reducer;
