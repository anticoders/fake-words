Package.describe({
  summary: "Random text and data generator"
});

Package.on_use(function (api, where) {
  api.add_files('fake.js', ['client', 'server']);
});
