const UserSchema = new SimpleSchema({
  referrerCode: {
    type: String,
    optional: true,
    denyUpdate: true
  },
  usersReferred: {
    type: Number,
    optional: true,
    min: 0,
    defaultValue: 0
  }
});

Meteor.users.attachSchema(UserSchema);
