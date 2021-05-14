import React, { Fragment } from "react";
import SideMenu from "./Menu/Menu";
import "./PanelLayout.css";

function PanelLayout(props) {
    return (
        <Fragment>
            <div className="panelContainer">
                <div className="menuDiv">
                    <SideMenu params={{ id: props.params.id }} />
                </div>
                <div className="panelContentDiv">
                    <main className="panelContent">{props.children}</main>
                </div>
            </div>
        </Fragment>
    );
}
export default PanelLayout;
