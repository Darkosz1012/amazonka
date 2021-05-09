import {shallow} from 'enzyme';
import Button from "../../UI/Button/Button";
import RegisterForm from './LoginForm';

const wrapper = shallow(<RegisterForm />);
it('should render <RegisterForm/>', () => {
    expect(wrapper);
});

describe('<RegisterForm />', () => {
    
    let registerFormWrapper;
    let registerFormInstance;
    const registerform = (disableLifecycleMethods = false) => shallow(<RegisterForm />, {disableLifecycleMethods});

    beforeEach(() => {
        registerFormWrapper = registerform();
        registerFormInstance = registerFormWrapper.instance();
    });

    afterEach(() => {
        registerFormWrapper = undefined;
        registerFormInstance = undefined;
    });

    it('renders without crashing', () => {
        expect(registerform().exists()).toBe(true);
    });

    it('renders a form', () => {
        expect( registerFormWrapper.first().type() ).toBe('form');
    });

    describe('the rendered form', () => {
        const form = () => registerFormWrapper.first();

        it('contains everything else that gets rendered', () => {
            expect(form().children()).toEqual(registerFormWrapper.children())
        });
    })

    it('renders <Button />', () => {
        expect(registerFormWrapper.find(Button).length).toBe(1);
    });

});