import React from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

const LogoutPanel = (props) => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");

    const dispatch = useDispatch();
    dispatch({ type: "LOGOUT" });

    return <Redirect to="/" />;
};

export default LogoutPanel;
