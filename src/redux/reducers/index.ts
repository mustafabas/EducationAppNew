import {combineReducers} from 'redux';
import LoginReducers from './LoginReducers';
import SignUpReducers from './SignUpReducers'
// import RegisterReducers from './RegisterReducers';
// import MemberReducers from './MemberReducers';

export default combineReducers({
    LoginResponse:LoginReducers,
    RegisterResponse: SignUpReducers

})