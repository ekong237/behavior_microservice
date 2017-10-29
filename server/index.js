var express = require('express');
var bodyParser = require('body-parser');
var ESclient = require('../elasticsearch/elasticsearch.js');
var db = require('../database/index.js')
var app = express();



// app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res){
  db.getClicks();
  ESclient.cluster.health(function (err, resp) {
    if (err) {
      console.error(err.message);
    } else {
      console.dir(resp);
      res.json(resp)
    }
  });

  
});

//REST API Format : http://host:port/[index]/[type]/[_action/id]

app.post('/', (req, res) => {
  console.log('req body', req.body);
  res.send(req)
})

app.post('/videos', (req, res) => {
  console.log('req body', req.body);

  
  // ESclient.indices.delete({
  //   index: 'videos-list',
  // });

  ESclient.indices.create({
    index: 'videos-list',
    type: 'videos',
    mapping: {
      "properties":{
        "name": { "type":"string"}
      }
    }
  })


  ESclient.index({
    index: 'videos-list',
    type: 'videos',
    id: '1',
    body: {
      name: 'james'
    }
  });
  res.send('post /videos response')
})


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

app.get('/clicks', (req, res) => {
  ESclient.indices.create({
    index: 'clicks',
    type: 'videos',
    "mappings" : {

      "properties" : {
       "selected" : {"type": "integer", "index" : "not_analyzed" },
       "categories" : {"type": "string", "index" : "not_analyzed" },
       "recommended" : { "type" : "boolean" },
       "createdAt" : { "type" : "date" }
      }

    }
  })

  db.getClicks( result => {
    // console.log('RESULT:', result);
    res.json(result)
  })
});

app.get('/videos', (req, res) => {

  ESclient.search({
      index: 'videos-list',
      type: 'videos',
      body: {
        query: {
          "match_all": {}
        }
      }
    })
    .then( body => {
      var hits = body.hits.hits;
      console.log('body', hits)

      res.send(hits)
    },
    (err) => {
      console.log('error searching', err);
    });

})

app.listen(8080, (err) => {
  if (err) { console.log(err); }
  console.log('node server listening on 8080!');
});

//chance library to create 