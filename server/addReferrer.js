import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';

Meteor.methods({
  addReferrer({ code, name, url, commissionRate, cpa }) {
    check(code, String);
    check(name, Match.Optional(String));
    check(url, Match.Optional(String));
    check(commissionRate, Match.Optional(Number));
    check(cpa, Match.Optional(Number));

    if (!Roles.userIsInRole(this.userId, ['admin']))
      throw new Meteor.Error(404, 'Must be admin to call this method', this.userId);

    return Referrers.insert({
      code,
      name,
      url,
      commissionRate,
      cpa,
    });
  },
  attachReferrerToEmail({ email, code }) {
    check(email, String);

    if (!Roles.userIsInRole(this.userId, ['admin']))
      throw new Meteor.Error(404, 'Must be admin to call this method', this.userId);

    const user = Accounts.findUserByEmail(email);

    if (!user)
      throw new Meteor.Error('error', 'Unable to find user.', email);

    Referrers.update({ code }, {
      $addToSet: {
        userIds: user._id,
      },
    }, (err) => {
      if (!err) {
        Meteor.users.update({ _id: user._id }, {
          $set: {
            isAffiliate: true,
          },
        }, () => {});
      }
    });
  },
});
