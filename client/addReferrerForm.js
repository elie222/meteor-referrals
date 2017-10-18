AutoForm.hooks({
  addReferrerForm: {
    onSuccess() {
      alert('Successfully added referrer');
    },
    onError(formType, error) {
      alert(`Error: ${error.reason}. Note: name and code must be unique.`);
    },
  },
});
