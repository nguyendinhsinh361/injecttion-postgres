const Pool = require("pg").Pool;
const pool = new Pool({
  user: "root",
  host: "localhost",
  database: "test",
  password: "123456",
  port: 5432,
});
const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserById = async (request, response) => {
  // await pool.query(`BEGIN`);
  //   const id = parseInt(request.query.id);
  const id = request.query.id;

  console.log(1111, id);
  try {
    pool.query(`SELECT * FROM users WHERE id = ${id}`, (error, results) => {
      if (error) {
        throw error;
      }
      console.log(1111, results);
      response.status(200).json(results.rows);
    });
    // await pool.query(`COMMIT`);
  } catch (error) {
    console.log(500, error);
  }
};

const createUser = (request, response) => {
  const {name, email} = request.body;

  pool.query(
    `INSERT INTO users (name, email) VALUES ('${name}', '${email}')`,
    (error, results) => {
      if (error) {
        throw error;
      }
      console.log(222, results);
      response.status(201).send(`User added with ID: ${results.insertId}`);
    }
  );
};

const updateUser = (request, response) => {
  const id = request.query.id;
  //   const id = parseInt(request.params.id);
  const {name, email} = request.body;

  pool.query(
    `UPDATE users SET name = ${name}, email = ${email} WHERE id = ${id}`,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = request.query.id;
  //   const id = parseInt(request.params.id);

  pool.query(`DELETE FROM users WHERE id = ${id}`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
