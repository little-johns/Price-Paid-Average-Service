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
};

const getCache = (req, response) => {
  let id = req.params.id;
  redisClient.get(id, (err, result) => {
    if (!result) {
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
        let resultStringify = JSON.stringify(results.rows);
        redisClient.setex(id, 3600, resultStringify);
        response.status(200).json(results.rows)
      })
    } else {
      response.status(200).send(result);
    } 
  })
}

module.exports = { getStockById, getCache };