import {
LOGIN_REQUEST,
LOGIN_SUCCESS,
LOGIN_FAIL,
REGISTER_FAIL,
REGISTER_SUCCESS,
REGISTER_REQUEST,
LOGOUT_USER_REQUEST,
LOGOUT_USER_SUCCESS,
LOGOUT_USER_FAIL,
LOAD_USER_FAIL,
LOAD_USER_REQUEST,
LOAD_USER_SUCCESS,
CLEAR_ERRORS
} from "../constants/userConstants"
export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGOUT_USER_REQUEST:
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                isAuthenticated: true,
                user: action.payload,
            };
        case LOGOUT_USER_SUCCESS:{
            return{
                loading:false,
                user:null,
                isAuthenticated:false,
            }   
        }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case LOAD_USER_FAIL:
            return{
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload,
            }
            case LOGOUT_USER_FAIL:
                return{
                    ...state,
                    loading:false,
                    error:action.payload,
                }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}