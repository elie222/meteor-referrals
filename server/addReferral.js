Referrer._addReferral = (userId, {
  referrerCode,
  referrerClickId,
  referrerSubId,
  utm: {
    source,
    medium,
    campaign,
    term,
    content,
  } = {},
}) => {
  if (referrerCode) {
    const generalReferrer = Referrers.findOne({ code: referrerCode });
    let userReferrer;

    if (!generalReferrer)
      userReferrer = Meteor.users.findOne(referrerCode, { fields: { _id: 1 } });

    const referrer = generalReferrer || userReferrer;

    if (referrer) {
      Referrals.insert({
        referrerId: referrer._id,
        userId,

        clickId: referrerClickId,
        subId: referrerSubId,
      }, () => {});

      Meteor.users.update({ _id: userId }, {
        $set: {
          referrerCode,
          referrerClickId,
          referrerSubId,
          utm: {
            source,
            medium,
            campaign,
            term,
            content,
          },
        },
      }, (err, res) => {
        if (err)
          console.error('Error updating referral info for user:', userId, err);
      });

      if (userReferrer) {
        Meteor.users.update({ _id: userReferrer._id }, {
          $inc: {
            usersReferred: 1,
          },
        }, () => {});
      }
    }
  }
};

Meteor.users.after.insert((userId, doc) =>
  Referrer._addReferral(doc._id, {
    referrerCode: doc.referrerCode,
    referrerClickId: doc.referrerClickId,
    referrerSubId: doc.referrerSubId,
    utm: doc.utm,
  }));

Meteor.methods({
  setReferrer(options) {
    check(options, Object);

    const {
      referrerCode,
      referrerClickId,
      referrerSubId,
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm,
      utmContent,
    } = options;

    console.log(`setReferrer, userId: ${this.userId} options:`);
    console.log(options);

    // referrerCode shouldn't really be null, but if it is we'll unset askReferrer anyway
    check(referrerCode, Match.Optional(String));
    check(referrerClickId, Match.Optional(String));
    check(referrerSubId, Match.Optional(String));
    check(utmSource, Match.Optional(String));
    check(utmMedium, Match.Optional(String));
    check(utmCampaign, Match.Optional(String));
    check(utmTerm, Match.Optional(String));
    check(utmContent, Match.Optional(String));

    if (referrerCode) {
      const user = Meteor.users.findOne(this.userId, { fields: { askReferrer: 1 } });

      if (!user || !user.askReferrer)
        return;

      Referrer._addReferral(this.userId, {
        referrerCode,
        referrerClickId,
        referrerSubId,
        utm: {
          source: utmSource,
          medium: utmMedium,
          campaign: utmCampaign,
          term: utmTerm,
          conent: utmContent,
        },
      });
    }

    Meteor.users.update(this.userId, {
      $unset: {
        askReferrer: 1,
      },
    }, () => {});
  },
});
