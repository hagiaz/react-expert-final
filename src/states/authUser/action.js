/* eslint-disable no-unused-vars */
import api from '../../services/api';
import {setLoading} from '../shared/action';
import {setAuthUser, setAuthError, logout} from './reducer';

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await api.post('/register', userData);
    return true;
  } catch (error) {
    dispatch(setAuthError(error.response?.data?.message || 'Registration failed'));
    return false;
  } finally {
    dispatch(setLoading(false));
  }
};

export const loginUser = ({email, password}) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await api.post('/login', {email, password});
    const {token} = response.data.data;

    localStorage.setItem('token', token);
    api.setAccessToken(token);

    await dispatch(getUserProfile());

    return true;
  } catch (error) {
    dispatch(setAuthError(error.response?.data?.message || 'Login failed'));
    return false;
  } finally {
    dispatch(setLoading(false));
  }
};


export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await api.get('/users/me');
    dispatch(setAuthUser(response.data.data.user));
  } catch (error) {
    dispatch(logout());
  } finally {
    dispatch(setLoading(false));
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch(logout());
};
