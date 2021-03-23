import { createContext, useReducer, useEffect } from 'react';
import actions from '../helpers/actions';

export const InternetContext = createContext();

const initialState = {
  internet: true,
};

function reducer(state, action) {
  switch (action.type) {
    case actions.SET_INTERNET_STATUS:
      return { ...state, internet: action.payload };

    default:
      return state;
  }
}

const localState = JSON.parse(localStorage.getItem('internet'));

export function InternetProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, localState || initialState);

  useEffect(() => {
    localStorage.setItem('internet', JSON.stringify(state));
  }, [state]);

  const value = {
    internet: state.internet,
    setInternet: (value, cb) => {
      dispatch({
        type: actions.SET_INTERNET_STATUS,
        payload: value,
      });
      cb();
    },
  };
  return (
    <InternetContext.Provider value={value}>
      {children}
    </InternetContext.Provider>
  );
}
