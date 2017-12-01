const moneyToString = amount => {
  const currency = Referrer.currency;

  if (!amount)
    return `${currency}0`;

  const poundAmount = amount / 100;

  if (poundAmount % 1 === 0) {
    return poundAmount > 0 ?
      `${currency}${poundAmount}` :
      `-${currency}${-poundAmount}`;
  }

  return poundAmount > 0 ?
    `${currency}${poundAmount.toFixed(2)}` :
    `-${currency}${-poundAmount.toFixed(2)}`;
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
