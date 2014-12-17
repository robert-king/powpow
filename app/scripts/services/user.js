'use strict';

angular.module('kbCliApp')
  .factory('user', ['$q', 'ref', 'keyboard', function ($q, ref, keyboard) {
    var defered = $q.defer();
    var user = {
      userinfoPromise: defered.promise,
      //displayName: 'Robert King',
      isLoggedIn: false, //change
      uid: null, //change
      //userinfo: ref.userinfo(13), //remove
      //pic: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xap1/v/t1.0-1/p100x100/74680_10201639982424304_1740699050_n.jpg?oh=55e890dac49d2d182b602d6d1a334403&oe=550C3CBD&__gda__=1427675679_ef1dafcdfc685a38e0b8e8266f049929',
      login: function() {
        ref.auth.$authWithOAuthPopup('facebook').then(
          function() {
            console.log('setUser called from auth.$onAuth');
          }
        ).catch(function(error) {
          console.error('Authentication failed: ', error);
        });
      },
      setUser: function(authData) {
        if (!authData) {
          console.log('no auth data');
          return;
        }
        user.displayName = authData.facebook.displayName;
        user.uid = authData.uid;
        user.isLoggedIn = true;
        user.pic = authData.facebook.cachedUserProfile.picture.data.url;
        user.authData = authData;
        user.userinfo = ref.userinfo(user.uid);
        defered.resolve(user.userinfo);
      },
      setCurrentWPM: function(/*wpm*/) {
        //do nothing - we don't currently show wpm live.
//        if (user.isLoggedIn && user.userinfo.currentWPM !== wpm) {
//          user.userinfo.currentWPM = wpm;
//          user.userinfo.$save();
//        }
      },
      setRecordWPM: function(wpm) {
        if (user.isLoggedIn) {
          user.userinfo.recordWPM = user.userinfo.recordWPM || {};
          user.userinfo.recordWPM[keyboard.currentHand] = wpm;
        }
      },
      saveUser: function() {
        if (user.isLoggedIn) {
          user.userinfo.$save();
        }
      }
    };

    ref.auth.$onAuth(user.setUser);

    return user;
  }]);
