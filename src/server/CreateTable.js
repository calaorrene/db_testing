const { Pool } = require('pg');

const connectionString = 'postgres://ilearning_db_user:9vaZGNodqZYTz70U4EgkFb2JRHF2AiU0@dpg-chi9sg64dadc9vmps4cg-a.singapore-postgres.render.com/ilearning_db';
const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect((err, client, done) => {
  if (err) {
    console.error('Unable to connect to the database:', err);
    return;
  }
  console.log('Connected to the database');

  const createTableQuery = `
    CREATE TABLE Users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_when TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  client.query(createTableQuery, (err, result) => {
    done();
    if (err) {
      console.error('Error creating table:', err);
      return;
    }
    console.log('Table created successfully');
  });
});
