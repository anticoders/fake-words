Package.describe({
  name:     "muqube:fake",
  version:  "0.4.3",
  summary:  "Random text, data and simple schema docs generator",
  git:      "https://github.com/muqube/meteor-fake",
});


Package.on_use(function (api, where) {
  api.use(["erasaur:meteor-lodash@4.0.0"]);
  api.export('Fake', ['client', 'server']);
  api.add_files('fake.js', ['client', 'server']);
});
