const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors());

const connectionString = 'postgres://ilearning_db_user:9vaZGNodqZYTz70U4EgkFb2JRHF2AiU0@dpg-chi9sg64dadc9vmps4cg-a.singapore-postgres.render.com/ilearning_db';
const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.post('/addUser', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log("Username: " + username);
    console.log("Password: " + password);
    console.log("Email: " + email);

    const insertSTMT = `INSERT INTO Users (USERNAME, EMAIL, PASSWORD, CREATED_AT, UPDATED_WHEN)
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;

    await pool.query(insertSTMT, [username, email, password]);
    console.log("Data Saved");
    res.send("Data saved successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while saving the data.");
  }
});

app.delete('/deleteUser/:username', async (req, res) => {
  try {
    const encodedUsername = encodeURIComponent(req.params.username);

    const deleteSTMT = `DELETE FROM Users WHERE USERNAME = $1`;

    await pool.query(deleteSTMT, [encodedUsername]);
    console.log(`User with username ${encodedUsername} deleted successfully.`);
    res.send(`User with username ${encodedUsername} deleted successfully.`);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while deleting the user.");
  }
});




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
