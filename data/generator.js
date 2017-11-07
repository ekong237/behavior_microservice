const faker = require('faker');
const Gen = require('sentence-generator');
const text = Gen('./content.txt');
const db = require('../database');
const user = require('./user');

let categories = [
    'Auto & Vehicles',
    'Beauty & Fashion',
    'Comedy',
    'Education',
    'Entertainment',
    'Family Entertainment',
    'Film & Animation',
    'Food',
    'Gaming',
    'How-to & Style',
    'Music',
    'News & Politics',
    'Nonprofits & Activism',
    'People & Blogs',
    'Pets & Animals',
    'Science & Technology',
    'Sports',
    'Travel & Events'
];

let randomIndex = Math.floor(Math.random() * 18);

let date = faker.date.recent();

/************************
  CREATE DATA OBJECTS
************************/ 

let createVideo = function() {
  let result = {};
  result.title = text.take(1);;
  result.publisher = faker.name.findName();
  result.categories = categories[faker.random.number({min:0, max:17})];
  result.views = faker.random.number(5000000);
  result.likes = faker.random.number(50000);
  result.dislikes = faker.random.number(10000);
  result.recommended = faker.random.boolean();
  return result;
}
// console.log('created video:', createVideo);

let createAction = function() {
  let result = {};
  let randomAction = ['selected', 'search'];
  let selectAction = randomAction[faker.random.number({min:0, max:1})]
  // console.log('select action:', selectAction);
  result.selected = null;
  result.search = null;

  if (selectAction === 'selected') {
    let maxVideoCreatedId = 15454706;
    result.selected = faker.random.number(maxVideoCreatedId);
  } else {
    let randomTerms = text.take(1).split(' ').slice(0,2).join(' ');
    result.search = randomTerms;
  }
  return result;
}
// console.log('created action:', createAction());

/******************************
  GENERATE DATA INTO DATABASE
*******************************/ 

let bulkAddVideo = function() {
  let promises = [];
  for (var i = 0; i < 1000; i++) {
    let newVid = createVideo();
    promises.push(db.addVideo(newVid));
  }
  return Promise.all(promises)
    .then( (insert) => {
      console.log('done generating video');
    })
};
// console.log('generated video:', genVideo());

let bulkAddAction = function(arrOfActions) {
  db.Action.bulkCreate(arrOfActions)
    .then(inserted => {
      console.log('done generating actions', inserted);
    })
    .catch(err => {
      console.log(err);
    })
}
// console.log('generated action', genAction());

let bulkAddUser = function() {
  let arrOfUsers = [];
  for (var i = 0; i < 10000; i++) {
    let newUser = user.createUser();
    arrOfUsers.push(newUser);
  }
  db.User.bulkCreate(arrOfUsers)
    .then(inserted => {
      console.log('done generating users', inserted);
    })
    .catch(err => {
      console.log(err);
    })
}
// let addUsers = function(arrOfUserObjs) {
//   return User.bulkCreate(arrOfUserObjs);
//   // return User.create(userObj);
// }

// let addVideo = function(videoObj) {
//   return Video.create(videoObj);
// }

// let addAction = function(arrOfActionObjs) {
//   return Action.bulkCreate(arrOfActionObjs);
// }



// console.log('generated user:', genUser());

// setInterval(bulkAddAction,1000);
// setInterval(bulkAddVideo, 1000);
// setInterval(bulkAddUser, 1000);





