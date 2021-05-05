import React from "react";
import "./Toolbar.css";
import logo from "./../../../assets/logoWHR.png";
import NavigationLinks from "../NavigationLinks/NavigationLinks";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const Toolbar = (props) => (
    <header className="Toolbar">
        <DrawerToggle clicked={props.openDrawer} />
        <img className="Logofs" src={logo} alt="Amazonka" />
        <nav className="DesktopOnly">
            <NavigationLinks />
        </nav>
    </header>
);

export default Toolbar;
