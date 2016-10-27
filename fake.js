import {Match} from "meteor/check";

SimpleSchema.extendOptions({
  fake: Match.Optional(Function)
});

Fake = {};

Fake.user = function(params = {}) {
  var {fields = defaultUserFields} = params;

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
  result = result.slice(0,1).toUpperCase() + result.slice(1).toLowerCase();
  return result;
};

Fake.name = function() {
  var result = getWord();
  result = result.slice(0,1).toUpperCase() + result.slice(1).toLowerCase();
  return result;
};

Fake.surname = function() {
  var result = getWord();
  result = result.slice(0,1).toUpperCase() + result.slice(1).toLowerCase();
  return result;
};

Fake.sentence = function(length) {
  if(!length)
    length = 4 + Math.floor(Math.random() * 8);
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

Fake.imageUrl = getRandomImageUrl;

Fake.fromArray = function(array) {  
  return randomElement(array);
};

Fake.color = function() {
  return randomElement(colors);
};

const _MAX_INT = 9007199254740991;
const _MIN_INT = -9007199254740991;

const defaultParams = {
  minArrayLength: 2,
  maxArrayLength: 10,
  callbacks: {}
};

const generateValue = function(schemaKey) {
  let {allowedValues, min=_MIN_INT, max=_MAX_INT, regEx, fake} =schemaKey;

  var type = schemaKey.type.name,
      value = null;

  min = _clamp(min, _MIN_INT, max);

  switch (type) {
    case 'String':
      switch (regEx) {
        case SimpleSchema.RegEx.Id:
          value = Random.id();
          break;
        default:
          if (allowedValues) {
            value = Fake.fromArray(allowedValues);
          } else {
            max = _clamp(max, 0, 100);
            min = _clamp(min, 0, max);
            value = _getRandomString(min, max);
          }
          break;
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
    case 'Object':
      value = {};
      break;
  }
  if (_.isFunction(fake)) {
    value = fake(schemaKey, value);
  }

  return value;
};

/** Recursive create fields for inner objects and arrays **/
const generateInnerObjectField = (schemaKey, deepness, obj, params) => {
  if (!deepness || !_.isArray(deepness) || deepness.length === 0) return;
  let d = deepness[0];

  if (deepness.length === 1) {
    obj[d] = generateValue(schemaKey);
  }
  else if (deepness[1] === '$') {
    if (!obj[d]) obj[d] = [];
    let arr = obj[d];
    let create = (arr.length === 0);
    let len = create ? _getRandomNumber(params.minArrayLength, params.maxArrayLength,true) : arr.length;

    for (var j = 0; j < len; j++) {
      if (create) arr.push({});
      generateInnerObjectField(schemaKey, _.drop(deepness, 2), arr[j], params);
    }
  }
  else if (d === '') {
    if (!obj[d]) obj[d] = {};
  }
  else {
    if (!obj[d]) obj[d] = {};
    generateInnerObjectField(schemaKey, _.drop(deepness, 1), obj[d], params);
  }
};

/** Generate one instance accordingly to schema **/
Fake.simpleSchemaDoc = function(schema, overrideDoc={}, params={}) {
  var fakeObj = {};
  params = _.defaults({},params,defaultParams);
  _.each(schema._schemaKeys, function (key) {
    const schemaKey = schema._schema[key];
    let deepness = key.split('.'); // calculate if that field is description of inner object
    if (deepness.length > 1) {
      generateInnerObjectField(schemaKey, deepness, fakeObj, params);
    } else { // if it is just field in schema, not object or [Object]
      fakeObj[key] = generateValue(schemaKey);
    }
  });
  return _.defaults({}, overrideDoc, fakeObj);
};

Fake.simpleSchemaCreateDoc = (collection, overrideDoc, params) => {
  const doc = Fake.simpleSchemaDoc(collection._c2._simpleSchema, overrideDoc, params);
  doc._id = collection.insert(doc);
  return doc;
};

/** Generate array if objects using simple-schema **/
Fake.simpleSchemaArray = function(schema, length = 1, initialDoc = {}) {
  let result = [];
  for (var i = 0; i < length; i++) {
    result.push(Fake.simpleSchemaDoc(schema,initialDoc))
  }
  return result;
};
