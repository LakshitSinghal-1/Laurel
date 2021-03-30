import {
    AUTH_SIGN_IN, AUTH_ERROR, AUTH_SIGN_OUT, USER_PHOTO,
  } from '../actions/types';
  
  const DEFAULT_STATE = {
    isAuthenticated: false,
    token: '',
    photo: [],
    response: [],
    errorMessage: '',
    Role:""
  };
  
  export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
      case AUTH_SIGN_IN:
        return {
          ...state, Role: action.payload, isAuthenticated: true, errorMessage: '',
        };
      case AUTH_SIGN_OUT:
        return {
          ...state, token: action.payload, isAuthenticated: false, errorMessage: '', redirect: true,
        };
      case USER_PHOTO:
        return { ...state, photo: action.payload };
      case AUTH_ERROR:
        return { ...state, errorMessage: action.payload };
      default:
        return state;
    }
  };
  