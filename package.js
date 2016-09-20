Package.describe({
  name:     "muqube:fake",
  version:  "0.4.3_9",
  summary:  "Random text, data and simple schema docs generator",
  git:      "https://github.com/muqube/meteor-fake",
  documentation: "README.md"
});

Package.on_use(function (api, where) {
  api.use(["erasaur:meteor-lodash@3.10.1_1"]);
  api.export('Fake', ['client', 'server']);
  api.add_files(
      [
        'lib/data.js',
        'lib/utils.js',
        'fake.js'
      ],
      ['client', 'server']);
});

Package.onTest(function(api) {
    api.use([
        'tinytest',
        'ecmascript',
        'erasaur:meteor-lodash@3.10.1_1',
        'aldeed:simple-schema',
        'muqube:fake'
    ]);

    api.imply(['erasaur:meteor-lodash@3.10.1_1']);

    api.addFiles([
        'tests/fromArray.test.js',
        'tests/simpleSchemaDoc.test.js'
    ], ['client', 'server']);
});