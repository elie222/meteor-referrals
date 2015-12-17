Referrer._addReferral = function (userId, referrerCode) {
  var referrer = Referrers.findOne({code: referrerCode});

  if (referrer) {
    Referrals.insert({
      referrerId: referrer._id,
      userId: userId
    });
  }
};