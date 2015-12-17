Package.describe({
  name: "elie:referrals",
  summary: "Referral tracking system",
  version: '0.0.2',
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
    'iron:router', 
    'tmeasday:publish-counts@0.4.0',
    'aldeed:simple-schema',
    'aldeed:collection2',
    'aldeed:autoform',
    'zimme:collection-timestampable',
    'alanning:roles',
    'useraccounts:core'
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