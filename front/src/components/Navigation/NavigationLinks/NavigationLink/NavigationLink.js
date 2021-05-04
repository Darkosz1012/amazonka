import React from 'react';
import './NavigationLink.css';
import {NavLink} from 'react-router-dom';

const NavigationLink = (props) => (
    <li className="NavigationLink">
        <NavLink
            exact={props.exact}
            to={props.link}
            activeClassName="active">
                {props.children}
        </NavLink>
    </li>
);
export default NavigationLink;