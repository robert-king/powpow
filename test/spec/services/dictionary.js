'use strict';

describe('Service: dictionary', function () {

  // load the service's module
  beforeEach(module('kbCliApp'));

  // instantiate service
  var dictionary;
  beforeEach(inject(function (_dictionary_) {
    dictionary = _dictionary_;
  }));

  it('should do something', function () {
    expect(!!dictionary).toBe(true);
  });

});
