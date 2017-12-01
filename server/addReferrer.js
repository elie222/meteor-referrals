
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
});
