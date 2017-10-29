const faker = require('faker');
const Gen = require('sentence-generator');
const text = Gen('./content.txt');
const db = require('../database');

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
// console.log('category: ', categories[faker.random.number({min:0, max:17})]);

let date = faker.date.recent();

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
// console.log(createVideo());


let genVideo = function() {
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
// genVideo();
// console.log(genVideo());

let createAction = function(maxCreated) {
  let result = {};
  let randomAction = ['selected', 'search'];
  let selectAction = randomAction[faker.random.number({min:0, max:1})]
  // console.log('select action:', selectAction);
  result.selected = null;
  result.search = null;

  if (selectAction === 'selected') {
    result.selected = faker.random.number(maxCreated);
  } else {
    let randomTerms = text.take(1).split(' ').slice(0,2).join(' ');
    result.search = randomTerms;
  }
  return result;
}
console.log('created action:', createAction());

let genAction = function() {
  let promises = [];
  for (var i = 0; i < 1000; i++) {
    let newAction = createAction(i);
    promises.push(db.addAction(newAction));
  }
  return Promise.all(promises)
    .then( (insert) => {
      console.log('done generating actions', insert);
    })
}
// genAction();
// console.log('generated action', genAction());
// setInterval(genAction,1000);
setInterval(genVideo, 1000)








// let createActionOnVid = function() {
//   let actionId = 
//   // actionId, videoId
//   let result = {};
//   result.action_id = actionId;
//   result.video_id = videoId;
//   result.createdAt = date;
//   return result;
// }

// let genActionOnVid = function() {
//   let result = {};
//   let randomAction = ['selected', 'search'];
//   let randomIndex = Math.floor(Math.random() * 2);
//   var selectAction = randomAction[randomIndex];
//   let promises = [];
//   for (var i = 0; i < 10; i++) {
//     let newActionOnVid = createActionOnVid();
//     promises.push(db.addActionOnVideo(newActionOnVid));
//   }
//   return Promise.all(promises)
//     .then( (insert) => {
//       console.log('done generating actionOnVid', insert);
//   })
// }
// genActionOnVid();

