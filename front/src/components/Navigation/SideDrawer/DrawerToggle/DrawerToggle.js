import React, { Fragment } from "react";
import "./DrawerToggle.css";
import logo from "./../../../../assets/logoWHR.png";

const DrawerToggle = (props) => (
    <Fragment>
        <div className="FlexContainer">
            <div onClick={props.clicked} className="DrawerToggle">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <img className="FlexContainerImg" src={logo} alt="Amazonka" />
        </div>
    </Fragment>
);

export default DrawerToggle;
