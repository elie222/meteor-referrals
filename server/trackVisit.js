Meteor.methods({
  trackVisit({ code }) {
    Referrers.update({ code }, {
      $inc: {
        clicks: 1,
      },
    }, () => {});
  },
});
