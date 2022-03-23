const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "api",
  password: "password",
  port: 5432,
});
const getNote = async (request, response) => {
  await pool.query("SELECT * FROM todo ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getNoteById = async (request, response) => {
  const id = parseInt(request.params.id);

  await pool.query(
    "SELECT * FROM todo WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createNote = async (request, res) => {
  const { title, isdone } = request.body;

  await pool.query(
    "INSERT INTO todo (title, isdone) VALUES ($1, $2)",
    [title, isdone],
    (error, response) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`User added`);
    }
  );
};

const updateNote = async (request, response) => {
  const id = parseInt(request.params.id);
  const { title, isdone } = request.body;

  await pool.query(
    "UPDATE todo SET title = $1, isdone = $2 WHERE id = $3",
    [title, isdone, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(results);
    }
  );
};

const deleteNote = async (request, response) => {
  const id = parseInt(request.params.id);

  await pool.query("DELETE FROM todo WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getNote,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};
