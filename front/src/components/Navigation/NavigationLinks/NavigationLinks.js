import React from 'react';
import './NavigationLinks.css';
import NavigationLink from './NavigationLink/NavigationLink';

const NavigationLinks = (props) => (
    <ul className="NavigationLinks">
        <NavigationLink link="/" exact>Home page</NavigationLink>
        <NavigationLink link="/competitions">Lista zawodów</NavigationLink> 
        <NavigationLink link="/competitors">Ranking zawodników</NavigationLink> 
        <NavigationLink link="/score">Wprowadź wyniki</NavigationLink>
        <NavigationLink link="/login">Zaloguj się</NavigationLink>
    </ul>
);

export default NavigationLinks;