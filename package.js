Package.describe({
  name:     "anticoders:fake",
  version:  "0.4.0",
  summary:  "Random text and data generator",
  git:      "https://github.com/anticoders/meteor-fake.git",
});


Package.on_use(function (api, where) {
  api.export('Fake', ['client', 'server']);
  api.add_files('fake.js', ['client', 'server']);
});
