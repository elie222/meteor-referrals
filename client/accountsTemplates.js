// AccountsTemplates.addField({
//   _id: 'referrerCode',
//   type: 'hidden'
// });

Referrer.referralsPreSignUpHook = (password, options) => {
  options.referrerCode = Referrer._referrerCode;
};
