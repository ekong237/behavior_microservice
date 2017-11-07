const faker = require('faker');
const user = require('./user');
const db = require('../database/index');
const category = require('./categoryInfo');
const axios = require('axios');

/**************************************************************************************
   For one user, this will generate user actions within a session
   Output: [{ userid: 93953, select: null, search: 'tour', location: 'IA' },{..},{..}]
***************************************************************************************/

// Function simulates a video list search result coming from Search Service
let searchResults = () => {
  let resultListVideo = [];
  for (var i = 0; i < 8; i++) {
    let eachVideo = {};
    let randomIndex = faker.random.number({min:0, max:17});
    let randomVideoCategory = category.CATEGORY[randomIndex];

    eachVideo.id = faker.random.number(100000);
    eachVideo.category = randomVideoCategory;
    resultListVideo.push(eachVideo)
  }
  // console.log('served:', resultListVideo);
  return resultListVideo;
}

// Get a random user from the database
let getUser = () => {
  const MAX_USERS = 100000;
  let randomUserId = faker.random.number(MAX_USERS);
  return db.getUser(randomUserId)
}

// Check user's preference frequency
// Preference frequency will determine user engagement on page (clicks/searches)
let getCategoryCountSets = (userObj) => { 
  let counter = {};
  let countingSet = [];
  let largestCount = 0;

  let keys = Object.keys(userObj);
  let categKeys = keys.slice(1,keys.length-3);

  //order by freq
  for (var k in userObj) {
    let categ = userObj[k]
    counter[categ] ? counter[categ]++ : counter[categ] = 1;
    counter[categ] > largestCount ? largestCount = counter[categ] : '';
  }

  //create [cateogyry, freq] set 
  for (var j in counter) {
    let set = [j, counter[j]];
    countingSet.push(set);
  }

  //limit counting set to categories and sort
  let justCategories = countingSet.slice(1, countingSet.length-2);
  justCategories.sort((a,b) => {
    if (a[1] > b[1]) {
      return -1;
    }
    if (a[1] < b[1]) {
      return 1;
    }
  })
  // console.log('justCategories', justCategories);
  return justCategories;
}

// Engagement increases with increased interest frequency of categories
let getActionsArr = (actionsCount) => {
  let results = [];
  let action = ['search', 'select'];  
  let actionsArr = [];
  for (var i = 0; i < actionsCount; i++) {
    let randomAction = action[faker.random.number({min:0, max:1})]
    if (actionsArr.includes('search')) {
      action = ['select','select'];
      randomAction = action[faker.random.number({min:0, max:1})]
    }
    actionsArr.push(randomAction);
  }
  return actionsArr;
}


let getUserWithActions = (arrOfCateg) => {
  let actionCount = arrOfCateg[0][1] + 1;
  if (arrOfCateg[0][2] > 1) {
    actionCount += 1;
  }
  // console.log('ARR OF CATEG:', arrOfCateg);
  // let actionCount = 3;
  // console.log('actions count:', actionCount);
  let randomActionsArr = getActionsArr(actionCount);
  // console.log('random actions:', randomActionsArr);
  return randomActionsArr.reduce((acc, el, i) => {
    if (i <= 1) { 
      if (el === 'search') { acc.search = arrOfCateg[0][0]; }
      if (el === 'select') { acc.select.push(arrOfCateg[0][0]); }
    }
    if (i > 1) {
      // console.log(' 2nd item category :', arrOfCateg[1][0]);
      if (el === 'search') { acc.search = arrOfCateg[1][0]; }
      if (el === 'select') { acc.select.push(arrOfCateg[1][0]); }
    }
    return acc;
  }, {
    select: [],
    search: null 
  });

  console.log('myobj>',obj);
  // output topics client will select from random actions
  // {
  //   select: [cateogory, cateogory],
  //   search: cateogory
  // }
}


let formatActionsOutput = (searchResults,
                          userWithActions, 
                          userId, 
                          selected = null, 
                          search = null, 
                          location) => {
  // console.log('user actions:', userWithActions);
  let result = [];
  let index = 0;
  let trackSelected = []; //todo: implement memoize
  for (var k in userWithActions) {
    // console.log('each:', k);
    if (k === 'select') {
      userWithActions.select.forEach(selectCateg => {
        // console.log('video with categ:', selectCateg);
        searchResults.forEach(video => {
          let format = {
            userid: userId,
            select: selected,
            search: search,
            location: location
          }
          format.select = (video.category === selectCateg ? video.id : null);
          if (format.select && !trackSelected.includes(video.id)){
            result.push(format);
            trackSelected.push(video.id);
          }
        })
      })
      // console.log('TRACKING VIDEO IDS:', trackSelected);
    }
    if (k === 'search') {
      let format = {
        userid: userId,
        select: selected,
        search: search,
        location: location
      }
      let randomIndex = faker.random.number({min:0, max:17});
      let randomVideoCategory = category.CATEGORY[randomIndex];

      let categ = (userWithActions.search === null ? randomVideoCategory : userWithActions.search );
      // console.log('user category', categ);
      let newSearch = category.getRandomTerm(categ);
      format.search = newSearch;
      result.push(format);
    }
  }
  // console.log('RESULT', result);
  return result;
}

console.log('-------------------------------------------------------------------->');

const SEARCH_RESULTS_VIDS = 8;

const TRACKING = {
  impressions: 0,
  randomClicks: 0,
  recommendedClicks: 0
}

class userAction {
  constructor(
    userId, 
    selected,
    search,
    location,
  ) {
    this.user_id = userId; //get from db
    this.selected = selected;
    this.search = search;
    this.location = location;
  }
}

const createUserActions = (searchRes) => {
  let actionObj = {};
  return getUser()
    .then(result => {
      // console.log('SEARCH RESULTS:', searchResults());;
      // console.log('INSIDE CREATE USER ACTION', result[0][0]);
      searchRes = searchRes || searchResults();

      let userObj = result[0][0];
      let categSets = getCategoryCountSets(userObj);
      let userWithActions = getUserWithActions(categSets);
      let arrOfActions = formatActionsOutput(searchRes, userWithActions, userObj.id, null, null, userObj.location);
      // console.log('arrOfActions', ar?rOfActions);
      return arrOfActions;
    })
}
console.log(createUserActions());

const clientPost = (arrOfActions) => {
  arrOfActions.forEach(action => {
    console.log('entering action:', action);
    axios.post('http://localhost:8080/actions', action)
      .then(function (response) {
        console.log('action sent>>>>>>>>>>>>>>>>>>>>>>>>');
      })
      .catch(function (error) {
        console.log(error);
      });
  })
}

const genUserPostsToServer = async () => {
  try{
    const arrOfActions = await createUserActions();
    const post = await clientPost(arrOfActions);
  } catch (e) {
    console.log(e);
  }
}
// console.log('created action>>>>>>>>', createUserActions().then(result => { console.log('>>>>>>>>>>>>>', result); }));

  // for (var i = 0; i < 1000; i++) {
    genUserPostsToServer();
  // }



// const createUserAction = async () => {
//   let objresult = {};
//   let result = await getUser();
//   console.log('inside create user action:', result[0][0]);
//   let freq = calcUserInteraction(result[0][0]);
//   objresult.req = freq;
//   console.log('>>>>>>>>>>>>', objresult);
//   return objresult;
// }

// (async () => {
//   console.log('created action>>>>>>>>', await createUserAction());;
// })();
// createUserAction().then(result => {console.log(result)})

