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

const _MAX_INT = 9007199254740991;
const _MIN_INT = -9007199254740991;

const defaultArrayLength = 10;

const generateValue = function(schemaKey) {
  var type = schemaKey.type.name,
      max = _.get(schemaKey, 'max', _MAX_INT),
      min = _.get(schemaKey, 'min', _MIN_INT),
      allowedValues = _.get(schemaKey, 'allowedValues', undefined),
      value = null;

  min = _clamp(min, _MIN_INT, max);

  switch (type) {
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
      var decimal = _.get(schemaKey, 'decimal', false);
      value = _getRandomNumber(min, max, !decimal);
      break;
    case 'Boolean':
      value = _getRandomNumber(0, 1) > 0.5;
      break;
    case 'Date':
      value = new Date();
      break;
    case 'Array':
      value = [];
      for (var i = 0; i < defaultArrayLength; i++) {
        value.push({});
      }
      break;
    case 'Object':
      value = {};
      break;
  }
  return value;
};

Fake.simpleSchemaDoc = function(schema, overrideDoc={}) {
  var fakeObj = {};
  _.each(schema._schemaKeys, function (key) {

    let deepness = key.split('.'); // calculate if that field is description of inner object

    if (deepness.length > 1) {
      const
          k = deepness[0],
          value = fakeObj[k],
          f = deepness[2],
          type = schema._schema[k].type.name;

      // if field of internal object isn`t defined then it`s an inner object without scheme (type: Object or [Object])
      if (f === undefined) return;
      switch (type) {
        case 'Array': // array of objects (type: [Object])
          for (var i = 0; i < value.length; i++)
            value[i][f] = generateValue(schema._schema[key]);
          break;
        case 'Object': // inner object (type: Object)
          value[f] = generateValue(schema._schema[key]);
          break;
      }
    } else { // if it is just field in schema, not object or [Object]
      fakeObj[key] = overrideDoc[key] || generateValue(schema._schema[key]);
    }
  });
  console.log(fakeObj);
  return fakeObj;
};

/* Generate array if objects using simple-schema */
Fake.simpleSchemaArray = function(schema, length = 1, initialDoc = {}) {
  let result = [];
  for (var i = 0; i < length; i++) {
    result.push(Fake.simpleSchemaDoc(schema,initialDoc))
  }
  return result;
};
