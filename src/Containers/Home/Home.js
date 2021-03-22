import React, { useReducer, useEffect } from 'react';
import {
  CssBaseline,
  AppBar,
  Container,
  Toolbar,
  IconButton,
  Grid,
  Checkbox,
  LinearProgress,
  Menu,
  MenuItem,
} from '@material-ui/core';

import { INITIAL_STATE, reducer } from './Reducer';
import { fetchTodos, createTodo, UpdateTodo, RemoveTodo } from '../../API/Home';
import useNetwork from '../../helpers/InternetStatus';

import DashboardIcon from '@material-ui/icons/Dashboard';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import Field from '../../Components/TextField/TextField';
import CustomDialog from '../../Components/Dialog/Dialog';
import Alert from '@material-ui/lab/Alert';

import useStyles from './HomeStyles';
import actions from './types';

function Home() {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const internet = useNetwork();

  useEffect(() => {
    dispatch({
      type: actions.CHANGE_INTERNET_STATUS,
      payload: internet,
    });
  }, [internet]);

  useEffect(() => {
    dispatch({
      type: actions.CHANGE_LOADING,
      payload: true,
    });
    fetchTodos()
      .then((res) => {
        dispatch({
          type: actions.CHANGE_LOADING,
          payload: false,
        });
        dispatch({
          type: actions.REHYDRATE_TASKS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: actions.CHANGE_LOADING,
          payload: false,
        });
      });
  }, []);

  const addTodo = () => {
    const data = {
      title: state.newTask,
      userId: 1,
      completed: false,
      id: 1,
    };
    dispatch({
      type: actions.CHANGE_LOADING,
      payload: true,
    });
    createTodo(data)
      .then((res) => {
        console.log(res);
        dispatch({
          type: actions.CHANGE_LOADING,
          payload: false,
        });
        dispatch({
          type: actions.ADD_TASK,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: actions.CHANGE_LOADING,
          payload: false,
        });
      });
  };

  const RemoveTask = (id) => {
    console.log(id);
    dispatch({
      type: actions.CHANGE_LOADING,
      payload: true,
    });
    RemoveTodo(id)
      .then(() => {
        dispatch({
          type: actions.CHANGE_LOADING,
          payload: false,
        });
        dispatch({
          type: actions.REMOVE_TODO,
          payload: id,
        });
      })
      .catch((err) => {
        dispatch({
          type: actions.CHANGE_LOADING,
          payload: false,
        });
        console.log(err);
      });
  };

  const updateVal = (data, field, payload) => {
    dispatch({
      type: actions.CHANGE_LOADING,
      payload: true,
    });
    UpdateTodo(data)
      .then(() => {
        console.log(field, payload);
        dispatch({
          type: actions.UPDATE_TASK,
          field: field,
          data: data,
          payload: payload,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: actions.CHANGE_LOADING,
          payload: false,
        });
      });
  };

  const renderTasks = () => {
    return (
      state.tasks.length > 0 &&
      state.tasks.map((task) => {
        return (
          <Grid
            container
            xs={10}
            sm={10}
            md={6}
            lg={6}
            xl={6}
            direction="column">
            <Grid
              item
              xs={12}
              sm={12}
              lg={12}
              xl={12}
              classes={{ root: classes.TaskContainer2 }}>
              <Grid
                item
                xs={2}
                sm={2}
                lg={1}
                md={1}
                classes={{ root: classes.AddIconContainer }}>
                <Checkbox
                  style={{
                    transform: 'scale(1.5)',
                  }}
                  color="rgb(251, 118, 161)"
                  classes={{ root: classes.checkbox }}
                  checked={task.completed}
                  onChange={(e) => {
                    const data = { ...task, completed: e.target.checked };
                    const field = 'completed';
                    const payload = e.target.checked;
                    updateVal(data, field, payload);
                  }}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </Grid>
              <Grid
                item
                xs={7}
                sm={7}
                lg={9}
                md={9}
                classes={{ root: classes.AddIconContainer }}>
                <div className={classes.pFont}>{task.title}</div>
              </Grid>
              <Grid
                item
                xs={3}
                sm={3}
                lg={2}
                md={2}
                style={{ justifyContent: 'center' }}
                classes={{ root: classes.AddIconContainer }}>
                <CreateIcon
                  style={{
                    color: 'white',
                    marginRight: '5%',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    dispatch({
                      type: actions.SET_CURRENT_TASK,
                      payload: task,
                    });
                    dispatch({
                      type: actions.SET_DIALOG,
                      payload: true,
                    });
                  }}
                />
                <DeleteIcon
                  onClick={() => {
                    RemoveTask(task.id);
                  }}
                  style={{ color: 'white', cursor: 'pointer' }}
                />
              </Grid>
            </Grid>
          </Grid>
        );
      })
    );
  };

  const renderAlert = () => {
    return (
      !state.internetAvailable && (
        <div style={{ zIndex: 4 }}>
          <Alert variant="filled" severity="error">
            You are offline
          </Alert>
        </div>
      )
    );
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="false" classes={{ root: classes.container }}>
        <CustomDialog
          state={state.dialogState}
          Title="Edit Task"
          Description="Please enter the name of the task"
          handleClose={() => {
            dispatch({
              type: actions.SET_DIALOG,
              payload: false,
            });
          }}
          submit={() => {
            updateVal(state.currentTask, 'title', state.currentTask.title);
            dispatch({
              type: actions.SET_DIALOG,
              payload: false,
            });
          }}>
          <Field
            value={
              state.currentTask.title !== null ? state.currentTask.title : ' '
            }
            placeholder="Please enter"
            onChange={(value) => {
              dispatch({
                type: actions.SET_CURRENT_TASK,
                payload: { ...state.currentTask, title: value },
              });
            }}
          />
        </CustomDialog>
        <AppBar position="static" classes={{ root: classes.appBar }}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu">
              <DashboardIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {state.loading && <LinearProgress color="secondary" />}
        {renderAlert()}

        <Grid
          classes={{ container: classes.body }}
          container
          direction="column"
          alignItems="center">
          <Grid
            container
            xs={10}
            sm={10}
            md={6}
            lg={6}
            xl={6}
            classes={{ root: classes.itemContainer }}>
            <Grid item xs={10} sm={10} lg={10} classes={{ root: classes.item }}>
              <h1 className={classes.title}>Todo</h1>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              lg={12}
              xl={12}
              classes={{ root: classes.item }}>
              <h4 className={classes.subTitle}>Tasks</h4>
            </Grid>
          </Grid>
          {renderTasks()}
          <Grid
            container
            xs={10}
            sm={10}
            md={6}
            lg={6}
            xl={6}
            direction="column">
            <Grid
              item
              xs={12}
              sm={12}
              lg={12}
              xl={12}
              classes={{ root: classes.addTaskContainer }}>
              <Grid
                item
                xs={2}
                sm={2}
                lg={1}
                md={1}
                classes={{ root: classes.AddIconContainer2 }}>
                <AddBoxIcon
                  fontSize="large"
                  style={{ color: 'rgb(251, 118, 161)', cursor: 'pointer' }}
                  onClick={() => {
                    addTodo();
                  }}
                />
              </Grid>
              <Grid
                item
                xs={10}
                sm={10}
                lg={11}
                md={11}
                classes={{ root: classes.AddIconContainer }}>
                <Field
                  value={state.newTask}
                  fullWidth
                  placeholder="Add Task"
                  onChange={(value) => {
                    dispatch({
                      type: actions.CHANGE_NEWTASK,
                      payload: value,
                    });
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default Home;