require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

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

  static checkPayload(payload) {
    return new Promise((res, rej) => {
      verify(payload, SECRET_KEY, (error, incoded) => {
        if (error) {
          rej(error);
        } else {
          res(incoded);
        }
      });
    });
  }
}

module.exports = AuthHelpers;
