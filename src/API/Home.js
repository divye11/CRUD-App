import axios from 'axios';

export const fetchTodos = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos/', {
        params: {
          _limit: 5,
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const createTodo = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post('https://jsonplaceholder.typicode.com/todos', data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const UpdateTodo = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`https://jsonplaceholder.typicode.com/todos/${data.id}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const RemoveTodo = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
