/*
  NodeJS Connect to Postgres

  (1)
  - npm install pg nodemon

  (2)
  - Dockerfile
  - docker-compose

  (3)
  - docker-compose down
  - docker-compose up --build

*/

const keys = require('./keys')
const { Pool, Client } = require('pg')

const index = 99

// config
const pool = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
})

;(async function () {
  try {
    // connect to db
    const client = await pool.connect()

    // query
    const data = await client.query('SELECT NOW()')
    console.log(data.rows[0])

    // tell the pool to destroy the client
    client.release()
  } catch (error) {
    console.log(error)
  }
})()

// // connect
// pool.connect((err, client, release) => {
//   if (err) {
//     return console.error('Error acquiring client', err.stack)
//   }

//   console.log('Connect to PG...')

// create table "values" with column "number"
// client
//   .query('CREATE TABLE IF NOT EXISTS values (number INT)')
//   .query('INSERT INTO values(number) VALUES($1)', [index])
//   .query('SELECT number FROM values', (err, result) => {
//     if (err) {
//       return console.error('Error executing query', err.stack)
//     }
//     console.log('Data: ', result)
//   })
//   .catch((err) => console.log(error))
// })
//
