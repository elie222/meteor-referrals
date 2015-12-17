Referrers = new Mongo.Collection("referrers");

var ReferrersSchema = new SimpleSchema({
  code: {
    type: String,
    label: 'Referral Code',
    unique: true
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
    optional: true
  }
});

Referrers.attachSchema(ReferrersSchema);

Referrers.attachBehaviour('timestampable');

Meteor.methods({
  addReferrer: function (options) {
    check(options, {
      code: String,
      name: Match.Optional(String),
      url: Match.Optional(String)
    });

    if (!Roles.userIsInRole(this.userId, ['admin']))
      throw new Meteor.Error(404, 'Must be admin to call this method', this.userId);

    return Referrers.insert({
      code: options.code,
      name: options.name,
      url: options.url
    });
  }
});