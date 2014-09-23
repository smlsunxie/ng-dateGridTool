(function() {
  (function(ng) {
    "use strict";
    var app;
    app = ng.module("demo", ["dateGridTool"]);
    return app.controller("demoCtrl", function($scope) {
      $scope.dateGrid = {
        week: [
          {
            title: "Monday",
            hours: [],
            allday: {}
          }, {
            title: "Tuesday",
            hours: [],
            allday: {}
          }, {
            title: "Wednesday",
            hours: [],
            allday: {}
          }, {
            title: "Thursday",
            hours: [],
            allday: {}
          }, {
            title: "Friday",
            hours: [],
            allday: {}
          }, {
            title: "Saturday",
            hours: [],
            allday: {}
          }, {
            title: "Sunday",
            hours: [],
            allday: {}
          }
        ],
        everyday: {
          title: "Everyday",
          hours: []
        }
      };
    });
  })(angular);

}).call(this);
