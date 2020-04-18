import { createStore, applyMiddleware } from "redux";
import Cookie from "js-cookie";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {
  auth: null, 
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH/LOGGED_IN":
      return {
        ...state,
        auth: action.payload,
      };
    case "AUTH/LOGGED_OUT":
      return {
        ...state,
        auth: null,
      };
    default:
      return state;
  }
};

export const initializeStore = (preloadedState = initialState) => {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  );
};
