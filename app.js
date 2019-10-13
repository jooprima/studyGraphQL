const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const app = express();

mongoose.connect(
  "mongodb://admin:12345@Cluster0-shard-00-00-gpu5r.mongodb.net:27017,Cluster0-shard-00-01-gpu5r.mongodb.net:27017,Cluster0-shard-00-02-gpu5r.mongodb.net:27017/Cluster0?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"
);

// update string url terbaru
// mongodb://joo:jooprima@crudmovie-shard-00-00-w5jw0.mongodb.net:27017,crudmovie-shard-00-01-w5jw0.mongodb.net:27017,crudmovie-shard-00-02-w5jw0.mongodb.net:27017/crudmovie?ssl=true&replicaSet=crudmovie-shard-0&authSource=admin&retryWrites=true

mongoose.connection.once("open", () => {
  console.log("Sudah terkoneksi ke database");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("Server running on port 4000...");
});
