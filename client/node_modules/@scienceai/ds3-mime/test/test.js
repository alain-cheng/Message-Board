const assert = require('assert');
const ds3Mime = require('../');

describe('ds3-mime', () => {
  it('should export the DS3 MIME as a string', () => {
    assert(typeof ds3Mime === 'string');
  });
});
