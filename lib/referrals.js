Referrals = new Mongo.Collection('referrals');

const ReferralsSchema = new SimpleSchema({
  userId: {
    type: String,
    unique: true,
  },
  referrerId: {
    type: String,
  },
  // for postbacks for affiliate networks
  clickId: {
    type: String,
    optional: true,
  },
  // for postbacks for affiliate networks
  subId: {
    type: String,
    optional: true,
  },
});

Referrals.attachSchema(ReferralsSchema);

Referrals.attachBehaviour('timestampable');
