import * as actionTypes from "./../actions/actionTypes";

const initialState = {
    isAuthenticated: false,
    accessToken: "",
    refreshToken: "",
    userId: "",
    competitionsData: [],
    test: "60aff2db9d916cd1cec8629b",
};

const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties,
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN:
            return updateObject(state, {
                isAuthenticated: true,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
                userId: action.userId,
            });
        case actionTypes.USER_LOGOUT:
            return updateObject(state, {
                isAuthenticated: false,
                accessToken: "",
                refreshToken: "",
                userId: "",
            });
        case actionTypes.GET_COMPETITIONS_DATA:
            return updateObject(state, {
                competitionsData: [...action.data],
            });
        default:
            return state;
    }
};

export default reducer;
