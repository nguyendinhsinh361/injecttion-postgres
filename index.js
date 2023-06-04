const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const db = require("./queries");
app.use(bodyParser.json());

app.get("/", (request, response) => {
  response.json({info: "Node.js, Express, and Postgres API"});
});
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.get("/users", db.getUsers);
app.get("/users/detail", db.getUserById);
app.post("/users", db.createUser);
app.put("/users/update", db.updateUser);
app.delete("/users/delete", db.deleteUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
