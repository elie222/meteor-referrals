Referrer._addReferral = (userId, referrerCode) => {
  const referrer = Referrers.findOne({code: referrerCode});

  if (referrer) {
    Referrals.insert({
      referrerId: referrer._id,
      userId
    });
  }
};
