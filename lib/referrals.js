Referrals = new Mongo.Collection("referrals");

var ReferralsSchema = new SimpleSchema({
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