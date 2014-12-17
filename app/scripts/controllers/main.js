'use strict';

angular.module('kbCliApp')
  .controller('MainCtrl', function ($scope, $http, user, worldRank, keyboard) {
    $scope.worldRank = worldRank;
    $scope.keyboard = keyboard;
    $scope.user = user;

    $scope.login = user.login;

    $scope.openConfig = function() {
      $scope.configOpen = true;
    };
    $scope.closeConfig = function() {
      $scope.configOpen = false;
    };

  });
