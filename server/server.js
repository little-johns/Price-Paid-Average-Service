require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
// const sequalize = require('../database/StockPricePaid/sequalizeHelpers.js')
const pool = require('../queries.js').pool;
const app = express();
const port = process.env.PORT || 8080;
const db = require('../database/index.js');
const getStockById = require('./controller/querys.js').getStockById;
app.use(express.static(`${__dirname}/../public/`));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/:id', express.static(path.join(__dirname, '../public')));

app.get('/api/:id', getStockById);

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});

