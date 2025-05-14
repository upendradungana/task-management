// import { MongoClient } from 'mongodb';

// const uri = process.env.MONGODB_URI;
// const options = {
//   retryWrites: true,
//   w: 'majority'
// };

// let client;
// let clientPromise;

// if (!process.env.MONGODB_URI) {
//   throw new Error('Please add your Mongo URI to .env.local');
// }

// if (process.env.NODE_ENV === 'development') {
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// export async function getDb() {
//   const client = await clientPromise;
//   return client.db(); // This will use the database specified in the URI (washXpress)
// }

// export default clientPromise;


//.........................................................

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  retryWrites: true,
  w: 'majority'
};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getDb(dbName = process.env.MONGODB_DB_NAME) {
  const client = await clientPromise;
  return client.db(dbName);
}

export default clientPromise;