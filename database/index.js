
let Sequelize = require('sequelize');
let sequelize = new Sequelize('irecyou', '', '', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  pool: {
    idle: 20000,
    acquire: 20000,
    handleDisconnects: true
  }
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

/************
    MODELS  
*************/

let User = sequelize.define('user', {
  preference1: { type: Sequelize.STRING },
  preference2: { type: Sequelize.STRING },
  preference3: { type: Sequelize.STRING },
  preference4: { type: Sequelize.STRING },
  preference5: { type: Sequelize.STRING },
  location: { type: Sequelize.STRING }
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

// { user_id: 51109,
//   select: 'Science & Technology',
//   search: null,
//   location: 'CA' }

  // id: { 
  //   type:Sequelize.INTEGER, 
  //   primaryKey: true, 
  //   autoIncrement: true
  // },

let Action = sequelize.define('action', {
  userid: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "id"
    }
  },
  select: { type: Sequelize.INTEGER, defaultValue: null },
  search: { type: Sequelize.STRING, defaultValue: null },
  location: { type: Sequelize.STRING }
});

/***********
   METHODS  
************/
let user = require('../data/user');

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
  Action.bulkCreate(arrOfActions)
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
  User.bulkCreate(arrOfUsers)
    .then(inserted => {
      console.log('done generating users', inserted);
    })
    .catch(err => {
      console.log(err);
    })
}

// let addAction = async function(promise) {
//   let actionObj = await promise;
//   return Action.create(actionObj);
// }

let getUser = function(id) {
  let queryString = `select * from users where users.id = ${id}`;
  return sequelize.query(queryString)
    
}

let getClicks = function(callback) {
  let queryString = `select actions.selected, videos.categories, videos.recommended, actions."createdAt" from actions join videos on actions.selected = videos.id ORDER BY actions."createdAt" limit 5000;`; 
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
  User,
  Video,
  Action,
  bulkAddUser,
  bulkAddVideo,
  bulkAddAction,
  getUser,
  getClicks
}
