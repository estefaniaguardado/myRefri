/* global $ */

$.validator.methods.email = function (value, element) {
  return this.optional(element) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

$('#signForm').validate({
  rules: {
    email: {
      required: true,
      email: true,
    },
    username: {
      required: true,
      minlength: 5,
    },
    password: {
      required: true,
      minlength: 8,
    },
    repeatedPassword: {
      required: true,
      minlength: 8,
      equalTo: '#password',
    },
    messages: {
      email: {
        required: 'Please enter a valid email address',
        email: 'Please enter an email with format name@domain.com',
      },
      username: {
        required: 'Please enter an username',
        minlength: 'Your username must be at least 5 characters long',
      },
      password: {
        required: 'Please provide a password',
        minlength: 'Your password must be at least 8 characters long',
      },
      repeatedPassword: {
        required: 'Please provide a password',
        minlength: 'Your password must be at least 8 characters long',
        equalTo: 'Please enter the same password as above',
      },
    },
  },
});

$('#loginForm').validate({
  rules: {
    username: {
      required: true,
      minlength: 4,
    },
    password: {
      required: true,
      minlength: 8,
    },
    messages: {
      username: {
        required: 'Please enter your username',
        minlength: 'Your username must be at least 5 characters long',
      },
      password: {
        required: 'Please provide your password',
        minlength: 'Your password must be at least 8 characters long',
      },
    },
  },
});
