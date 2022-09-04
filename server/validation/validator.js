const { GenericError } = require('../helpers');

const validate = (schema, data) => schema.validateAsync(data).catch((error) => {
  throw new GenericError(400, error.details[0].message);
});

module.exports = validate;
