Package.describe({
  name:     "anti:fake",
  version:  "0.4.1_1",
  summary:  "Random text and data generator",
  git:      "https://github.com/anticoders/meteor-fake.git",
});


Package.on_use(function (api, where) {
  api.use(["erasaur:meteor-lodash@4.0.0"]);
  api.export('Fake', ['client', 'server']);
  api.add_files('fake.js', ['client', 'server']);
});
