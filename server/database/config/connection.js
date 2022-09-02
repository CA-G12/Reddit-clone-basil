require("dotenv").config();
const { Pool } = require("pg");

const { NODE_ENV, TEST_DATABASE_URL, DEV_DATABASE_URL, DATABASE_URL } =
  process.env;

let connectionString = "";
let ssl = false;

switch (NODE_ENV) {
  case "production":
    connectionString = DATABASE_URL;
    ssl = { rejectUnauthorized: false };
  case "development":
    connectionString = DEV_DATABASE_URL;
    break;
  case "test":
    connectionString = TEST_DATABASE_URL;
    break;
  default:
    throw new Error("The Database URL is invalid!!!");
}

const connection = new Pool({ connectionString, ssl });

module.exports = connection;
