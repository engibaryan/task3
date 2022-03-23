const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./queries");
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/notes", db.getNote);
app.get("/notes/:id", db.getNoteById);
app.post("/notes", db.createNote);
app.put("/users/:id", db.updateNote);
app.delete("/users/:id", db.deleteNote);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
