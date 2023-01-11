import { csrfFetch } from './csrf';

//Action Constants
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

//Action Creators
const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

//Thunk Action Creators
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password
    })
  });
  const data = await response.json();
  dispatch(setUser(data));
  return data;
};

export const restoreUser = () => async dispatch => {
   const response = await csrfFetch('/api/session');
   const data = await response.json();

   dispatch(setUser(data));
   return response;
};

export const signup = (user) => async (dispatch) => {
   const { username, email, password, firstName, lastName } = user;
   const response = await csrfFetch("/api/users", {
     method: "POST",
     body: JSON.stringify({
       username,
       email,
       password,
       firstName,
       lastName
     })
   });
   const data = await response.json();
   dispatch(setUser(data));
   return data;
};

export const logout = () => async (dispatch) => {
   const response = await csrfFetch('/api/session', {
     method: 'DELETE',
   });
   dispatch(removeUser());
   return response;
 };

//Session Reducer
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
