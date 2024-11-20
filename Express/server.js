require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.post("/todos", async (req, res) => {
  const { todo, completed, userId } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO todos (todo, completed, userId) VALUES ($1, $2, $3) RETURNING *",
      [todo, completed, userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating todo" });
  }
});

app.get("/todos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todos");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching todos" });
  }
});

app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM todos WHERE id = $1", [id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching todo" });
  }
});

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { todo, completed, userId } = req.body;
  try {
    const result = await pool.query(
      "UPDATE todos SET todo = $1, completed = $2, userId = $3 WHERE id = $4 RETURNING *",
      [todo, completed, userId, id]
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating todo" });
  }
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM todos WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length > 0) {
      res.status(200).json({ message: "Todo deleted" });
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting todo" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM login WHERE username = $1 AND password = $2",
      [username, password]
    );

    if (result.rows.length > 0) {
      res.status(200).json({ message: "LoginSuccess" });
    } else {
      res.status(401).json({ message: "LoginFail" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
