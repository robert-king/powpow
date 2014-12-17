'use strict';

describe('Service: ref', function () {

  // load the service's module
  beforeEach(module('kbCliApp'));

  // instantiate service
  var ref;
  beforeEach(inject(function (_ref_) {
    ref = _ref_;
  }));

  it('should do something', function () {
    expect(!!ref).toBe(true);
  });

});
