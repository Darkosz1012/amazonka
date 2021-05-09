import React, { Component } from "react";
import { shallow } from "enzyme";
import LoginForm from "./comp/LoginForm";
import RegisterForm from "./comp/RegisterForm";
import Button from "../UI/Button/Button";
import LoginPanel from "./LoginPanel";

describe("LoginPanel", () => {
    let loginPanelWrapper;
    let loginPanelInstance;
    const loginpanel = (disableLifecycleMethods = false) =>
        shallow(<LoginPanel />, { disableLifecycleMethods });

    beforeEach(() => {
        loginPanelWrapper = loginpanel();
        loginPanelInstance = loginPanelWrapper.instance();
    });

    afterEach(() => {
        loginPanelWrapper = undefined;
        loginPanelInstance = undefined;
    });

    it("renders without crashing", () => {
        expect(loginpanel().exists()).toBe(true);
    });

    test("root is a div", () => {
        expect(loginPanelWrapper.first().type()).toBe("div");
    });

    describe("the rendered div", () => {
        const div = () => loginPanelWrapper.first();

        it("contains everything else that gets rendered", () => {
            expect(div().children()).toEqual(loginPanelWrapper.children());
        });
    });

    it("renders two Buttons", () => {
        expect(loginPanelWrapper.find(Button).length).toBe(2);
    });

    describe("the rendered Buttons alternate between login and register forms", () => {
        const registerButton = () => loginPanelWrapper.find(Button).at(1);

        describe("after clicking first button", () => {
            const loginButton = () => loginPanelWrapper.find(Button).at(0);

            beforeEach(() => {
                loginButton().simulate("click");
            });

            it("does not render RegisterForm", () => {
                expect(loginPanelWrapper.find(RegisterForm).length).toBe(0);
            });

            it("renders LoginForm", () => {
                expect(loginPanelWrapper.find(LoginForm).length).toBe(1);
            });
        });

        describe("after clicking second button", () => {
            const registerButton = () => loginPanelWrapper.find(Button).at(1);

            beforeEach(() => {
                registerButton().simulate("click");
            });

            it("renders RegisterForm", () => {
                expect(loginPanelWrapper.find(RegisterForm).length).toBe(1);
            });

            it("does not render LoginForm", () => {
                expect(loginPanelWrapper.find(LoginForm).length).toBe(0);
            });
        });
    });
});
