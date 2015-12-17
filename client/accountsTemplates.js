// AccountsTemplates.addField({
//   _id: 'referrerCode',
//   type: 'hidden'
// });

Referrer.referralsPreSignUpHook = function (password, options) {
  options.referrerCode = Referrer._referrerCode;
}