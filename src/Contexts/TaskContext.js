import { createContext, useReducer, useEffect } from 'react';
import actions from '../helpers/actions';

export const TaskContext = createContext();

const initialState = {
  offlineTasks: [],
};

function reducer(state, action) {
  switch (action.type) {
    case actions.ENQUEUE_TASK:
      const task = {
        payload: action.payload,
        id: Math.random(),
        method: action.method,
        url: action.url,
      };
      return {
        ...state,
        offlineTasks: [...state.offlineTasks, task],
      };
    case actions.REMOVE_TASK:
      return {
        ...state,
        offlineTasks: state.offlineTasks.filter(
          (task) => task.id !== action.payload.id,
        ),
      };
    default:
      return state;
  }
}

const localState = JSON.parse(localStorage.getItem('tasks'));

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, localState || initialState);

  useEffect(() => {
    localStorage.setItem('internet', JSON.stringify(state));
  }, [state]);

  const value = {
    offlineTasks: state.offlineTasks,
    QueueTaskContext: (payload, method, url) => {
      dispatch({
        type: actions.ENQUEUE_TASK,
        payload: payload,
        method: method,
        url: url,
      });
    },
    RemoveTaskContext: (task) => {
      dispatch({
        type: actions.REMOVE_TASK,
        payload: task,
      });
    },
  };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
