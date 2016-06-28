Package.describe({
  name:     "muqube:fake",
  version:  "0.4.3_8",
  summary:  "Random text, data and simple schema docs generator",
  git:      "https://github.com/muqube/meteor-fake",
  documentation: "README.md"
});


Package.on_use(function (api, where) {
  api.use(["erasaur:meteor-lodash@3.10.1_1"]);
  api.export('Fake', ['client', 'server']);
  api.add_files('fake.js', ['client', 'server']);
});
