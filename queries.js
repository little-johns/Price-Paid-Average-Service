const Pool = require('pg').Pool
const pool = new Pool({
  user: 'kevin.yang',
  host: 'localhost',
  database: 'kevin.yang',
  port: 5432,
})

module.exports = { pool };