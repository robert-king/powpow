'use strict';

describe('Service: worldRank', function () {

  // load the service's module
  beforeEach(module('kbCliApp'));

  // instantiate service
  var worldRank;
  beforeEach(inject(function (_worldRank_) {
    worldRank = _worldRank_;
  }));

  it('should do something', function () {
    expect(!!worldRank).toBe(true);
  });

});
