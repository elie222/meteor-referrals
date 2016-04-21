Referrals = new Mongo.Collection("referrals");

const ReferralsSchema = new SimpleSchema({
  userId: {
    type: String,
    unique: true
  },
  referrerId: {
    type: String
  }
});

Referrals.attachSchema(ReferralsSchema);

Referrals.attachBehaviour('timestampable');