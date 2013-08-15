Package.describe({
  summary: "Random text and data generator"
});

Package.on_use(function (api, where) {
  api.export('Fake');
  api.add_files('fake.js', ['client', 'server']);
});
