import React, { useState } from "react";
import "./NavigationLinks.css";
import NavigationLink from "./NavigationLink/NavigationLink";
import { Fragment } from "react";
import { useSelector } from "react-redux";

const NavigationLinks = (props) => {
    const isAuth = useSelector((state) => state.isAuth);

    const linksForLoggedUser = () => {
        return (
            <Fragment>
                <NavigationLink link="/admin/competitions">
                    Moje zawody
                </NavigationLink>
                <NavigationLink link="/logout">Wyloguj</NavigationLink>
            </Fragment>
        );
    };

    const linksForUnknownUser = () => {
        return <NavigationLink link="/login">Zaloguj się</NavigationLink>;
    };

    return (
        <ul className="NavigationLinks">
            <NavigationLink link="/" exact>
                Strona startowa
            </NavigationLink>
            <NavigationLink link="/competitions">Lista zawodów</NavigationLink>
            <NavigationLink link="/score">Wprowadź wyniki</NavigationLink>
            {isAuth ? linksForLoggedUser() : linksForUnknownUser()}
        </ul>
    );
};

export default NavigationLinks;
