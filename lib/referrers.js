Referrers = new Mongo.Collection('referrers');

const ReferrersSchema = new SimpleSchema({
  code: {
    type: String,
    label: 'Referral Code',
    unique: true,
  },
  name: {
    type: String,
    label: 'Name (Optional)',
    optional: true,
  },
  url: {
    type: String,
    label: 'URL (Optional)',
    regEx: SimpleSchema.RegEx.Url,
    optional: true,
  },
  commissionRate: {
    type: Number,
    label: 'Commission (%)',
    optional: true,
    defaultValue: 0,
    min: 0,
    max: 100,
  },
});

Referrers.attachSchema(ReferrersSchema);

Referrers.attachBehaviour('timestampable');

Meteor.methods({
  addReferrer({ code, name, url, commissionRate }) {
    check(code, String);
    check(name, Match.Optional(String));
    check(url, Match.Optional(String));
    check(commissionRate, Match.Optional(Number));

    if (!Roles.userIsInRole(this.userId, ['admin']))
      throw new Meteor.Error(404, 'Must be admin to call this method', this.userId);

    return Referrers.insert({
      code,
      name,
      url,
      commissionRate,
    });
  },
});
