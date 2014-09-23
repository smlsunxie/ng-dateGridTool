angular.module("dateGridTool", []).directive "dateGridTool", [() ->

    return {
      restrict: "E"
      scope:
        dateGrid: "="
      # templateUrl: 'dateGridTool.html'
      template: """{html}"""

      link: (scope, element, attrs) ->

        scope.dateGrid.startHour = {}
        scope.dateGrid.overHour = {}
        scope.dateGrid.endHour = {}

        scope.dateGrid.everydayStartHour = {}
        scope.dateGrid.everydayOverHour = {}

        scope.dateGrid.allDayStartDay = null
        scope.dateGrid.allDayOverDay = null

        WEEKDAY_ARRAY = [0 .. 6]
        DAYHOUR_ARRAY = [0 .. 23]



        init = () ->

          for day in WEEKDAY_ARRAY
            for hour in DAYHOUR_ARRAY
              scope.dateGrid.week[day].hours.push
                day: day
                hour: hour
                selected: false
              if day == 0
                scope.dateGrid.everyday.hours.push
                  hour: hour
                  selected: false
            scope.dateGrid.week[day].allday =
              selected: false



        setSelected = (day, hour, selectedValue) ->

          if day == null
            scope.dateGrid.everyday.hours[hour].selected = selectedValue
          else if hour == null
            scope.dateGrid.week[day].allday.selected = selectedValue
          else
            scope.dateGrid.week[day].hours[hour].selected = selectedValue

        setHourSelected = (hour, selectedValue) ->

          for day in WEEKDAY_ARRAY
            setSelected day, hour, selectedValue

        setDaySelected = (day, selectedValue) ->

          for hour in DAYHOUR_ARRAY
            setSelected day, hour, selectedValue
        


        scope.hourMouseDown = (hour) ->

          hour.selected = !hour.selected
          scope.dateGrid.startHour = hour

        scope.hourMouseOver = (hour) ->

          return unless scope.dateGrid.startHour

          scope.dateGrid.overHour = hour
          selectedValue = scope.dateGrid.startHour.selected

          for day in [scope.dateGrid.startHour.day..scope.dateGrid.overHour.day]
            for hour in [scope.dateGrid.startHour.hour..scope.dateGrid.overHour.hour]
              setSelected day, hour, selectedValue

        scope.hourMouseUp = (hour) ->

          scope.dateGrid.startHour = {}
          scope.dateGrid.overHour = {}



        scope.everydayMouseDown = (hour) ->

          hour.selected = !hour.selected

          for day in WEEKDAY_ARRAY
            setSelected day, hour.hour, hour.selected

          scope.dateGrid.everydayStartHour = hour

        scope.everydayMouseOver = (hour) ->

          return unless scope.dateGrid.everydayStartHour

          scope.dateGrid.everydayOverHour = hour
          selectedValue = scope.dateGrid.everydayStartHour.selected

          for hour in [scope.dateGrid.everydayStartHour.hour .. scope.dateGrid.everydayOverHour.hour]
            setSelected null, hour, selectedValue
            setHourSelected hour, selectedValue

        scope.everydayMouseUp = (hour) ->

          scope.dateGrid.everydayStartHour = {}
          scope.dateGrid.everydayOverHour = {}

        selectedValue = false

        

        scope.allDayMouseDown = (weekDay, day) ->

          console.log "weekDay", weekDay, "day", day

          weekDay.allday.selected = !weekDay.allday.selected
          selectedValue = weekDay.allday.selected

          setSelected day, null, selectedValue
          setDaySelected day, selectedValue

          scope.dateGrid.allDayStartDay = day

        scope.allDayMouseOver = (weekDay, day) ->

          return unless scope.dateGrid.allDayStartDay

          scope.dateGrid.allDayOverDay = day

          for day in [scope.dateGrid.allDayStartDay..scope.dateGrid.allDayOverDay]
            setSelected day, null, selectedValue
            setDaySelected day, selectedValue

        scope.allDayMouseUp = (weekDay, day) ->

          scope.dateGrid.allDayStartDay = null
          scope.dateGrid.allDayOverDay = null



        init()

    }
]
