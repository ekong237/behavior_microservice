var elasticsearch = require('elasticsearch');
var {and, gte, lte} =require('sequelize');
var db = require('../database/index.js');

var log = console.log.bind(console);

var ESclient = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});
const esBulkIndex = async ( model ) => {
  let total, bulk;
  try {
    total = await model.count();
  } catch (e) {
    console.log(e);
    return;
  }
  for ( let i = 0; i < Math.ceil(total / 1000); i ++) {
    let rows;
    try {
      rows = await model.findAll({
        where: {
          [and]:[
            {id: {[gte]: (i*1000 + 1)}},
            {id: {[lte]: ((i+1)*1000)}}
          ]
        }
      });
    } catch (e) {
      console.log(e);
      break;
    }

    bulk = [];
    for (let j = 0; j < rows.length; j++) {
      bulk.push({index: {
        _index:'clicks',
        _type: model.tableName,
        _id: (i*1000 + j+1)
      }});
      let item = {};
      for (let key in rows[j].dataValues) {
        if( rows[j].dataValues.hasOwnProperty(key) ) {
          item[key] = rows[j].dataValues[key];
        }
      }
      bulk.push(item);
    }
    try {
      await client.bulk({body: bulk});
    } catch (e) {
      console.log(e);
      break;
    }
    console.log('inserted ', ((i+1) *1000));
  }
  console.log('finished');
};
esBulkIndex(db.Action);

module.exports = ESclient; 