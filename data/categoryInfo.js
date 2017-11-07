const faker = require('faker');
const thesaurus = require('powerthesaurus-api');

/* 
   LIST OF COMPLETE CATEGORIES
*/

const CATEGORY = [
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

/*
   LIST OF RELATED TERMS BY CATEGORY
*/

const AUTO_TERMS = [
    'car', 
    'automobile', 
    'machine', 
    'jalopy', 
    'motorcar', 
    'vehicle', 
    'wheels', 
    'buggy', 
    'bus', 
    'limousine', 
    'sedan', 
    'convertible', 
    'ambulance', 
    'cab', 
    'coupe', 
    'ride', 
    'roadster', 
    'sports car', 
    'taxicab' 
];
const randomAutoTerm = AUTO_TERMS[faker.random.number(18)];
// console.log(randomAutoTerm);

const BEAUTY_TERMS = [ 
    'style',
    'form',
    'mode',
    'makeup',
    'manner',
    'vogue',
    'trend',
    'way',
    'fad',
    'craze',
    'model',
    'method',
    'frame',
    'construct',
    'costume'
];
// console.log(BEAUTY_TERMS.length);
const randomBeautyTerm = BEAUTY_TERMS[faker.random.number(14)];
// console.log(randomBeautyTerm);

const COMEDY_TERMS = [ 
  'comicality',
  'funny side',
  'burlesque',
  'farce',
  'drollness',
  'funniness',
  'humor',
  'drollery',
  'fun',
  'humour',
  'ludicrousness',
  'satire',
  'pantomime',
  'wit',
  'comicalness',
  'comic drama',
  'slapstick',
  'absurdity',
  'absurdness',
  'buffoonery' 
];
// console.log(COMEDY_TERMS.length);
const randomComedyTerm = COMEDY_TERMS[faker.random.number(19)];
// console.log(randomComedyTerms);

const EDUCATION_TERMS = [ 
  'how to',
  'instruction',
  'training',
  'schooling',
  'science',
  'teaching',
  'cultivation',
  'learning',
  'edification',
  'extension',
  'erudition',
  'progress',
  'tuition',
  'march',
  'tutelage',
  'propagation',
  'growth',
  'enlightenment',
  'culture',
  'scholarship',
  'knowledge' 
];
// console.log(EDUCATION_TERMS.length);
const randomEducationTerm = EDUCATION_TERMS[faker.random.number(20)];
// console.log(randomEduTerm);

const ENTERTAINMENT_TERMS = [ 
  'amusement',
  'diversion',
  'recreation',
  'pleasure',
  'fun',
  'pastime',
  'distraction',
  'sport',
  'play',
  'enjoyment',
  'show',
  'relaxation',
  'festivity',
  'delight',
  'gratification',
  'joy',
  'divertissement',
  'satisfaction',
  'gaiety',
  'performance' 
];
// console.log(ENTERTAINMENT_TERMS.length);
const randomEntertainmentTerm = ENTERTAINMENT_TERMS[faker.random.number(19)];
// console.log(randomEntertainmentTerm);

const FAMILY_TERMS = [ 
  'marriage',
  'household',
  'nuclear',
  'kin',
  'house',
  'kinfolk',
  'home',
  'lineage',
  'kinship',
  'parent',
  'relative',
  'extendedfamily',
  'clan',
  'cousin',
  'children',
  'child',
  'sister',
  'mother',
  'father',
  'uncle',
  'nephew',
  'brother',
  'grandson',
  'son',
  'grandfather',
  'grandmother',
  'kinsfolk',
  'ancestor',
  'law',
  'consanguinity',
  'people',
  'tribe',
  'sibling',
  'subfamily',
  'foster',
  'immediate',
  'family',
  'kindred',
  'stepfamily',
  'avuncular',
  'couple',
  'sib',
  'name' 
];
// console.log(FAMILY_TERMS.length);
const randomFamilyTerm = FAMILY_TERMS[faker.random.number(42)];
// console.log(randomFamilyTerms);

const FILM_TERMS = [ 
  'movie',
  'cinema',
  'celluloid',
  'picture',
  'movie',
  'projector',
  'shoot',
  'photographic',
  'film',
  'television',
  'motion',
  'picture',
  'filmmaking',
  'soundtrack',
  'documentary',
  'dvd',
  'animation',
  'flick',
  'movie',
  'theater',
  'photography',
  'screenplay',
  'microfilm',
  'reshoot',
  'film',
  'director',
  'episode',
  'actor',
  'take',
  'pic',
  'scene',
  'moving',
  'picture',
  'picture',
  'show',
  'telefilm',
  'art',
  'cinematography',
  'sequel',
  'filmmaker',
  'film',
  'noir',
  'videotape',
  'silver',
  'screen',
  'movie',
  'screen',
  'video',
  'studio',
  'thriller',
  'computer',
  'animation',
  'screenwriter',
  'feature',
  'film',
  'theatre' 
];
// console.log(FILM_TERMS.length);
const randomFilmTerm = FILM_TERMS[faker.random.number(55)];
// console.log(randomFamilyTerms);

const FOOD_TERMS = [ 
  'meal',
  'apple',
  'orange',
  'grub',
  'chow',
  'chinese food',
  'indian food',
  'japansese food',
  'taiwanese food',
  'cuisine',
  'edibles',
  'dish',
  'provisions',
  'eatables',
  'pizza',
  'sushi',
  'burger',
  'fries',
  'edible',
  'feed',
  'cookie',
  'candy' 
];
// console.log(FOOD_TERMS.length);
const randomFoodTerm = FOOD_TERMS[faker.random.number(21)];
// console.log(randomFoodTerms);

const GAMING_TERMS = [ 
  'games',
  'athletics',
  'amusements',
  'diversions',
  'game',
  'gymnastics',
  'plays',
  'sporting',
  'pastimes',
  'sport',
  'recreations',
  'athletic',
  'distractions',
  'entertainments',
  'mutations',
  'pleasures',
  'bingo',
  'disports',
  'divertissements'

];
// console.log(GAMING_TERMS.length);
const randomGamingTerm = GAMING_TERMS[faker.random.number(18)];
// console.log(randomGamingTerms);

const HOWTO_TERMS = [
  'guide',
  'fashion',
  'manner',
  'genre',
  'flair',
  'form',
  'kind',
  'sort',
  'vogue',
  'variety',
  'panache',
  'elan',
  'elegance',
  'rhetoric',
  'classic',
  'art',
  'signature',
  'trend',
  'way',
  'mode',
  'dash',
  'expressive',
  'style',
  'formulation',
  'ornateness',
  'journalese',
  'reproductive',
  'structure',
  'reminiscent',
  'elegant',
  'distinctive',
  'contemporary',
  'minimalist' 
];
// console.log(HOWTO_TERMS.length);
const randomHowToTerm = HOWTO_TERMS[faker.random.number(32)];
// console.log(howToTerms);

const MUSIC_TERMS = [ 
  'melody',
  'song',
  'harmony',
  'tune',
  'lyric',
  'symphony',
  'chorus',
  'aria',
  'rock and roll',
  'piece',
  'hullabaloo',
  'euphony',
  'melodically',
  'rhythm',
  'ballet',
  'composition',
  'concert',
  'hymn',
  'opus',
  'syncopation' 
];
// console.log(MUSIC_TERMS.length);
const randomMusicTerm = MUSIC_TERMS[faker.random.number(19)];
// console.log(musicTerms);

const NEWS_TERMS = [ 
  'information',
  'report',
  'intelligence',
  'tidings',
  'advice',
  'word',
  'communication',
  'dispatch',
  'scoop',
  'message',
  'bulletin',
  'account',
  'gossip',
  'info',
  'story',
  'announcement',
  'publication',
  'discovery',
  'dope',
  'rumor',
  'president'
];
// console.log(NEWS_TERMS.length);
const randomNewsTerm = NEWS_TERMS[faker.random.number(20)];
// console.log(newsTerms);

const NONPROFIT_TERMS = [ 
  'organization',
  'cooperative',
  'organisation',
  'charitable',
  'non-profit',
  'funded',
  'educational',
  'nongovernmental',
  'philanthropic',
  'private',
  'governmental',
  'nonpartisan',
  'grassroots',
  'collaborative',
  'affiliated',
  'corporate',
  'civic',
  'charity',
  'corporate',
  'governance',
  'board-only',
  'public',
  'volunteer',
  'dividend',
  'law',
  'jurisdiction',
  'profit',
  'concept',
  'accounting',
  'shareholder',
  'volunteering',
  'university',
  'revenue',
  'church',
  'capital',
  'advocacy',
  'trustee' 
];
// console.log(NONPROFIT_TERMS.length);
const randomNonProfitTerm = NONPROFIT_TERMS[faker.random.number(36)];
// console.log(nonProfitTerms);

const PEOPLE_TERMS = [ 
  'somebody',
  'philosophy',
  'language',
  'group',
  'adult',
  'female',
  'native',
  'brain',
  'blogging',
  'code',
  'livejournal',
  'blogger',
  'diary',
  'fandom',
  'live',
  'angle',
  'writer',
  'feed',
  'journal',
  'post',
  'posted',
  'rant',
  'myspace',
  'toning',
  'friends',
  'strings',
  'battle',
  'character'
];
// console.log(PEOPLE_TERMS.length);
const randomPeopleTerm = PEOPLE_TERMS[faker.random.number(27)];
// console.log(peopleTerms);

const PET_TERMS = [ 
  'animal',
  'dog',
  'cat',
  'bird',
  'puppy',
  'favorite',
  'favourite',
  'darling',
  'favored',
  'rottweiler',
  'loved',
  'fondle',
  'caress',
  'rabbit',
  'eat',
  'preferred',
  'dearie',
  'deary',
  'ducky',
  'rodent',
  'turtle',
  'positron',
  'emission',
  'tomography',
  'goldfish',
  'livestock',
  'kennel',
  'greyhound',
  'hamster',
  'beagle',
  'spaniel',
  'poodle',
  'corgi',
  'foxhound',
  'doggie',
  'pomeranian',
  'elephant',
  'dachshund',
  'collie',
  'pup',
  'schipperke',
  'schnauzer',
  'yorkie' 
];
// console.log(PET_TERMS.length);
const randomPetTerm = PET_TERMS[faker.random.number(42)];
// console.log(petTerms);

const SCIENCE_TERMS = [ 
  'mathematics',
  'biology',
  'scientist',
  'scientificmethod',
  'astronomy',
  'physics',
  'knowledge',
  'chemistry',
  'geology',
  'psychology',
  'research',
  'natural',
  'science',
  'medicine',
  'observation',
  'experiment',
  'theory',
  'natural',
  'philosophy',
  'social',
  'science',
  'scientific',
  'discipline',
  'technology',
  'math',
  'scientific',
  'neuroscience',
  'natural',
  'history',
  'sociology',
  'empirical',
  'anthropology',
  'engineering',
  'humanities',
  'maths',
  'metrology',
  'biotechnology',
  'architectonics',
  'systematics',
  'philosophy',
  'agrobiology',
  'study',
  'cognitive',
  'science',
  'agronomy',
  'formal',
  'science',
  'scientific',
  'theory',
  'roger',
  'bacon',
  'cosmology',
  'theorist',
  'theoretician',
  'field of study',
  'thanatology',
  'skill',
  'information',
  'science',
  'technological',
  'pseudoscience',
  'climatology',
  'technical',
  'linguistics',
  'informatics',
  'biophysics',
  'alhazen',
  'society',
  'nature',
  'geoscience',
  'bioscience',
  'economics',
  'algebra',
  'professor',
  'academic',
  'applied',
  'sciences',
  'scientific',
  'knowledge',
  'astrophysics',
  'bookofoptics',
  'education',
  'literature',
  'biomedical',
  'metaphysics' 
];
// console.log(SCIENCE_TERMS.length);
const randomScienceTerm = SCIENCE_TERMS[faker.random.number(84)];
// console.log(scienceTerms);


const SPORT_TERMS = [ 
  'Adventure', 
  'Racing', 
  'Airsoft', 
  'Animal', 
  'Sports', 
  'Archery', 
  'Badminton', 
  'Baseball', 
  'Basketball', 
  'Billiards', 
  'Bocce', 
  'Boomerang', 
  'Bowling',
  'Boxing', 
  'Cheerleading', 
  'Cricket', 
  'Croquet', 
  'Cycling', 
  'Darts', 
  'Disabled', 
  'Equestrian', 
  'Events', 
  'Fantasy', 
  'Fencing', 
  'Flying', 
  'Discs', 
  'Footbag', 
  'Football', 
  'Gaelic', 
  'Goalball', 
  'Golf', 
  'Greyhound', 
  'Racing', 
  'Gymnastics', 
  'Handball', 
  'Hockey', 
  'Informal', 
  'Sports', 
  'Lacrosse', 
  'Martial Arts', 
  'Motorsports', 
  'Orienteering', 
  'Paddleball', 
  'Paintball', 
  'ProfessionalRacquetball', 
  'Skipping', 
  'Skateboarding', 
  'Skating', 
  'Soccer', 
  'Softball', 
  'Sports Table', 
  'Tennis',
  'Handball', 
  'Track and Field', 
  'Volleyball' 
];
// console.log(SPORT_TERMS.length);
const randomSportTerm = SPORT_TERMS[faker.random.number(54)];
// console.log(sportTerms);

const TRAVEL_TERMS = [ 
  'journey',
  'voyage',
  'trip',
  'go',
  'trek',
  'walk',
  'tour',
  'rove',
  'wander',
  'roam',
  'ramble',
  'proceed',
  'cruise',
  'jaunt',
  'travelling',
  'expedition',
  'progress',
  'excursion',
  'peregrination' 
];
// console.log(TRAVEL_TERMS.length);
const randomTravelTerm = TRAVEL_TERMS[faker.random.number(18)];
// console.log(travelTerms);


let gatherTerms = (search) => {
  let final = {};
    let subarr = [];
    thesaurus('car')
      .then(results => {
        // console.log(results, 'results for---', categ);
        results.forEach(set => {
          subarr.push(set.word);
        })
        // final[categ] = subarr;
        // console.log(subarr);
      })
      .catch(err => {
        console.log(err);
      })
  
  return final;
}
// gatherTerms()// console.log(HOWTO_TERMS.length);
// const howToTerms = HOWTO_TERMS[faker.random.number(32)];
// console.log(howToTerms);


// let after = arr.reduce((acc,el)=>{
//   acc.push(el.word);
//   return acc;
// },[])
// console.log(after);




let getRandomTerm = (categoryInput) => {
  const CATEGORY_GEN = {
      'Auto & Vehicles': randomAutoTerm,
      'Beauty & Fashion': randomBeautyTerm,
      'Comedy': randomComedyTerm,
      'Education': randomEducationTerm,
      'Entertainment': randomEntertainmentTerm,
      'Family Entertainment': randomFamilyTerm,
      'Film & Animation': randomFilmTerm,
      'Food': randomFoodTerm,
      'Gaming': randomGamingTerm,
      'How-to & Style': randomHowToTerm,
      'Music': randomMusicTerm,
      'News & Politics': randomNewsTerm,
      'Nonprofits & Activism': randomNonProfitTerm,
      'People & Blogs': randomPeopleTerm,
      'Pets & Animals': randomPetTerm,
      'Science & Technology': randomScienceTerm,
      'Sports': randomSportTerm,
      'Travel & Events': randomTravelTerm
  };
  return CATEGORY_GEN[categoryInput];
}

// for (var i = 0; i < 10; i++) {
//   let randomIndex = faker.random.number({min:0, max:17});
//   let randomVideoCategory = CATEGORY[randomIndex];
//   console.log(getRandomTerm(randomVideoCategory));
// }
   
// let input = 'Food'
// getRandomTerm(input)

module.exports = {
    CATEGORY,
    getRandomTerm
}