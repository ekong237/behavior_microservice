const faker = require('faker');
const Gen = require('sentence-generator');
const text = Gen('./content.txt');
const getRandomList = require('./randomVideoList.js').getRandomList;
const getRecommendedList = require('./recommendedVideoList.js').getRecommendedList;


function getSearchResults(searchString) {
  let randomVids = getRandomList(10);
  let recommendedVids = getRecommendedList(10);

  let allVids = randomVids.concat(recommendedVids)
  .filter( vid => {
    return vid.title.includes(searchString);
  })
  .sort( (a,b) => {
    return b.views - a.views;
  })
  let searchResults = [];
  let vidId = [];

  allVids.forEach( video => {
    let randomCount = 0;
    let recommendedCount = 0;
    if (!vidId.includes(video.videoId)) {
      // console.log('VIDEOID', video.videoId, video.recommended);

      if (video.recommended === true && randomCount < 4) {
        recommendedCount++;
        // randomActions(video);
        vidId.push(video.videoId);
        searchResults.push(video);
      }      
      if (video.recommended === false && recommendedCount < 4) {
        randomCount++;
        // randomActions(video);
        vidId.push(video.videoId);
        searchResults.push(video);
        }
      }    
  })
  // console.log('SEARCH RESULTS>>>>>>>>>>>', searchResults);
  return searchResults;
  
}
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');


function genRawVideoResults (n) {
  let arrayOfVideoResults = [];
  for (var i = 0; i < n; i++) {
    let randomTerms = text.take(1).split(' ').slice(0,1).join(' ');
    arrayOfVideoResults.push(getSearchResults(randomTerms));
  }
  return arrayOfVideoResults;
}

function addRandomActions (arrOfVids) { //videoObj
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

  function helper (videoObj, selectAction) {
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
let randomTerms = text.take(1).split(' ').slice(0,1).join(' ');
let arrayOfVids = getSearchResults(randomTerms);
let recentActions = addRandomActions(arrayOfVids);
// console.log('RECENT:', recentActions);
// console.log('search results for >you< term',getSearchResults('you'));

let genVideos = genRawVideoResults(10)
console.log('GENVID::::::::::::::', genVideos);




module.exports = {
  getSearchResults
}


