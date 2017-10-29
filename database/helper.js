const Sequelize = require('sequelize');
const db = require('../database/index.js');

const db.sequelize = sequelize;

let getClicks = function() {
  let queryString = 
  sequelize.query()
}

module.exports = {
  getClicks
}

// module.exports.getCoinsGiven = (req, res, next) => {
//   var queryString = `select count(*) from transactions where receiver = ${req.user.id};`
//   sequelize.query(queryString)
//   .then((results) => {
//     console.log('total coins', results[0][0].count)
//     req.user.coinsReceived = results[0][0].count
//     next();
    
//   })
//   .catch((err) => {
//     res.status(304).send('there was an error') 
//     console.log('err', err) 
//   })
// },