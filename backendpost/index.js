const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = 3000;

// PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: 5432,
});

app.use(cors());

// Route to fetch random Lorem Ipsum text
app.get('/randomLorem', async (req, res) => {
  try {
    const result = await pool.query(
      // "SELECT text FROM lorem_text OFFSET floor(random() * (SELECT COUNT(*) FROM lorem_text)) LIMIT 10"
      "SELECT text FROM lorem_text"
    );
    await console.log(result);
    res.json(result.rows.map(row => row.text));
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/text',(req,res) => {
    res.status(200).json({text:"Random text"});
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});