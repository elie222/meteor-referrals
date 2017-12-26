// AccountsTemplates.addField({
//   _id: 'referrerCode',
//   type: 'hidden'
// });

Referrer.referralsPreSignUpHook = (password, options) => {
  options.referrerCode = Referrer._referrerCode;
  options.referrerClickId = Referrer.clickId;
  options.referrerSubId = Referrer.subId;

  options.utmSource = Referrer.utmSource;
  options.utmMedium = Referrer.utmMedium;
  options.utmCampaign = Referrer.utmCampaign;
  options.utmTerm = Referrer.utmTerm;
  options.utmContent = Referrer.utmContent;
};
