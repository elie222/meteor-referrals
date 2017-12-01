# Referrals

Adds a referral system to a Meteor app.

## Documentation

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

  // if you'd like to track social login
  if (user.services.facebook || user.services.google) {
    user.askReferrer = true;
  }

  return user;
});
```

Add the following code somewhere on the client if you want to track social logins:
(would love to find a better social to this)
```
Tracker.autorun(() => {
  const user = Meteor.user();

  if (!user || !user.askReferrer)
    return;

  const referrerCode = Referrer._referrerCode;

  Meteor.call('setReferrer', { referrerCode });
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

The default for the currency symbol is `£`. You can change this to dollars by setting `Referrer.currency = '$'` for example.

## Changelog

* Commission (%) / CPA added.
* Click tracking added.
