const express = require("express");
const router = express.Router();

const mysqlConnection = require("./database");


// GET all users
router.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
});

router.get("/all", (req, res) => {
  mysqlConnection.query("SELECT * FROM users", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// INSERT A USER
router.post("/", (req, res) => {
  const { id, username, name, lastname, age, temperature } = req.body;
  console.log(id, username, name, lastname, age, temperature);
  const query = `
    SET @id = ?;
    SET @username = ?;
    SET @name = ?;
    SET @lastname = ?;
    SET @age = ?;
    SET @temperature = ?;
    CALL userAddOrEdit(@id, @username, @name, @lastname, @age, @temperature);
  `;
  mysqlConnection.query(
    query,
    [id, username, name, lastname, age, temperature],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "User Saved" });
      } else {
        console.log(err);
      }
    }
  );
});

router.put("/:username", (req, res) => {
  const {id, name, lastname, age, temperature } = req.body;
  const { username } = req.params;
  console.log(id, username, name, lastname, age, temperature);
  const query = `
    SET @id= ?;
    SET @username= ?;
    SET @name= ?;
    SET @lastname= ?;
    SET @age= ?;
    SET @temperature= ?;
    CALL userAddOrEdit(@id, @username, @name, @lastname, @age, @temperature);
  `;
  mysqlConnection.query(
    query,
    [id, username, name, lastname, age, temperature],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "User Updated" });
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
