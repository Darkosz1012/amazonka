const initialState = {
    isAuth: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                isAuth: true,
            };
        case "LOGOUT":
            return {
                isAuth: false,
            };
        default:
            return state;
    }
};

export default reducer;
