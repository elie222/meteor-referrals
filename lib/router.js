let trackedVisit = false;

if (Meteor.isClient) {
  Router.onBeforeAction(function () {
    // all the if statements are required, otherwise we will unset fields on route change
    const query = this.params.query;

    if (query) {
      if (query[Referrer._referrerQuery])
        Referrer._referrerCode = query[Referrer._referrerQuery];
      if (query[Referrer._clickIdParam])
        Referrer.clickId = query[Referrer._clickIdParam];
      if (query[Referrer._subIdParam])
        Referrer.subId = query[Referrer._subIdParam];

      const { utm_source, utm_medium, utm_campaign, utm_term, utm_content } = query;

      if (utm_source)
        Referrer.utmSource = utm_source;
      if (utm_medium)
        Referrer.utmMedium = utm_medium;
      if (utm_campaign)
        Referrer.utmCampaign = utm_campaign;
      if (utm_term)
        Referrer.utmTerm = utm_term;
      if (utm_content)
        Referrer.utmContent = utm_content;
    }

    if (!trackedVisit && Referrer._referrerCode) {
      trackedVisit = true;

      Meteor.call('trackVisit', { code: Referrer._referrerCode });
    }

    this.next();
  });
}

Router.route('/addReferrer');

Router.route('/referrers', {
  waitOn: () => Meteor.subscribe('referrers'),
});
