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
    label: `CPA (100 = ${Referrer.currency}1, 3000 = ${Referrer.currency}30)`,
    optional: true,
    defaultValue: 0,
    min: 0,
  },
  clicks: {
    type: Number,
    optional: true,
    defaultValue: 0,
    min: 0,
  },
  userIds: {
    type: [String],
    optional: true,
    defaultValue: [],
  },
  // used to integrate with affiliate networks
  // we send a GET request to this url when a certain action happens
  postbackUrl: {
    type: String,
    optional: true,
    label: 'Postback URL (Optional)',
  },
  // used to integrate with affiliate networks
  // this is the clickid field in postbacks. eg ?clickid=123XYZ
  clickIdParam: {
    type: String,
    optional: true,
    label: 'Click Id Parameter for Postbacks (Optional)',
  },
  // used to integrate with affiliate networks
  subIdParam: {
    type: String,
    optional: true,
  },
});

Referrers.attachSchema(ReferrersSchema);

Referrers.attachBehaviour('timestampable');
