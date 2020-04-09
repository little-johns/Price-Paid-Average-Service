const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port
})
pool.connect((err, client, done) => {
 if (err) return console.log(err)
 console.log("success")
});
module.exports = { pool };