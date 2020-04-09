// require('newrelic');
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const morgan = require('morgan');
// const path = require('path');
// // const sequalize = require('../database/StockPricePaid/sequalizeHelpers.js')
// const pool = require('../queries.js').pool;
// const app = express();
// const port = process.env.PORT || 3004;
// const db = require('../database/index.js');
// const getStockById = require('./controller/querys.js').getStockById;
// const getCache = require('./controller/querys.js').getCache;

// const redis = require('redis');
// const redisClient = redis.createClient();

// app.use(express.static(`${__dirname}/../public/`));
// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(morgan('dev'));
// app.use('/:id', express.static(path.join(__dirname, '../public')));

// app.get('/api/:id', getCache);

// app.listen(port, () => {
//   console.log(`server running at: http://localhost:${port}`);
// });


//EC2 edits:

require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var redis = require('redis');
var redisClient = redis.createClient();
const morgan = require('morgan');
const path = require('path');
// const sequalize = require('../database/StockPricePaid/sequalizeHelpers.js')
const pool = require('../queries.js').pool;
const app = express();
const port = process.env.PORT || 3004;
const db = require('../database/index.js');
const getStockById = require('./controller/querys.js').getStockById;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(morgan('dev'));
//app.use(express.static(path.join(__dirname, '../public')));
//app.get('/loaderio-a8534846dd752a2f0c7328feed2cf0bc', (req, res) => {
//  res.send('loaderio-a8534846dd752a2f0c7328feed2cf0bc')
//});
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
app.get('/api/:id', getCache);
app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});