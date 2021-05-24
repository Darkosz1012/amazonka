import React from "react";
import { NavLink } from "react-router-dom";

const MenuLink = (props) => (
    <li className="MenuLink">
        <NavLink exact={props.exact} to={props.link} activeClassName="active">
            {props.children}
        </NavLink>
    </li>
);
export default MenuLink;
