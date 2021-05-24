import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as actions from "./../../store/actions/actions";
import { Redirect } from "react-router-dom";

const LogoutPanel = (props) => {
    console.log("in logout");
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.userLogout());
    });

    return <Redirect to="/" />;
};

export default LogoutPanel;
