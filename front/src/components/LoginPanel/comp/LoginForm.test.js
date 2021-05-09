import {shallow} from 'enzyme';
import Button from "../../UI/Button/Button";
import LoginForm from './LoginForm';

const wrapper = shallow(<LoginForm />);
it('should render <LoginForm/>', () => {
    expect(wrapper);
});

describe('<LoginForm />', () => {

    let loginFormWrapper;
    let loginFormInstance;
    const loginform = (disableLifecycleMethods = false) => shallow(<LoginForm />, {disableLifecycleMethods});

    beforeEach(() => {
        loginFormWrapper = loginform();
        loginFormInstance = loginFormWrapper.instance();
    });

    afterEach(() => {
        loginFormWrapper = undefined;
        loginFormInstance = undefined;
    });

    it('renders without crashing', () => {
        expect(loginform().exists()).toBe(true);
    });

    it('renders a form', () => {
        expect( loginFormWrapper.first().type() ).toBe('form');
    });

    describe('the rendered form', () => {
        const form = () => loginFormWrapper.first();

        it('contains everything else that gets rendered', () => {
            expect(form().children()).toEqual(loginFormWrapper.children())
        });
    })

    it('renders <Button />', () => {
        expect(loginFormWrapper.find(Button).length).toBe(1);
    });
});