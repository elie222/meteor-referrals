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
  cpa: {
    type: Number,
    label: 'CPA (100 = £1, 3000 = £30)',
    optional: true,
    defaultValue: 0,
    min: 0,
  },
  clicks: {
    type: Number,
    label: 'Clicks',
    optional: true,
    defaultValue: 0,
    min: 0,
  },
});

Referrers.attachSchema(ReferrersSchema);

Referrers.attachBehaviour('timestampable');
