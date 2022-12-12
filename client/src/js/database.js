import { openDB } from 'idb';
const dbName = 'jate'
const collectionName = 'note'

const initdb = async () =>
  openDB(dbName, 1, {    
    upgrade(db) {
      // const dbName = 'jate'
      // const collectionName = 'note'
      if (db.objectStoreNames.contains(dbName)) {
        console.log(dbName + ' database already exists');
        return;
      }
      db.createObjectStore(collectionName, { keyPath: 'id', autoIncrement: true });
      console.log( collectionName + ' database object/table created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// export const putDb = async (content) => console.error('putDb not implemented');
export const postDb = async (content) => {
  // const dbName = 'jate'
  // const collectionName = 'note'
  
  console.log('POST/ADD to the database ' + dbName);

  const dbConnection = await openDB(dbName, 1);
  const tx = dbConnection.transaction(collectionName, 'readwrite');
  const store = tx.objectStore(collectionName);
  const request = store.add({ note: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic to a method that accepts some content and adds it to the database
// export const putDb = async (content) => console.error('putDb not implemented');
export const putDb = async (id, content) => {
  // const dbName = 'jate'
  // const collectionName = 'note'
  
  console.log('PUT/UPDATE to the database ' + dbName);
  const dbConnection = await openDB(dbName, 1);
  // const tx = dbConnection.transaction('todo', 'readwrite');
  const tx = dbConnection.transaction(collectionName, 'readwrite');  
  const store = tx.objectStore(collectionName);

  const request = store.put({ id: id, note: content });
  const result = await request;
  console.log('🚀 - data saved to ' + dbName, result);
};


// TODO: Add logic for a method that gets all the content from the database
// export const getDb = async () => console.error('getDb not implemented');Y
export const getDb = async () => {
  console.log('GET all from the database');
  const todosDb = await openDB(dbName, 1);
  const tx = todosDb.transaction(collectionName, 'readonly');
  const store = tx.objectStore(collectionName);
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
