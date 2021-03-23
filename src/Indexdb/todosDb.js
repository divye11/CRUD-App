import DB from './database';

const onRequestError = (e) => {
  console.log('Database Error [TODOS]', e);
};

export const addTodoOffline = (data, callback) => {
  const request = DB();

  request.onerror = onRequestError;

  request.onsuccess = (e) => {
    const db = e.target.result;
    const transaction = db.transaction(['todos'], 'readwrite');
    const store = transaction.objectStore('todos');
    store.add(data);
    callback(data);
  };
};

export const getTodos = (callback) => {
  const request = DB();

  request.onerror = onRequestError;

  request.onsuccess = (e) => {
    const db = e.target.result;
    const transaction = db.transaction(['todos'], 'readonly');
    const store = transaction.objectStore('todos');
    store.getAll().onsuccess = (ev) => {
      callback(ev.target.result);
    };
  };
};

export const setTodos = (data) => {
  const request = DB();

  request.onerror = onRequestError;

  request.onsuccess = (e) => {
    const db = e.target.result;
    const transaction = db.transaction(['todos'], 'readwrite');
    const store = transaction.objectStore('todos');
    store.add(data);
  };
};

export const deleteAndSetTodos = (data, callback) => {
  var req = indexedDB.deleteDatabase('todos');
  req.onsuccess = function () {
    console.log('Deleted database successfully');
    const request = DB();

    request.onerror = onRequestError;

    request.onsuccess = (e) => {
      const db = e.target.result;
      const transaction = db.transaction(['todos'], 'readwrite');
      const store = transaction.objectStore('todos');

      data.forEach((datum) => {
        store.add(datum);
      });

      // store.add(data);
      callback(data);
    };
  };
  req.onerror = function () {
    console.log("Couldn't delete database");
  };
  req.onblocked = function () {
    console.log("Couldn't delete database due to the operation being blocked");
  };
};

export const deleteTodo = (id, callback) => {
  const request = DB();
  request.onerror = onRequestError;

  request.onsuccess = (e) => {
    const db = e.target.result;
    const transaction = db.transaction(['todos'], 'readwrite');
    const store = transaction.objectStore('todos');
    store.delete(id);
    callback(id);
  };
};

export const updateTodoOffline = (data, callback) => {
  const request = DB();
  request.onerror = onRequestError;

  request.onsuccess = (e) => {
    const db = e.target.result;
    const transaction = db.transaction(['todos'], 'readwrite');
    const store = transaction.objectStore('todos');
    store.put(data);
    callback(data);
  };
};
