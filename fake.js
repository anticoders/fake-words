



/* ---------- ---------- ---------- ---------- ---------- ---------- */
/* Source arrays */
/* ---------- ---------- ---------- ---------- ---------- ---------- */


/* Most common syllabes in English language */

var syllabes = [
  'the','ing','er','a','ly','ed','i','es','re','tion','in','e','con','y','ter','ex','al','de','com','o','di','en','an','ty','ry','u',
  'ti','ri','be','per','to','pro','ac','ad','ar','ers','ment','or','tions','ble','der','ma','na','si','un','at','dis','ca','cal','man','ap',
  'po','sion','vi','el','est','la','lar','pa','ture','for','is','mer','pe','ra','so','ta','as','col','fi','ful','get','low','ni','par','son',
  'tle','day','ny','pen','pre','tive','car','ci','mo','an','aus','pi','se','ten','tor','ver','ber','can','dy','et','it','mu','no','ple','cu',
  'fac','fer','gen','ic','land','light','ob','of','pos','tain','den','ings','mag','ments','set','some','sub','sur','ters','tu','af','au','cy','fa','im',
  'li','lo','men','min','mon','op','out','rec','ro','sen','side','tal','tic','ties','ward','age','ba','but','cit','cle','co','cov','daq','dif','ence',
  'ern','eve','hap','ies','ket','lec','main','mar','mis','my','nal','ness','ning','nu','oc','pres','sup','te','ted','tem','tin','tri','tro','up',
];

var syllabesLength = syllabes.length;

/* Popular names in several English-speaking countries */

var names = [
  'Abigail','Alice','Amelia','Angelina','Ann',
  'Ashley','Avery','Barbara','Brianna','Camila',
  'Chloe','Dorothy','Elizabeth','Ella','Emily',
  'Emma','Fiona','Florence','Gabrielle','Haley',
  'Hannah','Isabella','Jasmine','Jennifer','Jessica',
  'Juliette','Kate','Leah','Lily','Linda',
  'Lea','Madison','Makayla','Margaret','Maria',
  'Mariana','Mary','Megan','Mia','Olivia',
  'Patricia','Rachel','Samantha','Sarah','Sophie',
  'Susan','Taylor','Valeria','Victoria','Zoe',
  'Alexander','Anthony','Benjamin','Brandon','Carter',
  'Charles','Charlie','Christian','Christopher','Daniel',
  'David','Deven','Dylan','Elijah','Eric',
  'Ethan','Felix','Gabriel','George','Harry',
  'Hudson','Hunter','Jack','Jacob','James',
  'Jason','Jayden','Jeremiah','John','Joseph',
  'Joshua','Justin','Kevin','Liam','Logan',
  'Lucas','Matthew','Michael','Neil','Noah',
  'Oliver','Owen','Raphael','Richard','Robert',
  'Ryan','Samuel','Thomas','Tyler','William'
];

/* Sample colors */
/* TODO: Split them to several palettes and allow choice of which palettes to use, ie. warm, cool, grays, greens, etc. */

var colors = [
  'antiquewhite', 'brown', 'chocolate', 'coral', 'crimson',
  'darkgray', 'darkred', 'darkorange', 'darksalmon',
  'firebrick', 'floralwhite', 'gainsboro', 'gold', 'goldenrod',
  'gray', 'indianred', 'khaki', 'lightcoral', 'lightsalmon', 'lightyellow',
  'maroon', 'mistyrose', 'navajowhite', 'mocassin', 'orange', 'orangered',
  'peru', 'red', 'rosybrown', 'saddlebrown', 'sandybrown', 'sienna',
  'silver', 'slategray', 'tan', 'tomato', 'teal', 'navy', 'black',
];


var namesLength = names.length;

/* Domain suffixes */

var domains = [
  '.net', '.org', '.edu', '.com',
  '.com', '.com', '.com', '.com',
];

/* Frequency table for word lengths */

var wordLengths = [
  1, 1,
  2, 2, 2, 2, 2, 2, 2,
  3, 3, 3, 3,
  4, 4,
  5
];

/* Frequency table for random syllabes */

var syllabeCounts = [
  10,
  15,
  20,
  25,

  30,
  35,
  40,
  45,

  50,
  75,
  100,
  125,

  150,
  175,
  175,
  175,
];



/* ---------- ---------- ---------- ---------- ---------- ---------- */
/* Utility methods */
/* ---------- ---------- ---------- ---------- ---------- ---------- */


