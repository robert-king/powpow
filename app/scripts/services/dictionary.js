'use strict';

angular.module('kbCliApp')
  .factory('dictionary', ['$q', '$http', function ($q, $http) {
    // Service logic
    // ...

    var dictionary = [], wordLimit = 6, wordsDefered = $q.defer();

    var randomWord = function() {
      var i = Math.floor(Math.random() * dictionary.length);
      return dictionary[i];
    };

    $http.get('/dictionary.txt').success(function(r) {
      //todo: add other languages too.
      dictionary = r.split('\n');
      var words = [];
      for (var i = 0; i < wordLimit; i++) {
        words.push(['', randomWord()]);
      }
      wordsDefered.resolve(words);
    });


    var dict = {
      wordsPromise: function(numWords) {
        numWords = numWords || 6;
        return wordsDefered.promise;
      },
      randomWord: randomWord
    };

    return dict;
  }]);
