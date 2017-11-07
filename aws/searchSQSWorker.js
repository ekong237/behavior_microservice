const cluster = require('cluster');

if (cluster.isMaster) {
  // getting number of cpu cores using node.js os module
  // returns an array of cpu cores
  let numWorkers = require('os').cpus().length;

  for(var i = 0; i < numWorkers; i++) {
    cluster.fork();
  }  
  cluster.on('exit', function(worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
  }
}

// var cluster = require('cluster');  
// var http = require('http');  
// var cpuCount = require('os').cpus().length;

// if (cluster.isMaster) {  
//   // Fork workers.
//   for (var i = 0; i < cpuCount; i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', function(worker, code, signal) {
//     console.log('worker ' + worker.process.pid + ' died');
//   });
// } else {
//   // Workers can share any TCP connection
//   // In this case it is an HTTP server
//   http.createServer(function(req, res) {
//     res.writeHead(200);
//     res.end("hello world\n");
//   }).listen(8000);
// }