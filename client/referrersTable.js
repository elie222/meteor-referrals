const moneyToString = amount => {
  if (!amount)
    return '£0';

  const poundAmount = amount / 100;

  if (poundAmount % 1 === 0) {
    return poundAmount > 0 ?
      `£${poundAmount}` :
      `-£${-poundAmount}`;
  }

  return poundAmount > 0 ?
    `£${poundAmount.toFixed(2)}` :
    `-£${-poundAmount.toFixed(2)}`;
};

Template.referrersTable.helpers({
  referrers: () => Referrers.find(),
});

Template.referrersTableRow.onCreated(function () {
  this.subscribe('referralsCount', this.data._id);
});

Template.referrersTableRow.helpers({
  cpaAmount() {
    return moneyToString(this.cpa);
  },
  usersSignedUp() {
    const count = Counts.get(`referrals-count-${this._id}`);

    return count;
  },
});
