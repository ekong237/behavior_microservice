const faker = require('faker');
const Gen = require('sentence-generator');
const text = Gen('./content.txt');
const randomVideoList = require('./randomVideoList.js');
const recommendedVideoList = require('./recommendedVideoList.js');


function getSearchResults(searchString) {
  let randomVids = randomVideoList(10);
  // console.log(randomVids);
  let recommendedVids = recommendedVideoList(10);
  // console.log(recommendedVids);
  console.log('>>>>>>>>>> all vids >>>>>>>>>>>>>');

  let allVids = randomVids.concat(recommendedVids)
  .filter( vid => {
    return vid.title.includes(searchString);
  })
  .sort( (a,b) => {
    return b.views - a.views;
  })
  console.log(allVids);

  // console.log('>>>>>>>>>>>>>>>>>>>>>>>');
  let searchResults = [];
  let vidId = [];

  allVids.forEach( video => {
    let randomCount = 0;
    let recommendedCount = 0;
    if (!vidId.includes(video.videoId)) {
      console.log('VIDEOID', video.videoId, video.recommended);

      if (video.recommended === true && randomCount < 4) {
        recommendedCount++;
        randomActions(video.actions);
        vidId.push(video.videoId);
        searchResults.push(video);
      }      
      if (video.recommended === false && recommendedCount < 4) {
        randomCount++;
        vidId.push(video.videoId);
        searchResults.push(video);
        }
      }    
  })
  return searchResults;
  // console.log('SEARCH RESULTS>>>>>>>>>>>', searchResults);
}

// let date = faker.date.recent();
// let actions = {};
// actions.click = []; // createdAt
// actions.search = [{ 
//   searchTerm: faker.date.recent()
// }]; 

function randomActions (actionObj) {
  let randomAction = ['click', 'search'];
  let randomIndex = Math.floor(Math.random() * 2);
  console.log('randomIndex>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', randomIndex);
  let selectAction = randomAction[randomIndex];
  console.log('selectAction', selectAction);

  if (selectAction === 'click') {
    actionObj.click = [];
    let randomNumClicks = faker.random.number(50);
    console.log('randomnumclicks', randomNumClicks);
    for (let i = 0; i < randomNumClicks; i++) {
      let newDate = faker.date.recent();
      actionObj.click.push(newDate);
    }
  } else if (selectAction === 'search') {
    let randomTerms = text.take(1).split(' ').slice(0,3).join(' ');
    let searchTerm = randomTerms;
    console.log('RANDOM TERMS>>>>>>>>>>>>>>>>>>>>>>>>>>', randomTerms.split(' ').slice(0,3).join(' '));
    actionObj.search = [{ 
      searchTerm: faker.date.recent()
    }]; 
    console.log(actionObj.search);
  }
}


console.log(getSearchResults('you'));
module.exports = getSearchResults;


