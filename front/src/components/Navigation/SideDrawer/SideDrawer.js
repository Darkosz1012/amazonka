import React, { Fragment } from "react";
import NavigationLinks from "../NavigationLinks/NavigationLinks";
import "./SideDrawer.css";
import logo from "./../../../assets/logoWH.png";
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = (props) => {
    let attachedClasses = ["SideDrawer", "Close"];
    if (props.open) {
        attachedClasses = ["SideDrawer", "Open"];
    }

    return (
        <Fragment>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(" ")}>
                <img className="Logo" src={logo} alt="Amazonka" />
                <nav>
                    <NavigationLinks />
                </nav>
            </div>
        </Fragment>
    );
};

export default SideDrawer;
