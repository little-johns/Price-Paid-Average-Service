const Sequelize = require('sequelize');
const sequelize = new Sequelize('kevin.yang', 'kevin.yang', '', {dialect: 'postgres'});

const averageprices = sequelize.define('entry', {
  // attributes
  id: {type: Sequelize.DataTypes.STRING, primaryKey: true},
  tickers: {type: Sequelize.DataTypes.STRING},
  companyname: {type: Sequelize.DataTypes.STRING},
  day: {type: Sequelize.DataTypes.INTEGER},
  price: {type: Sequelize.DataTypes.INTEGER}
})

averageprices.sync({}).then(() => {});

var save = (entry) => {
  averageprices.create(entry);
}

var findAll = (query, callback) => {
  
  averageprices.findAll(query)
  .then((data) => data.map(entry => {
    var dataEntry = {
        company: entry.dataValues.companyName,
        price: entry.dataValues.price,
        day: entry.dataValues.day,
        id: entry.dataValues.id,
        ticker: entry.dataValues.tickers,
    }
    return dataEntry;
  }))
  .then((obj) => callback(null, obj))
  .catch((err) => callback(err))
}

module.exports = {save, findAll}
