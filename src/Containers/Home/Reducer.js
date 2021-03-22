import actions from './types';

export const INITIAL_STATE = {
  newTask: '',
  tasks: [],
  loading: true,
  dialogState: false,
  currentTask: {
    title: '',
  },
  internetAvailable: true,
};

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
    case actions.CHANGE_LOADING:
      return { ...state, loading: action.payload };
    case actions.CHANGE_NEWTASK:
      return { ...state, newTask: action.payload };
    case actions.ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload], newTask: '' };
    case actions.UPDATE_TASK:
      console.log(action);
      return {
        ...state,
        loading: false,
        tasks: state.tasks.reduce((acc, item) => {
          if (item.id === action.data.id) {
            console.log(item);
            let x = { ...item };
            x[action.field] = action.payload;
            console.log(x);
            acc.push(x);
            return acc;
          } else {
            acc.push(item);
            return acc;
          }
        }, []),
      };
    case actions.SET_CURRENT_TASK:
      return { ...state, currentTask: action.payload };
    case actions.CHANGE_CURRENTTASK:
      return { ...state, currentTask: action.payload };
    case actions.SET_DIALOG:
      return { ...state, dialogState: action.payload };
    case actions.REMOVE_TODO:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case actions.CHANGE_INTERNET_STATUS:
      return { ...state, internetAvailable: action.payload };
    case actions.REHYDRATE_TASKS:
      console.log(action.payload);
      return { ...state, tasks: action.payload };
  }
}
