var express = require('express');
var bodyParser = require('body-parser');
var ESclient = require('../elasticsearch/elasticsearch.js');
var app = express();



// app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res){

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

app.listen(3030, (err) => {
  if (err) { console.log(err); }
  console.log('node server listening on 3030!');
});

//chance library to create 