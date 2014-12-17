'use strict';

describe('Service: keyboard', function () {

  // load the service's module
  beforeEach(module('kbCliApp'));

  // instantiate service
  var keyboard;
  beforeEach(inject(function (_keyboard_) {
    keyboard = _keyboard_;
  }));

  it('should do something', function () {
    expect(!!keyboard).toBe(true);
  });

});
