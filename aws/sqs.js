const AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const sns = new AWS.SNS({apiVersion: '2010-03-31'});

let listQ = () => {
  var params = {};
  sqs.listQueues(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.QueueUrls);
    }
  });
}

let createQ = (QName) => {
  var params = {
    QueueName: QName,
    Attributes: {
      'DelaySeconds': '60',
      'MessageRetentionPeriod': '86400'
    }
  };
  sqs.createQueue(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.QueueUrl);
    }
  });
}

let getQUrl = (QName) => {
  var params = {
    QueueName: QName
  };
  sqs.getQueueUrl(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.QueueUrl);
    }
  });
}

let deleteQ = (QUrl) => {
  var params = {
    QueueUrl: QUrl
   };
  sqs.deleteQueue(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
}

let createActionMsg = (userId, selected, search, location) => {
  return {
    userId,
    selected,
    search,
    location
  }
}

// Publish to ActionsOut Topic
let publishMessage = (topic, message = {}, msgAttr = {}) => {
  let publishParams = {
    TopicArn: topic,
    Message: JSON.stringify(message), /* required */
    MessageAttributes: msgAttr
  }    
  return new Promise((resolve, reject) => {
    sns.publish(publishParams, (err, data) => {
      if (err) { 
        console.log('error publishing message ', err.stack);
        reject(err); 
      } else {
        console.log('success response!');
        resolve(data)
      }               
    })
  })
}

// receive from search queue
let receiveMessage = (QUrl) => {
  let receiveParams = {
    QueueUrl: QUrl,
    AttributeNames: [ "All" ],
    MessageAttributeNames: [ "All" ],
    MaxNumberOfMessages: 1,
    VisibilityTimeout: 20,
    WaitTimeSeconds: 5
  };
  // attribute name, max message 1, all , visibility timeout 20, waitime 5
  return new Promise((resolve, reject) => {
    sqs.receiveMessage(receiveParams, (err, data) => {
      if (err) {
        console.log('error receiving messsage ', err);
        reject (err);
      } else {
        console.log('success receive msg, response');
        resolve(data);
        deleteMessage(QUrl, data.Messages[0]);
      }
    })
  })  
}

let deleteMessage = (QUrl, message) => {
  var deleteParams = {
    QueueUrl: QUrl,
    ReceiptHandle: message.ReceiptHandle
  };
  return new Promise ((resolve, reject) => {
    sqs.deleteMessage(deleteParams, function(err, data) {
      if (err) {
        console.log('error deleting');
        reject(err);
      }
      else {
        console.log('message deleted');  
        resolve(data);
      }   
    });
  })
}

module.exports = {
  sqs,
  sns,
  listQ,
  createQ,
  getQUrl,
  deleteQ,
  createActionMsg,
  publishMessage,
  deleteMessage
}

// console.log('now publishing')
// for (var i = 0; i < 20; i++) {
  publishMessage('arn:aws:sns:us-west-1:813403654052:actionsOut', {'hello': 'world'})
    .then(result => {
      console.log('finished publishing and now receiveMessage from SQS');
      return receiveMessage('https://sqs.us-west-1.amazonaws.com/813403654052/checkActionOutQ');
    })
    .then(result => {
      console.log('done receiving, and done deleting?');

    })
// }


// createQ();
// console.log('CREATE Q:', getQUrl('SQS_QUEUE_NAME'));
// let QUrl = 'https://sqs.us-east-1.amazonaws.com/813403654052/SQS_QUEUE_NAME';
// deleteQ(QUrl)
// console.log('LIST Q:', listQ());

// format action obj for delivery
// console.log(createActionMsg(4, 333,'null','CA'));

// publish to actionsOut topic
// publishMessage('arn:aws:sns:us-west-1:813403654052:actionsOut', createActionMsg(4, 333,'null','CA'))
//   .then(data => {
//     console.log('publshed data', data);

//   });



// receiveMessage('https://sqs.us-west-1.amazonaws.com/813403654052/search2')
//   .then(data => {
//     console.log('success', data);
//   })

