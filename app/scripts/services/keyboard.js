'use strict';

angular.module('kbCliApp')
  .factory('keyboard', function () {

    var pairs = [
      ['qwert', 'yuiop'],
      ['asdfg', 'hjkl;'],
      ['zxcvb', 'bnm,.']
    ];

    var leftHand = (pairs[0][0] + pairs[1][0] + pairs[2][0]).replace('b', '');
    var rightHand = (pairs[0][1] + pairs[1][1] + pairs[2][1]).replace('b', '');

    var locations = {};
    for (var i = 0; i < pairs.length; i++) {
      var row = pairs[i];
      for (var j = 0; j < 5; j++) {
        locations[row[0][j]] = j + 100 * i;
        locations[row[1][j]] = 4 - j + 100 * i;
      }
    }

    var time = function() {
      return (new Date()).getTime();
    };
    var usedLeft = time() - 12 * 1000;
    var usedRight = time() - 12 * 1000;

    var recent = function(epoch) {
      return (time() - epoch)/1000 < 12; //12 seconds
    };

    var whichHand = function(c) {
      if (leftHand.indexOf(c) !== -1) {
        return 'left';
      } else if (rightHand.indexOf(c) !== -1) {
        return 'right';
      }
      return 'unknown';
    };


    var kb = {
      currentHand: 'both',
      oneHandedMatcher: function (a, b) {
        if (a.length !== b.length) {
          return false;
        }
        for (var i = 0; i < a.length; i++) {
          if (locations[a[i]] !== locations[b[i]]) {
            return false;
          }
        }
        return true;
      },
      setHand: function(c) {
        if (whichHand(c) === 'left') {
          usedLeft = time();
        } else if (whichHand(c) === 'right') {
          usedRight = time();
        }
        if (recent(usedLeft) && recent(usedRight)) {
          kb.currentHand = 'both';
        } else if (recent(usedLeft)) {
          kb.currentHand = 'left';
        } else if (recent(usedRight)) {
          kb.currentHand = 'right';
        }
      }
    };



    return kb;
  });
