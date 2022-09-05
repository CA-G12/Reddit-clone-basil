require('dotenv').config();
const { sign } = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

class AuthHelpers {
  static genearteToken(payload) {
    return new Promise((res, rej) => {
      sign(payload, SECRET_KEY, (error, decoded) => {
        if (error) {
          rej(error);
        } else {
          res(decoded);
        }
      });
    });
  }
}

module.exports = AuthHelpers;
