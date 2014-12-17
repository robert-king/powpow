'use strict';

angular.module('kbCliApp')
  .factory('worldRank', ['ref', 'user', 'keyboard', function (ref, user, keyboard) {
    var wpmCounts = ref.wpmCounts();
    var worldRank = {
      rank: {
        left: '?',
        right: '?',
        both: '?'
      },
      updateWorldRankings: function(prevWPM, newWPM) {
        if (prevWPM < newWPM) {
          ref.wpmTransaction(prevWPM, -1, keyboard.currentHand);
          ref.wpmTransaction(newWPM, 1, keyboard.currentHand);
        }
      }
    };

    var getRank = function(counts, wpm) {
      if (!user.isLoggedIn || !counts) {
        return '?';
      }
      var rank = 1;
      angular.forEach(counts, function(v, k) {
        if (k > wpm) {
          rank += v;
        }
      });
      return rank;
    };

    var calculateWorldRanking = function() {
      if (!user.userinfo || !user.userinfo.recordWPM) {
        return;
      }
      worldRank.rank.left = getRank(wpmCounts.left || {}, user.userinfo.recordWPM.left || 0);
      worldRank.rank.right = getRank(wpmCounts.right || {}, user.userinfo.recordWPM.right || 0);
      worldRank.rank.both = getRank(wpmCounts.both || {}, user.userinfo.recordWPM.both || 0);
    };

    wpmCounts.$watch(calculateWorldRanking);
    user.userinfoPromise.then(function(userinfo) {
      userinfo.$watch(calculateWorldRanking);
    });



    return worldRank;
  }]);
