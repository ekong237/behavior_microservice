let Sequelize = require('sequelize');
let sequelize = new Sequelize('irecyou', '', '', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize
  .authenticate()
  .then(() => {
    sequelize.sync()
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});

let Video = sequelize.define('video', {

  title: { type: Sequelize.STRING },
  publisher: { type: Sequelize.STRING },
  categories: { type: Sequelize.STRING },
  views: { type: Sequelize.INTEGER}, 
  likes: { type: Sequelize.INTEGER}, 
  dislikes: { type: Sequelize.INTEGER}, 
  recommended: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
});

let Action = sequelize.define('action', {
  id: { type:Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  selected: { 
    type: Sequelize.INTEGER, 
    references: {
      model: Video,
      key: "id"
    },
    defaultValue: null 
  },
  search: { type: Sequelize.STRING, defaultValue: null }
});

// let ActionOnVideo = sequelize.define('action_on_video', {
//   video_id: {
//     type: Sequelize.INTEGER,
//     references: {
//       model: Video,
//       key: "id"
//     }
//   },
//   action_id: {
//     type: Sequelize.INTEGER,
//     references: {
//       model: Action,
//       key: "id"
//     }
//   }
// });

let addVideo = function(videoObj) {
  return Video.create(videoObj);
}

let addAction = function(actionObj) {
  return Action.create(actionObj);
}

let getClicks = function(callback) {
  var queryString = `select actions.selected, videos.categories, videos.recommended, actions."createdAt" from actions join videos on actions.selected = videos.id ORDER BY actions."createdAt" limit 5000;`; 
  sequelize.query(queryString)
    .then((results) => {
        console.log(results);
        callback(results)
    })
    .catch((err) => {
      console.log('err', err) 
    })
}

// let addActionOnVideo = function(actionOnVidObj) {
//   return Action.create(actionOnVidObj);
// }

module.exports = {

  Video,
  Action,
  addVideo,
  addAction,
  getClicks
}
