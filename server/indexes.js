Meteor.startup(function () {
  Referrers._ensureIndex({ code: 1 });
});
