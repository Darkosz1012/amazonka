import React from "react";
import Button from "../../UI/Button/Button";
import "./InsertCodePanel.css";

function InsertCodePanel() {
    const checkCode = () => {
        //here put instructions if code is accepted
    };

    return (
        <div data-testid="codePanel">
            <div className="container">
                <div className="insert-code-panel">
                    <p className="code-text"> Wprowadź kod aktywacyjny </p>
                    <input
                        type="text"
                        id="code"
                        aria-label="code"
                        className="form-control input-code"
                    />
                    <div className="code-btn">
                        <Button
                            type="submit"
                            placeholder="Zatwierdź"
                            className="btn btn-primary btn-lg ml-4"
                            onClick={() => {
                                checkCode();
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InsertCodePanel;
