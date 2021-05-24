import React from "react";
import { useSelector } from "react-redux";
import "./NavigationLinks.css";
import NavigationLink from "./NavigationLink/NavigationLink";
import { Fragment } from "react";

const NavigationLinks = (props) => {
    const isAuthenticated = useSelector((state) => state.isAuthenticated);

    return (
        <ul className="NavigationLinks">
            <NavigationLink link="/" exact>
                Strona startowa
            </NavigationLink>
            <NavigationLink link="/competitions">Lista zawodów</NavigationLink>
            <NavigationLink link="/competitors">
                Ranking zawodników
            </NavigationLink>
            <NavigationLink link="/score">Wprowadź wyniki</NavigationLink>
            {isAuthenticated ? (
                <Fragment>
                    <NavigationLink link="/admin/competitions">
                        Moje zawody
                    </NavigationLink>
                    <NavigationLink link="/logout">Wyloguj</NavigationLink>
                </Fragment>
            ) : (
                <NavigationLink link="/login">Zaloguj się</NavigationLink>
            )}
        </ul>
    );
};

export default NavigationLinks;
