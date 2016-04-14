const assert     = require('chai').assert;
const validators = require('../src/validator-matveev').validateRegistrationData;
const FIXTURES   = require('./fixtures.json');

suite('Validate registration data');

Object.keys(FIXTURES).forEach(field => {
    test(FIXTURES[field].header, () => {
        assert.deepEqual(validators(FIXTURES[field].input) || {}, FIXTURES[field].expect);
    });
});
