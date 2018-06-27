const os = require('os');

const config = {
    "extends": "airbnb-base",
    "rules": {},
    "env": {
      "mocha": true,
    }
};

// Fix CRLF || LF issues
if (os.platform().startsWith('win')) {
  config.rules["linebreak-style"] = [
    "error",
    "windows"
  ];
}

module.exports = config;
