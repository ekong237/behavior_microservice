 const createVideoString = (i) => {
  var result = '';

  // generate id
  result += i.toString() + ','
  // generate title
  result += genTitle() + ',';
  // generate category
  result += category[Math.floor(category.length*Math.random())] + ',';
  // generate like counts
  result += Math.abs(Math.floor(newRandom() * 10000)) + ',';
  // generate comment_counts
  result += Math.abs(Math.floor(newRandom() * 1000)) + ',';
  // generate view_counts
  result += Math.abs(Math.floor(newRandom() * 1000000)) + ',';
  // generate created_at
  var date = util.randomDate(new Date(2017, 3, 1), new Date(2017, 6, 1));
  result += '2017-' + util.pad2(date.getMonth()+1) + '-' + util.pad2(date.getDate()) + '\n';

  return result;
};


var genVid = async () => {
  var promises = [];
  for (var i = 1; i <= 10000000; i++) {
    try {
      promises.push(db.saveVideos(createVideo()));
    } catch (e) {
      console.log(e);
      break;
    }
    if (i % 100 === 0) {
      await Promise.all(promises);
      promises = [];
      if (i % 10000 === 0) {
        console.log('done inserting', i);
      }
    }
  }
  return ;
}

function genVideoString(n) {
  let videoTitle = 'title,publisher,categories,views,likes,dislikes,recommended,actions';
  for (let i = 1; i <= n; i++) {
    let eachVideo = {};
    let title = text.take(1);
    let videoId = i;
    // let boolean = [true, false]
    // let randomBoolean = boolean[Math.floor(Math.random()*2)];

    eachVideo.videoId = videoId;
    eachVideo.title = title;
    eachVideo.publisher = faker.name.findName();
    eachVideo.categories = categories[randomIndex];
    eachVideo.views = faker.random.number(5000000);
    eachVideo.likes = faker.random.number(50000);
    eachVideo.dislikes = faker.random.number(10000);
    eachVideo.recommended = true;
    eachVideo.actions = {
      selected: 0,
      search: []
    };

    videoList.push(eachVideo);
  }
  return videoList;
}

