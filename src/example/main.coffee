((ng) ->
  "use strict"
  app = ng.module("demo", ["dateGridTool"])
  app.controller "demoCtrl", ($scope) ->
    $scope.dateGrid =
      week: [
        {title: "monday", hours: [], allday: {} }
        {title: "tuesday", hours: [], allday: {} }
        {title: "wednesday", hours: [], allday: {} }
        {title: "thursday", hours: [], allday: {} }
        {title: "friday", hours: [], allday: {} }
        {title: "saturday", hours: [], allday: {} }
        {title: "sunday", hours: [], allday: {} }
      ]
      everyday:
        title: "everyday"
        hours: []

) angular
