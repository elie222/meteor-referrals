let trackedVisit = false;

if (Meteor.isClient) {
  Router.onBeforeAction(function () {
    if (this.params.query && this.params.query[Referrer._referrerQuery])
      Referrer._referrerCode = this.params.query[Referrer._referrerQuery];

    if (!trackedVisit && Referrer._referrerCode) {
      trackedVisit = true;

      Meteor.call('trackVisit', { code: Referrer._referrerCode });
    }

    this.next();
  });

  // Meteor.startup(function () {
  //   const params = Router.params();

  //   console.log(params);
  //   if (params)
  //     return;
  // });
}

Router.route('/addReferrer');

Router.route('/referrers', {
  waitOn: () => Meteor.subscribe('referrers'),
});
