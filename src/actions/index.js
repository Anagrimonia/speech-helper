import { request } from './api';

export const REGISTER_USER = 'REGISTER_USER';
export const registerUser = (user) => (dispatch) => {
  request('/register', 'POST', user).then((res) => {
    if (res && res.token) {
      localStorage.setItem("token", res.token);
      dispatch({ type: REGISTER_USER, payload: user.login });
      dispatch(getThemes());
    }
  });
};

export const LOGIN_USER = 'LOGIN_USER';
export const loginUser = (user) => (dispatch) => {
  request('/login', 'POST', user).then((res) => {
    console.log(user);
    if (res && res.token) {
      localStorage.setItem("token", res.token);
      dispatch({ type: LOGIN_USER, payload: user.login });
      dispatch(getThemes());
    }
  });
};

export const UNLOGIN_USER = 'UNLOGIN_USER';
export const unloginUser = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: UNLOGIN_USER, payload: '' });
  dispatch(unloginThemes());
  dispatch(setEdit(false));
};

export const UNLOGIN_THEMES = 'UNLOGIN_THEMES';
export const unloginThemes = () => (dispatch) => {
  dispatch({ type: UNLOGIN_THEMES, payload: '' });
};

export const GET_THEMES = 'GET_THEMES';
export const getThemes = () => (dispatch) => {
  request('/get_themes').then((res) => {
    if (res) dispatch({ type: GET_THEMES, payload: res })
  });
};

export const ADD_THEME = 'ADD_THEME';
export const addTheme = (data) => (dispatch) => {
  request('/add_theme', 'POST', data).then((res) => {
    if (res) dispatch({ type: ADD_THEME, payload: res })
  });
};

export const ADD_PHRASE = 'ADD_PHRASE';
export const addPhrase = (data) => (dispatch) => {
  console.log(data);
  request(`/add_phrase`, 'POST', data).then((res) => {
    if (res) dispatch({ type: ADD_PHRASE, payload: res })
  });
};

export const DELETE_THEME = 'DELETE_THEME';
export const deleteTheme = (data) => (dispatch) => {
  request(`/delete_theme`, 'DELETE', data).then((res) => {
    if (res) dispatch({ type: DELETE_THEME, payload: res })
  });
};


export const DELETE_PHRASE = 'DELETE_PHRASE';
export const deletePhrase = (data) => (dispatch) => {
  request(`/delete_phrase`, 'DELETE', data).then((res) => {
    if (res) dispatch({ type: DELETE_PHRASE, payload: res })
  });
};

export const SET_EDIT = 'SET_EDIT';
export const setEdit = (edit) => (dispatch) => {
  dispatch({ type: SET_EDIT, payload: edit })
};