var capitalize = function(str) {
  return str.slice(0,1).toUpperCase() + str.slice(1).toLowerCase();
};

var getName = function() {
  return names[Math.floor(Math.random() * namesLength)];
};

var getWord = function(min, max) {
  var length = wordLengths[Math.floor(Math.random() * 16)];
  if(min && (length < min)) length = min;
  if(max && (length > max)) length = max;
  var word = '';
  for(var i = 0; i < length; ++i) {
    var count = syllabeCounts[Math.floor(Math.random() * 16)];
    word += syllabes[Math.floor(Math.random() * count)];
  }
  return word;
};

var getDomain = function() {
  return getWord(2) + domains[Math.floor(Math.random() * 8)];
};

var randomElement = function(array) {
  return array[Math.floor(Math.random() * array.length)];
};


var attachUserField = {

  name: function(u, o) {
    o.name = u.name;
  },

  surname: function(u, o) {
    o.surname = u.surname;
  },

  fullname: function(u, o) {
    o.fullname = u.name + ' ' + u.surname;
  },

  email: function(u, o) {
    o.email = (u.name + '@' + u.domain).toLowerCase();
  },

  username: function(u, o) {
    o.username = (u.name + '@' + u.domain).toLowerCase();
  },
  
  'emails.address': function(u, o) {
    o.emails = [
      {address: (u.name + '@' + u.domain).toLowerCase(), validated: false}
    ];
  },

  'profile.name': function(u, o) {
    o.profile = {
      name: u.name + ' ' + u.surname,
    };
  },

};

var defaultUserFields = ['name', 'surname', 'fullname', 'email'];

/* ---------- ---------- ---------- ---------- ---------- ---------- */
/* Exported methods */
/* ---------- ---------- ---------- ---------- ---------- ---------- */


Fake = {};

Fake.integer = function(a,b){
  /* ---------- ---------- ---------- ---------- ---------- ---------- */
  /* Usage:
  /* Fake.integer()         // 0 ~ 1000
  /* Fake.integer(max)      // 0 ~ max
  /* Fake.integer(min,max)  // min ~ max
  /* ---------- ---------- ---------- ---------- ---------- ---------- */
  var max = 0;
  var min = 0;
  if(a && b){
    max=b;
    min=a;
  }else if (a){
    max=a;
    min=0;
  }else{
    max=1000;
    min=0;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Fake.float = function(a,b){
  /* ---------- ---------- ---------- ---------- ---------- ---------- */
  /* Usage:
  /* Fake.float()         // 0 ~ 1000
  /* Fake.float(max)      // 0 ~ max
  /* Fake.float(min,max)  // min ~ max
  /* ---------- ---------- ---------- ---------- ---------- ---------- */
  var max = 0;
  var min = 0;
  if(a && b){
    max=b;
    min=a;
  }else if (a){
    max=a;
    min=0;
  }else{
    max=1000;
    min=0;
  }
  return Math.random() * (max - min) + min;
}


Fake.user = function(params) {
  var fields;

  if(params && params.fields) {
    fields = params.fields;
  } else {
    fields = defaultUserFields;
  }

  var user = {
    name: getName(),
    surname: capitalize(getWord(3)),
    domain: getDomain(),
  };

  var result = {};

  for(var i in fields) {
    if(attachUserField[fields[i]])
      attachUserField[fields[i]](user, result);
  }

  return result;
};

Fake.word = function() {
  var result = getWord();
  result = result.slice(0,1).toUpperCase() + result.slice(1).toLowerCase();;
  return result;
};

Fake.sentence = function(length) {
  if(!length) {
    var length = 4 + Math.floor(Math.random() * 8);
  }
  var ending = (Math.random() < 0.95) ? '.' : (Math.random() < 0.5) ? '!' : '?';
  var result = getWord();
  result = result.slice(0,1).toUpperCase() + result.slice(1).toLowerCase();
  for(var i = 1; i < length; ++i) {
    result += ' ' + getWord();
  }
  return result + ending;
};


Fake.paragraph = function(length) {
  if(!length) {
    length = 6 + Math.floor(Math.random() * 8);
  }
  var result = Fake.sentence();
  for(var i = 1; i < length; ++i) {
    result += ' ' + Fake.sentence();
  }
  return result;
};



Fake.fromArray = function(array) {  
  return randomElement(array);
};

Fake.color = function() {
  return randomElement(colors);
};






