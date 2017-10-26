var express = require('express');
var bodyParser = require('body-parser');
var elasticsearch = require('elasticsearch');
var app = express();

var log = console.log.bind(console);

// Connect to localhost:9200 and use the default settings
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});


// app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res){

  client.cluster.health(function (err, resp) {
    if (err) {
      console.error(err.message);
    } else {
      console.dir(resp);
    }
  });

  res.send('hello')
});

//REST API Format : http://host:port/[index]/[type]/[_action/id]

app.post('/', (req, res) => {
  console.log('req body', req.body);
  res.send(req)
})

app.post('/videos', (req, res) => {
  console.log('req body', req.body);

  
  // client.indices.delete({
  //   index: 'videos-list',
  // });

  client.indices.create({
    index: 'videos-list',
    type: 'videos',
    mapping: {
      "properties":{
        "name": { "type":"string"}
      }
    }
  })


  client.index({
    index: 'videos-list',
    type: 'videos',
    body: {
      name: 'Julie'
    }
  });
  res.send('post /videos response')
})

// function search() {
//   return client.search({
//     index: 'test',
//     q: 'huhu'
//   }).then(log);
// }

// client.search({
//   q: 'pants'
// }).then(function (body) {
//   var hits = body.hits.hits;
// }, function (error) {
//   console.trace(error.message);
// });
//index and type
// index type id body {name, content, date}

app.get('/videos', (req, res) => {
  client.search({
      index: 'videos-list',
      type: 'videos',
      q: "Julie"
    })
    .then( body => {
      var hits = body.hits.hits;
      console.log('body', hits)

      res.json(hits)
    },
    (err) => {
      console.log('error searching', err);
    });
    // res.status(200).send(log)
})

app.listen(3030, (err) => {
  if (err) { console.log(err); }
  console.log('node server listening on 3030!');
});

//chance library to create 