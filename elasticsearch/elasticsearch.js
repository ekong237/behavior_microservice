var elasticsearch = require('elasticsearch');

var log = console.log.bind(console);

var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
  });

module.exports = client; 