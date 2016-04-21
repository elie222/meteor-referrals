const UserSchema = new SimpleSchema({
  referrerCode: {
    type: String,
    optional: true,
    denyUpdate: true
  }
});

Meteor.users.attachSchema(UserSchema);

if (Meteor.isServer) {
  Meteor.users.after.insert( (userId, doc) => Referrer._addReferral(doc._id, doc.referrerCode) );
}
