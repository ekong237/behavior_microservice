var express = require('express');
var bodyParser = require('body-parser');
var ESclient = require('../elasticsearch/elasticsearch.js');
var db = require('../database/index.js')
var app = express();

app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: false }));

/************************
        INPUT
************************/
// POST TO ACTIONS ENDPOINT FROM CLIENT
// actionObject = {
//   user_id: user_id,
//   this.selected: selected,
//   this.search: search,
//   this.location: location
// }

let accumulate = [];

// Get a list of user clicks on the page
app.post('/actions', function(req, res){
  console.log('incoming CLIENT POST ACTION req:', req.body);
  accumulate.push(req.body);

  console.log('accumulator length', accumulate.length);
  if (accumulate.length >= 1000) {
    db.bulkAddAction(accumulate);
    accumulate = [];
  }
  res.status(201).end();
});

// Get a list of search result videos from Search Service
app.get('/searchResults', (req, res) => {
  // generate random searchResults
  
  res.status(200).send()
});


app.listen(8080, (err) => {
  if (err) { console.log(err); }
  console.log('node server listening on 8080!');
});

