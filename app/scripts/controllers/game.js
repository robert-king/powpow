'use strict';

angular.module('kbCliApp')
  .controller('GameCtrl', function ($timeout, $scope, dictionary, chart, keyboard, user, worldRank) {
//    $scope.worldRank = worldRank;
    $scope.keyboard = keyboard;
    $scope.chart = chart;
    $scope.recentWord = '';
    $scope.wpm = 0;
    $scope.ready = false;
    $scope.words = [];
    $scope.userInput = {text: ''};
    $scope.configOpen = false;


    dictionary.wordsPromise(6).then(function(words) {
      $scope.words = words;
      $scope.ready = true;
    });

    var isRecordWPM = function(wpm) {
      if (!user.isLoggedIn) { return false; }
      if (!user.userinfo.recordWPM || !user.userinfo.recordWPM[keyboard.currentHand] || wpm > user.userinfo.recordWPM[keyboard.currentHand]) {
        return true;
      }
      return false;
    };

    var incWPM = function(w) {
      $scope.wpm += 5 * w.length / 5;
      //todo: no need to save current WPM?
      //todo: upload to github
      user.setCurrentWPM($scope.wpm);
      if (isRecordWPM($scope.wpm)) {
        worldRank.updateWorldRankings((user.userinfo.recordWPM || {})[keyboard.currentHand] || 0, $scope.wpm);
        user.setRecordWPM($scope.wpm);
      }
      user.saveUser();
      chart.shiftData($scope.wpm);
      $timeout(function() {
        $scope.wpm -= 5 * w.length / 5;
        $scope.wpm = Math.max(0, $scope.wpm);
        user.setCurrentWPM($scope.wpm);
        user.saveUser();
        //shiftData($scope.wpm);
      }, 12 * 1000);
    };

    var setRecentWord = function(w) {
      $scope.recentWord = w;
      $timeout(function() {
        $scope.recentWord = '';
      }, 600);
    };

    $scope.matchWord = function() {
      //todo: exclude chars that do nothing. (red warning)
      //todo: enter or space to clear word
      var txt = angular.lowercase($scope.userInput.text);
      for (var i = 0; i < $scope.words.length; i++) {
        var w = $scope.words[i][0] + $scope.words[i][1];
        if (keyboard.oneHandedMatcher(w, txt)) {
          incWPM(w);
          setRecentWord(w);
          $scope.userInput.text = '';
          $scope.words[i] = ['', dictionary.randomWord()]; //todo: could reset any submatches on other words - run this loop twice?
        } else if (keyboard.oneHandedMatcher(w.substr(0, txt.length), txt)) {
          $scope.words[i] = [w.substr(0, txt.length), w.substr(txt.length, w.length - txt.length)];
        } else {
          $scope.words[i] = ['', w];
        }
      }
      if (txt.length) {
        var lastChar = txt[txt.length - 1];
        if (lastChar === ' ') {
          $scope.userInput.text = '';
        } else {
          keyboard.setHand(lastChar);
        }
      }
    };
  });
