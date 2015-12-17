AutoForm.hooks({
  addReferrerForm: {
    onSuccess: function (formType, result) {
      alert('Successfully added referrer');
    },
    onError: function (formType, error) {
      alert('Error: ' + error.reason + '. Note: name and code must be unique');
    }
  }
});