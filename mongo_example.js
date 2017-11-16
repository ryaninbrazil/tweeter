"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // We have a connection to the "tweeter" db, starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // ==> Refactored and wrapped as new, tweet-specific function:

  function getTweets(callback) {
    db.collection("tweeter").find().toArray(callback);
  }

  // ==> Later it can be invoked. Remember even if you pass
  //     `getTweets` to another scope, it still has closure over
  //     `db`, so it will still work. Yay!

  getTweets((err, tweets) => {
    if (err) throw err;

    console.log("Logging each tweet:");
    for (let tweet of tweets) {
      console.log(tweet);
    }

    db.close();
  });

});





// "use strict";

// const MongoClient = require("mongodb").MongoClient;
// const MONGODB_URI = "mongodb://localhost:27017/tweeter";

// MongoClient.connect(MONGODB_URI, (err, db) => {
//   if (err) {
//     console.error(`Failed to connect: ${MONGODB_URI}`);
//     throw err;
//   }

//   console.log(`Connected to mongodb: ${MONGODB_URI}`);


//   db.collection("tweeter").find().toArray((err, results) => {
//     if (err) throw err;
  
    
//   console.log("type of find result: ", typeof results);
//   console.log("for each item yielded by the cursor:");
  
//     if (err) throw err;

//     console.log("results array: ", results);
    

//   db.close();
//   });
// });