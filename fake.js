/* ---------- ---------- ---------- ---------- ---------- ---------- */
/* Exported methods */
/* ---------- ---------- ---------- ---------- ---------- ---------- */


Fake = {};



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

Fake.simpleSchemaDoc = function(schema, overrideDoc) {
  var _MAX_INT = 9007199254740991;
  var _MIN_INT = -9007199254740991;
  var fakeObj = {};
  _.each(schema._schemaKeys, function (key) {
    var schemaKey = schema._schema[key],
        type = schema._schema[key].type.name,
        max = _.get(schemaKey, 'max', _MAX_INT),
        min = _.get(schemaKey, 'min', _MIN_INT),
        allowedValues = _.get(schemaKey, 'allowedValues', undefined),
        value = null;
    min = _clamp(min, _MIN_INT, max);
    switch(type) {
      case 'String':
        if (allowedValues) {
          value = Fake.fromArray(allowedValues);
        } else {
          max = _clamp(max, 0, 100);
          min = _clamp(min, 0, max);
          value = _getRandomString(min, max);
        }
        break;
      case 'Number':
        var decimal = _.get(schemaKey, 'decimal', false)
        value = _getRandomNumber(min, max, !decimal);
        break;
      case 'Boolean':
        value = _getRandomNumber(0, 1) > 0.5;
        break;
    }
    if(_.isString(value) || _.isNumber(value) || _.isBoolean(value)) {
      lodash.set(fakeObj, key, value);
    }
  });

  if (!_.isEmpty(overrideDoc)) {
    _.each(_.keys(overrideDoc), function (key) {
      _.set(fakeObj, key, overrideDoc[key]);
    });
  }

  return fakeObj;
};
