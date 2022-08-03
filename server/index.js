require('dotenv/config');
const pg = require('pg');
const path = require('path');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
const publicPath = path.join(__dirname, 'public');

if (process.env.NODE_ENV === 'development') {
  app.use(require('./dev-middleware')(publicPath));
} else {
  app.use(express.static(publicPath));
}

app.get('/api/records', (req, res, next) => {
  const sql = `
    select "runnerName",
            "distance",
            "time",
            "recordId"
      from "records"
  `;

  db.query(sql)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => err);
});

app.use(express.json());

app.post('/api/records/insert', (req, res, next) => {
  const { name, distance, time } = req.body;
  if (!name || !distance || !time) {
    throw new ClientError(400, 'name, distance, and time are required fields');
  }
  const params = [name, distance, time];
  const sql = `
    insert into "records" ("runnerName","distance","time")
    values ($1, $2, $3)
    returning *
  `;

  db.query(sql, params)
    .then(result => {
      const record = result.rows[0];
      res.status(201).json(record);
    })
    .catch(err => err);
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
