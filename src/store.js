import { combineReducers, createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const view = (state = '', action) => {
  if (action.type === 'SET_VIEW') {
    return action.view;
  }
  return state;
};

const groceries = (state = [], action) => {
  if (action.type === 'LOAD') {
    return action.groceries;
  }

  if (action.type === 'UPDATE') {
    return state.map((grocery) =>
      grocery.id === action.grocery.id ? action.grocery : grocery
    );
  }

  if (action.type === 'CREATE') {
    return [...state, action.grocery];
  }

  if (action.type === 'DELETE') {
    return state.filter((grocery) => grocery.id !== action.grocery.id);
  }

  return state;
};

export const toggle = (grocery) => {
  return async (dispatch) => {
    const updated = (
      await axios.put(`/api/groceries/${grocery.id}`, {
        purchased: !grocery.purchased,
      })
    ).data;
    dispatch({ type: 'UPDATE', grocery: updated });
  };
};

export const createGrocery = (name) => {
  return async (dispatch) => {
    const grocery = (
      await axios.post(`/api/groceries/${name ? '' : 'random'}`, { name })
    ).data;
    dispatch({ type: 'CREATE', grocery });
  };
};

export const destroyGrocery = (grocery) => {
  return async (dispatch) => {
    await axios.delete(`/api/groceries/${grocery.id}`);
    dispatch({
      type: 'DELETE',
      grocery,
    });
  };
};

export const fetchGroceries = () => {
  return async (dispatch) => {
    const groceries = (await axios.get('/api/groceries')).data;
    dispatch({
      type: 'LOAD',
      groceries,
    });
  };
};

const reducer = combineReducers({
  view,
  groceries,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
