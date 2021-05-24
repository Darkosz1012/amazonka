import * as actionTypes from "./../actions/actionTypes";

const initialState = {};

const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties,
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        //here would be cases of action types
        default:
            return state;
    }
};

export default reducer;
