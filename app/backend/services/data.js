const { MongoClient } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'
const assert = require('assert');
const { env } = require("process");
// faz com que o Nodejs roda bem em todos os navegadores

// Connection URL
// const url = "mongodb://0.0.0.0:27017";
const url = env("DATABASE_URL");
const client = new MongoClient(url);
// Database Name
const dbName = "to-do-db";

var _db;

async function connectToDB() {
  // Use connect method to connect to the server
  await client.connect();
  _db = client.db(dbName);
  const collection = _db.collection("to-do-collection");
  return "Connected successfully to MongoDBServer!";
}

//Operations - added async, try/catch, const, return!

const findDocuments = async () => {
  // Get the documents collection
  const collection = _db.collection("to-do-collection");

  try {
    const tofind = await collection.find({}).toArray();
    return tofind;
  } catch (error) {
    if (error instanceof MongoServerError) {
      console.log(`Error worth logging: ${error}`); 
    }
    throw error;
  }
};

const insertDocuments = async (document) => {
  const collection = _db.collection("to-do-collection");

  try {
    const toinsert = await collection.insertOne(document);
    return toinsert;
  } catch (error) {
    // if (error instanceof MongoServerError) {
    //   console.log(`Error worth logging: ${error}`);
    // }
    throw error;
  }
};

const updateDocument = async (document) => {
  const collection = _db.collection("to-do-collection");

  try {
    const toupdate = await collection.updateOne({ _id: document._id }, { $set: document });
    return toupdate;
  } catch (error) {
    if (error instanceof MongoServerError) {
      console.log(`Error worth logging: ${error}`); // special case for some reason
    }
    throw error; // still want to crash
  }
};

const removeDocument = async (document) => {
  const collection = _db.collection("to-do-collection");

  try {
    const toremove = await collection.deleteOne({ _id: document._id });
    return toremove;
  } catch (error) {
    if (error instanceof MongoServerError) {
      console.log(`Error worth logging: ${error}`);
    }
    throw error;
  }
};

// Error handling

connectToDB()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.connect());

module.exports = { connectToDB, findDocuments, updateDocument, removeDocument, insertDocuments };
