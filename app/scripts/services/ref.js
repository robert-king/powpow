'use strict';

/* global Firebase */

angular.module('kbCliApp')
  .factory('ref',['$firebase', '$firebaseAuth', function ($firebase, $firebaseAuth) {
    var ref = new Firebase('https://blistering-inferno-7324.firebaseio.com/');

    var wrapper = {
      auth: $firebaseAuth(ref),
      userinfo: function(uid) {
        return $firebase(ref.child('userinfo').child(uid)).$asObject();
      },
      wpmCounts: function() {
        return $firebase(ref.child('wpmCounts')).$asObject();
      },
      wpmTransaction: function(wpm, amount, side) {
        return $firebase(ref.child('wpmCounts').child(side).child(wpm))
          .$transaction(function(count) {
            return count + amount;
          });
      }
    };

    return wrapper;
  }]);
