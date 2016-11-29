/* ---------- ---------- ---------- ---------- ---------- ---------- */
/* Utility methods */
/* ---------- ---------- ---------- ---------- ---------- ---------- */


capitalize = function(str) {
    return str.slice(0,1).toUpperCase() + str.slice(1).toLowerCase();
};

getName = function() {
    return names[Math.floor(Math.random() * namesLength)];
};

getWord = function(min, max) {
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

getDomain = function() {
    return getWord(2) + domains[Math.floor(Math.random() * 8)];
};

getRandomImageUrl = function() {
    return 'http://loremflickr.com/320/240?random='+_getRandomNumber(0,100,true);
};

randomElement = function(array) {
    return array[Math.floor(Math.random() * array.length)];
};


attachUserField = {

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

defaultUserFields = ['name', 'surname', 'fullname', 'email'];

_getRandomString = function (min, max) {
    var length = Math.round(Math.random() * (max - min)) + min;
    var s = '', ds = _.trunc(Fake.sentence(), {length: length, omission: '.'});
    while ((s.length + ds.length) <= length) {
        s += ds;
        ds = Fake.sentence();
    }
    return s;
};

_getRandomNumber = function (min, max, isInteger) {
    var r = Math.random() * (max - min) + min;
    if (isInteger)
        r = Math.round(r);
    return r;
};

_clamp = function (num, lower, upper) {
    return (num < lower)? lower : (num > upper)? upper : num ;
};