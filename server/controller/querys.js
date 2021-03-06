const pool = require('../../queries.js').pool;


const getStockById = (request, response) => {
  let id = request.params.id;
  let queryType = ``;
  if (isNaN(parseInt(id))) {
    queryType = `SELECT * FROM averageprices WHERE tickers = '${id}'`;
  } else {
    id = parseInt(id);
    queryType = `SELECT * FROM averageprices WHERE id = ${id}`;
  }
  pool.query(queryType, (error, results) => {
    if (error) {
      response.status(400);
    }
    response.status(200).json(results.rows)
  })
}

module.exports = { getStockById };