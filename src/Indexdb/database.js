const dbVersion = 1;

const database = () => {
  const request = indexedDB.open('todos', dbVersion);

  request.onerror = (e) => {
    console.log('Database Error', e);
  };

  request.onsuccess = (e) => {
    console.log('Database Opened');
  };

  request.onupgradeneeded = (e) => {
    const db = e.target.result;
    let store = db.createObjectStore('todos', {
      keyPath: 'name',
      autoIncrement: true,
    });
  };

  return request;
};

export default database;
