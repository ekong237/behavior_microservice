var elasticsearch = require('elasticsearch');
var {and, gte, lte} =require('sequelize');
var db = require('../database/index.js');

var log = console.log.bind(console);

var ESclient = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

//REST API Format : http://host:port/[index]/[type]/[_action/id]

// ESclient.indices.delete({
//   index: 'behavior'
// });

// ESclient.indices.create({
//   index: 'behavior', //database
//   type: 'actions',   //table
//   mappings : {
//     properties : {
//       selected : {"type": "integer", "index" : "not_analyzed" },
//       categories : {"type": "string", "index" : "not_analyzed" },
//       recommended : { "type" : "boolean" },
//       createdAt : { "type" : "date" }
//     }
//   }
// })


// ESclient.index({
//   index: 'videos-list',
//   type: 'videos',
//   id: '1',
//   body: {
//     name: 'james'
//   }
// });




// client.search({
//   q: 'pants'
// }).then(function (body) {
//   var hits = body.hits.hits;
// }, function (error) {
//   console.trace(error.message);
// });
//index and type
// index type id body {name, content, date}

// client.search({
//   index: 'example_index',
//   type: 'posts',
//   body: {
//     query: {
//       match: {
//         body: 'Hello World'
//       }
//     }
//   }
// });


// ESclient.indices.create({
//   index: 'clicks', //database
//   type: 'videos', // table
  // "mappings" : {
  //   "properties" : {
     // "selected" : {"type": "integer", "index" : "not_analyzed" },
     // "categories" : {"type": "string", "index" : "not_analyzed" },
     // "recommended" : { "type" : "boolean" },
     // "createdAt" : { "type" : "date" }
  //   }
  // }
// });

// ESclient.search({
//     index: 'videos-list',
//     type: 'videos',
//     body: {
//       query: {
//         "match_all": {}
//       }
//     }
//   })
//   .then( body => {
//     var hits = body.hits.hits;
//     console.log('body', hits)

//   },
//   (err) => {
//     console.log('error searching', err);
// });



module.exports = ESclient; 

// const esBulkIndex = async ( model ) => {
//   let total, bulk;
//   try {
//     total = await model.count();
//   } catch (e) {
//     console.log(e);
//     return;
//   }
//   for ( let i = 0; i < Math.ceil(total / 1000); i ++) {
//     let rows;
//     try {
//       rows = await model.findAll({
//         where: {
//           [and]:[
//             {id: {[gte]: (i*1000 + 1)}},
//             {id: {[lte]: ((i+1)*1000)}}
//           ]
//         }
//       });
//     } catch (e) {
//       console.log(e);
//       break;
//     }

//     bulk = [];
//     for (let j = 0; j < rows.length; j++) {
//       bulk.push({index: {
//         _index:'clicks',
//         _type: model.tableName,
//         _id: (i*1000 + j+1)
//       }});
//       let item = {};
//       for (let key in rows[j].dataValues) {
//         if( rows[j].dataValues.hasOwnProperty(key) ) {
//           item[key] = rows[j].dataValues[key];
//         }
//       }
//       bulk.push(item);
//     }
//     try {
//       await client.bulk({body: bulk});
//     } catch (e) {
//       console.log(e);
//       break;
//     }
//     console.log('inserted ', ((i+1) *1000));
//   }
//   console.log('finished');
// };
// esBulkIndex(db.Action);

function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}


async function add1(x) {
  const a = await resolveAfter2Seconds(20);
  const b = await resolveAfter2Seconds(30);
  return x + a + b;
}

add1(10).then(v => {
  console.log(v);  // prints 60 after 4 seconds.
});


async function add2(x) {
  const p_a = resolveAfter2Seconds(20);
  const p_b = resolveAfter2Seconds(30);
  return x + await p_a + await p_b;
}

add2(10).then(v => {
  console.log(v);  // prints 60 after 2 seconds.
});
