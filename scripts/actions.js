const faker = require('faker');
const Gen = require('sentence-generator');
const text = Gen('./content.txt');
const randomVideoList = require('./randomVideoList.js');
const recommendedVideoList = require('./recommendedVideoList.js');
const getSearchResults = require('./_searchResultsList.js').getSearchResults;

function addRandomActions(arrOfVids) { //videoObj
  let recentActions = {};
  recentActions.recentSelects = [];
  recentActions.recentSearches = [];
  var actionCount = 0;
  arrOfVids.forEach( video => {
    let randomAction = ['selected', 'search'];
    let randomIndex = Math.floor(Math.random() * 2);
    var selectAction = randomAction[randomIndex];
    if (actionCount < 2) {
      actionCount++;
      helper(video, selectAction);
    }
    
  });

  function helper(videoObj, selectAction) {
    let actionObj = videoObj.actions;
    
    if (selectAction === 'selected') {
      actionObj.selected++;
      recentActions.recentSelects.push({
        videoId: videoObj.videoId
      });
      // console.log('action selected:', actionObj, 'on', videoObj.videoId);
    } 
    if (selectAction === 'search') { //would not have more than one search on page, but just to generate fake data
      let randomTerms = text.take(1).split(' ').slice(0,3).join(' ');
      recentActions.recentSearches.push({ 
        videoId: videoObj.videoId,
        searchTerm: randomTerms
      }); 
    }
    // console.log('recentActions before return:>>>>>', recentActions);
  }
  return recentActions;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function genActions() {
  let result = {};
  result.selected = faker.random.boolean();
  result.search = faker.random.boolean();
  return result;
}
console.log('>>>>>>>>>>>>>>>>>>>','\ngenactions:', genActions());

// let arrayOfVids = getSearchResults('you');
// let recentActions = addRandomActions(arrayOfVids);
// console.log('RECENT:', recentActions);
// console.log('search results for >you< term',getSearchResults('you'));

// module.exports = {
//   arrayOfVids,
//   recentActions
// }
