angular.module("dateGridTool", []).directive "dateGridTool", [() ->



    return {
      restrict: "E"
      # templateUrl: 'dateGridTool.html'
      template: """{html}"""

      link: (scope, element, attrs) ->
        scope.dateGrid.startHour = {}
        scope.dateGrid.overHour = {}
        scope.dateGrid.endHour = {}



        for day in [0..6]
          for hour in [0..23]
            scope.dateGrid.week[day].hours.push {
              day: day
              hour: hour
              selected: false
            }
          scope.dateGrid.week[day].allday = {}

        for hour in [0..23]
          scope.dateGrid.everyday.hours.push {}



        scope.hourMouseDown = (hour) ->
          if hour.selected is true
            hour.selected = false
          else
            hour.selected = true

          scope.dateGrid.startHour = hour

        scope.hourMouseOver = (hour) ->

          return unless scope.dateGrid.startHour

          scope.dateGrid.overHour = hour

          for day in [scope.dateGrid.startHour.day..scope.dateGrid.overHour.day]
            for hour in [scope.dateGrid.startHour.hour..scope.dateGrid.overHour.hour]
              scope.dateGrid.week[day].hours[hour].selected = scope.dateGrid.startHour.selected

        scope.hourMouseUp = (hour) ->

          scope.dateGrid.startHour = null





    }
]
