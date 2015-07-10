Package.describe({
  name:     "sscaff1:fake",
  version:  "0.4.1",
  summary:  "Random text and data generator",
  git:      "https://github.com/sscaff1/meteor-fake.git",
});


Package.on_use(function (api, where) {
  api.export('Fake', ['client', 'server']);
  api.add_files('fake.js', ['client', 'server']);
});
