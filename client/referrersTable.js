Template.referrersTable.helpers({
  referrers: function () {
    return Referrers.find();
  }
});

Template.referrersTableRow.onCreated(function () {
  this.subscribe('referralsCount', this.data._id);
});

Template.referrersTableRow.helpers({
  usersSignedUp: function () {
    var count = Counts.get('referrals-count-' + this._id);

    return count;
  }
});