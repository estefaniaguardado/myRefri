/* global $ */

$('#loginForm').validate({
  rules: {
    username: {
      required: true,
      minlength: 4,
    },
    password: {
      required: true,
      minlength: 4,
    },
  },
});
