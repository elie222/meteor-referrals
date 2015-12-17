Router.onBeforeAction(function () {
  if (this.params.query && this.params.query[Referrer._referrerQuery])
    Referrer._referrerCode = this.params.query[Referrer._referrerQuery];

  this.next();
});

Router.route('/addReferrer');

Router.route('/referrers', {
  waitOn: function () {
    return Meteor.subscribe('referrers');
  }
});