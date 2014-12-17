'use strict';

angular.module('kbCliApp')
  .factory('chart', function () {
    var chart = {};

    var resetChart = function () {
      chart.options = {

        animation: false,
        scaleOverride: true,
        scaleSteps: 7,//Number - The number of steps in a hard coded scale
        scaleStepWidth: 20,//Number - The value jump in the hard coded scale
        scaleStartValue: 0//Number - The scale starting value
      };
      chart.labels = [''];
      chart.series = ['You', 'World Record'];
      chart.data = [
        [0]
      ];
//      chart.onClick = function (points, evt) {
//      };

    };

    resetChart();

    chart.shiftData = function(wpm) {
      if (chart.data[0].length > 20) {
        chart.data[0].shift();
        chart.labels.shift();
      }
      chart.data[0].push(wpm);
      chart.labels.push('');
    };

    return chart;
  });
