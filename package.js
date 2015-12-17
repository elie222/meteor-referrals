Package.describe({
  name: "elie:referrals",
  summary: "Referral tracking system",
  version: '0.0.4',
  git: "https://github.com/elie222/meteor-referrals.git"
});

Package.onUse(function (api) {

  api.versionsFrom(['METEOR@1.0']);

  // --------------------------- 1. Meteor packages dependencies ---------------------------

  api.use([
    // 'jquery',
    // 'underscore',
    'templating',
    // 'reactive-var',
  ], ['client']);

  var communityPackages = [
    'iron:router@1.0.12', 
    'tmeasday:publish-counts@0.4.0',
    'aldeed:simple-schema@1.4.0',
    'aldeed:collection2@2.6.0',
    'aldeed:autoform@4.0.0 || 5.0.0',
    'zimme:collection-timestampable@1.0.9',
    'alanning:roles@1.2.14',
    'useraccounts:core@1.12.4'
  ];

  api.use(communityPackages, ['client', 'server']);

  // ---------------------------------- 2. Files to include ----------------------------------

  api.addFiles([
    'lib/core.js',
    'lib/referrals.js',
    'lib/referrers.js',
    'lib/router.js',
    'lib/users.js'
  ], ['client', 'server']);

  api.addFiles([
    'client/accountsTemplates.js',
    'client/addReferrerForm.html',
    'client/addReferrerForm.js',
    'client/referrersTable.html',
    'client/referrersTable.js',
    'client/referrers.html',
  ], ['client']);

  api.addFiles([
    'server/publications.js',
    'server/addReferral.js'
  ], ['server']);

  // ---------------------------------- 3. Variables to export ----------------------------------

  api.export("Referrals", ['client', 'server']);
  api.export("Referrers", ['client', 'server']);
  api.export("Referrer", ['client', 'server']);

  api.imply(communityPackages);
});