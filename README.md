Adds a refferal system to an app.

This package works with `Iron Router`.

When a new visitor visits the site at `example.com/some-path?r=SOME_REFERRER_CODE` and then signs up, the `SOME_REFERRER_CODE` will be stored in the field `referrerCode` in `Meteor.users`.

Referrers are stored in the `Referrers` collection which contains the following fields:
- `code` (unique)
- `name` (optional)
- `url` (optional)

This package also adds a referrerCode field to Meteor.users.

To make this work, add the following code to `Accounts.onCreateUser` on the server (or add the relevant code if you've already defined an `Accounts.onCreateUser`:
```
Accounts.onCreateUser(function (options, user) {
  // We still want the default hook's 'profile' behavior.
  if (options.profile)
    user.profile = options.profile;

  user.referrerCode = options.referrerCode;

  return user;
});
```

And you need the following in your AccountsTemplates.configuration:
```
AccountsTemplates.configure({
    //...
    preSignUpHook: function (password, options) {
        Referrer.referralsPreSignUpHook(password, options);
    },
    //...
});
```

This package provides routes, publications, and templates for admin stuff. Admin is done using the `alanning:roles` package.

You can change the query field from `r` to something else by changing `Referrer._referrerQuery`. In the future we'll hopefully have a cleaner way of doing that.