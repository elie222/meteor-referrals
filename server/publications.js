Meteor.publish('referralsForRefferer', function (referrerId) {
  check(referrerId, String);

  if (Roles.userIsInRole(this.userId, ['admin'])) {
    return Referrals.find({referrerId: referrerId});
  } else {
    this.ready();
    return;
  }
});

Meteor.publish('referrers', function () {
  if (Roles.userIsInRole(this.userId, ['admin'])) {
    return Referrers.find();
  } else {
    this.ready();
    return;
  }
});

Meteor.publish('referralsCount', function (referrerId) {
  check(referrerId, String);

  if (Roles.userIsInRole(this.userId, ['admin'])) {
    const name = `referrals-count-${referrerId}`;

    Counts.publish(this, name, Referrals.find({ referrerId }), { nonReactive: true });
  } else {
    this.ready();
    return;
  }
});