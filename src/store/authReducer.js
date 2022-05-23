import * as actions from 'store/actions';
import * as authServices from 'services/auth';

import { toast } from 'react-toastify';

const authState = {
  currentUser: null,
  token: null,
};

export const authLogin = (payload) => async (dispatch) => {
  const [token] = await authServices.authLogin(payload);
  console.log('token');
  console.log(token);
  dispatch({
    type: actions.AUTH_LOGIN,
    payload: { token },
  });
};

export const authRegister = (payload) => async (dispatch) => {
  const [token] = await authServices.authRegister(payload);
  dispatch({
    type: actions.AUTH_REGISTER,
    payload: { token },
  });
};

export const authLogout = () => async (dispatch) => {
  localStorage.removeItem('token');
  dispatch({
    type: actions.AUTH_LOGOUT,
  });
};

export const getCurrentUser = (token) => async (dispatch) => {
  const [currentUser] = await authServices.getCurrentUser(token);
  dispatch({
    type: actions.GET_CURRENT_USER,
    payload: { currentUser },
  });
};

export const updateUser = (user, id) => async (dispatch) => {
  try {
    const [currentUser] = await authServices.updateUser(user, id);
    dispatch({
      type: actions.UPDATE_CURRENT_USER,
      payload: { currentUser },
    });

    toast.success('Usuario actualizado correctamente', {
      theme: 'colored',
    });
  } catch (error) {
    console.log(error);
  }
};

export const addAddressUser = (addressUser, id) => async (dispatch) => {
  try {
    const [currentUser] = await authServices.addAddressUser(addressUser, id);
    dispatch({
      type: actions.ADD_ADDRESS_USER,
      payload: { currentUser },
    });
    toast.success('Dirección agregada correctamente', {
      theme: 'colored',
    });
  } catch (error) {
    console.log(error);
  }
};

const handlers = {
  [actions.AUTH_LOGIN]: (state, { token }) => ({
    ...state,
    token,
  }),
  [actions.AUTH_REGISTER]: (state, { token }) => ({
    ...state,
    token,
  }),
  [actions.AUTH_LOGOUT]: (state) => ({
    ...state,
    token: null,
  }),
  [actions.GET_CURRENT_USER]: (state, { currentUser }) => ({
    ...state,
    currentUser,
  }),
  [actions.UPDATE_CURRENT_USER]: (state, { currentUser }) => ({
    ...state,
    currentUser,
  }),
  [actions.ADD_ADDRESS_USER]: (state, { currentUser }) => ({
    ...state,
    currentUser,
  }),
};

export const authReducer = (state = authState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload) : state;
};
