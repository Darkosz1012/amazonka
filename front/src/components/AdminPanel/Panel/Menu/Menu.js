import React from "react";
import MenuLink from "./MenuLink/MenuLink";
import "./MenuLink/MenuLink.css";

function Menu(props) {
    const _id = props.params.id;
    return (
        <ul className="MenuNavigationLinks">
            <MenuLink link={"/admin/panel/" + _id + "/details"}>
                Szczegóły zawodów
            </MenuLink>
            <MenuLink link={"/admin/panel/" + _id + "/categories"}>
                Kategorie
            </MenuLink>
            <MenuLink link={"/admin/panel/" + _id + "/competitors"}>
                Zawodnicy
            </MenuLink>
            <MenuLink link={"/admin/panel/" + _id + "/positions"}>
                Rozstawienie
            </MenuLink>
            <MenuLink link={"/admin/panel/" + _id + "/teams"}>Zespoły</MenuLink>
            <MenuLink link={"/admin/panel/" + _id + "/qualificationscores"}>
                Wyniki kwalifikacji
            </MenuLink>
            <MenuLink link={"/admin/panel/" + _id + "/eliminationscores"}>
                Wyniki eliminacji
            </MenuLink>
        </ul>
    );
}
export default Menu;
