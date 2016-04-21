Template.referrersTable.helpers({
  referrers: () => Referrers.find()
});

Template.referrersTableRow.onCreated(function () {
  this.subscribe('referralsCount', this.data._id);
});

Template.referrersTableRow.helpers({
  usersSignedUp() {
    const count = Counts.get(`referrals-count-${this._id}`);

    return count;
  }
});
