const db = require('../database/index');
const faker = require('faker');

const CATEGORIES = [
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

const STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID',
  'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS',
  'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK',
  'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV',
  'WI', 'WY'
];

const gender = ['male', 'female'];

// general personality interests
const typeA = ['Auto & Vehicles', 'Comedy', 'Music', 'News & Politics', 'Sports', 'Travel & Events'];
const typeB = ['Comedy','Entertainment', 'Food', 'Pets & Animals', 'Science & Technology', 'Music'];
const typeC = ['Beauty & Fashion', 'How-to & Style', 'Family Entertainment', 'Film & Animation', 'Food', 'Nonprofits & Activism'];
const typeD = ['Entertainment','Gaming', 'Music', 'People & Blogs', 'Pets & Animals', 'Science & Technology'];
const personalities = [typeA, typeB, typeC, typeD];

/*********************************** 
        CREATES USER 
***********************************/


class User {
  constructor(p1, p2, p3, p4, p5, location) {
    this.preference1 = p1;
    this.preference2 = p2;
    this.preference3 = p3;
    this.preference4 = p4;
    this.preference5 = p5;
    this.location = location;
  }
}

// Generates an array of preference categories
let createPref = () => {
    let pref = [];
    let randomIndex = faker.random.number({min:0, max:3});
    let randomPersonality = personalities[randomIndex];

    for (let i = 0; i < 5; i++) {
      let randomIndex = faker.random.number({min:0, max:5});
      let randomCategory = randomPersonality[randomIndex];
      pref.push(randomCategory);
    }
  
    let freq = pref.reduce((acc, el) => {
      acc[el] ? acc[el]++ : acc[el] = 1;
      return acc;
    }, {});
    
    let prefOrder = pref.sort((a,b)=>{
      if (freq[a] > freq[b]) { return -1; }
      if (freq[a] < freq[b]) { return 1; }
    });
    console.log(pref);
    return pref;
};

// Generates a random location
let createLocation = () => {
  let randomIndex = faker.random.number({min:0, max:49});
  let randomState = STATES[randomIndex];
  return randomState;
}

// Creates a user from random generated preferences and location
module.exports.createUser = () => {
  let pref = createPref();
  let [p1, p2, p3, p4, p5] = pref;
  let newLocation = createLocation();
  let newUser = new User(p1, p2, p3, p4, p5, newLocation);
  return newUser;
}

// Bulk create users into database
// db.bulkAddUser();

