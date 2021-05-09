import React, { Component } from "react";
import {shallow} from 'enzyme';
import LoginForm from "./comp/LoginForm";
import RegisterForm from "./comp/RegisterForm";
import Button from "../UI/Button/Button";
import LoginPanel from "./LoginPanel";

const wrapper = shallow(<LoginPanel />);
it('should render <LoginPanel/>', () => {
    expect(wrapper);
});

describe('<LoginPanel />', () => {

    let loginPanelWrapper;
    let loginPanelInstance;
    const loginpanel = (disableLifecycleMethods = false) => shallow(<LoginPanel />, {disableLifecycleMethods});

    beforeEach(() => {
        loginPanelWrapper = loginpanel();
        loginPanelInstance = loginPanelWrapper.instance();
    });

    afterEach(() => {
        loginPanelWrapper = undefined;
        loginPanelInstance = undefined;

    });

    it('renders without crashing', () => {
        expect(loginpanel().exists()).toBe(true);
    });

    it('renders a div', () => {
        expect( loginPanelWrapper.first().type() ).toBe('div');
    });

    describe('the rendered div', () => {
        const div = () => loginPanelWrapper.first();
    
        it('contains everything else that gets rendered', () => {
            expect(div().children()).toEqual(loginPanelWrapper.children())
        });
    });

    it('renders <Button />', () => {
        expect(loginPanelWrapper.find(Button).length).toBe(2);
    });
    
    describe('the rendered <Button />', () => {

        const button = () => loginPanelWrapper.find(Button).at(0);
        const button2 = () => loginPanelWrapper.find(Button).at(1);
        
        //czy to wgl potrzebne? 
        it('receives showLogin as "onClick" prop', () => {
            expect(JSON.stringify(button().prop('onClick'))).toEqual(JSON.stringify(loginPanelInstance.showLogin)); 
        })
        it('receives showRegister as "onClick" prop', () => {
            expect(JSON.stringify(button2().prop('onClick'))).toEqual(JSON.stringify(loginPanelInstance.showRegister)); 
        })
    })

    describe('when "isRegister" is false', () => {
        beforeEach(() => {
            loginPanelInstance.setState({isRegister: false});
        });
        
        it('renders <RegisterForm />', () => { expect(loginPanelWrapper.find(RegisterForm).length).toBe(0); })     
        it('renders <LoginForm />', () => { expect(loginPanelWrapper.find(LoginForm).length).toBe(1); })
    });

    describe('when "isRegister" is true', () => {
        beforeEach(() => {
            loginPanelInstance.setState({isRegister: true});
        });

        it('renders <RegisterForm />', () => { expect(loginPanelWrapper.find(RegisterForm).length).toBe(1); })     
        it('renders <LoginForm />', () => { expect(loginPanelWrapper.find(LoginForm).length).toBe(0); })
    });

});





