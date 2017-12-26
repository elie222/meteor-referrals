const MAX_STRING_SIZE = 150;

const UserSchema = new SimpleSchema({
  referrerCode: {
    type: String,
    optional: true,
    max: MAX_STRING_SIZE,
  },
  referrerClickId: {
    type: String,
    optional: true,
    max: MAX_STRING_SIZE,
  },
  referrerSubId: {
    type: String,
    optional: true,
    max: MAX_STRING_SIZE,
  },
  // utm tracking
  utm: {
    type: Object,
    optional: true,
  },
  'utm.source': {
    type: String,
    optional: true,
    max: MAX_STRING_SIZE,
  },
  'utm.medium': {
    type: String,
    optional: true,
    max: MAX_STRING_SIZE,
  },
  'utm.campaign': {
    type: String,
    optional: true,
    max: MAX_STRING_SIZE,
  },
  'utm.term': {
    type: String,
    optional: true,
    max: MAX_STRING_SIZE,
  },
  'utm.content': {
    type: String,
    optional: true,
    max: MAX_STRING_SIZE,
  },

  usersReferred: {
    type: Number,
    optional: true,
    min: 0,
    defaultValue: 0,
  },
  askReferrer: {
    type: Boolean,
    optional: true,
  },
  isAffiliate: {
    type: Boolean,
    optional: true,
  },
});

Meteor.users.attachSchema(UserSchema);
