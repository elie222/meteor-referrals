Referrer._addReferral = (userId, referrerCode) => {
  if (referrerCode) {
    const generalReferrer = Referrers.findOne({code: referrerCode});
    let userReferrer;

    if (!generalReferrer)
      userReferrer = Meteor.users.findOne(referrerCode, { fields: {_id: 1} });

    const referrer = generalReferrer || userReferrer;

    if (referrer) {
      Referrals.insert({
        referrerId: referrer._id,
        userId
      }, () => {});

      if (userReferrer) {
        Meteor.users.update({_id: userReferrer._id}, {
          $inc: {
            usersReferred: 1
          }
        }, () => {});
      }
    }
  }
};

Meteor.users.after.insert( (userId, doc) => Referrer._addReferral(doc._id, doc.referrerCode) );

Meteor.methods({
  setReferrer({ referrerCode }) {
    console.log('setReferrer', referrerCode);
    // referrerCode shouldn't really be null, but if it is we'll unset askReferrer anyway
    check(referrerCode, Match.Optional(String));

    if (referrerCode) {
      const user = Meteor.users.findOne(this.userId, {fields: {askReferrer: 1}});

      if (!user || !user.askReferrer)
        return;

      Referrer._addReferral(this.userId, referrerCode);
    }

    Meteor.users.update(this.userId, {
      $unset: {
        askReferrer: 1
      }
    }, () => {});
  }
});
