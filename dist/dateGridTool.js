(function() {
  angular.module("dateGridTool", []).directive("dateGridTool", [
    function() {
      return {
        restrict: "E",
        scope: {
          dateGrid: "="
        },
        template: "<div data-ref=\"dayPartingGrid\" onselectstart=\"return false\" class=\"bt-view bt-view bt-day-parting-grid-view\"><span class=\"bt-view bt-view bt-text fsm fwn fcb\">Your ads will be served in your audience's time zone. For example, if you select 8am - 10am, your ad will be served to people from 8am to 10am in their local time.</span>\n  <div class=\"_52t2 clearfix\">\n    <div class=\"_8-y\">12am</div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-y\">3am</div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-y\">6am</div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-y\">9am</div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-y\">12pm</div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-y\">3pm</div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-y\">6pm</div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-y\">9pm</div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8_p\">All Day</div>\n  </div>\n  <div>\n    <div ng-repeat=\"day in dateGrid.week\" ng-class=\"{'_8-v _516k clearfix': ($index == 0), '_516k clearfix': ($index &gt; 0 &amp;&amp; $index &lt; 7), '_8-x _516k clearfix': ($index == 7)}\">\n      <div class=\"bt-view bt-view _516l _516q\">\n        <div class=\"_516r\">{{day.title}}</div>\n      </div>\n      <div class=\"bt-view bt-view\">\n        <div ng-repeat=\"hour in day.hours\" ng-mousedown=\"hourMouseDown(hour)\" ng-mouseover=\"hourMouseOver(hour)\" ng-mouseup=\"hourMouseUp(hour)\" ng-class=\"{'_516n _516l _516m': ($index%3 == 0), '_516p _516l _516m': ($index%3 == 1), '_516o _516l _516m': ($index%3 == 2), 'hourStatus-selected': hour.selected}\"></div>\n      </div>\n      <div data-ref=\"allDayBox0\" ng-mousedown=\"allDayMouseDown(day, $index)\" ng-mouseover=\"allDayMouseOver(day, $index)\" ng-mouseup=\"allDayMouseUp(day, $index)\" ng-class=\"{'hourStatus-selected': day.allday.selected}\" class=\"bt-view bt-view _8-w\"></div>\n    </div>\n    <div class=\"_8-x _516k clearfix\">\n      <div data-ref=\"everyDayLabel\" class=\"bt-view bt-view _516l _516q\">\n        <div class=\"_516r\">{{dateGrid.everyday.title}}</div>\n      </div>\n      <div class=\"bt-view bt-view\">\n        <div ng-repeat=\"hour in dateGrid.everyday.hours\" ng-mousedown=\"everydayMouseDown(hour)\" ng-mouseover=\"everydayMouseOver(hour)\" ng-mouseup=\"everydayMouseUp(hour)\" ng-class=\"{'_516n _516l _516m': ($index%3 == 0), '_516p _516l _516m': ($index%3 == 1), '_516o _516l _516m': ($index%3 == 2), 'hourStatus-selected': hour.selected}\"></div>\n      </div>\n    </div>\n  </div>\n  <div class=\"_496o\">\n    <div class=\"hourStatus-selected _496q\"></div>\n    <div>Scheduled hours are shaded blue</div>\n  </div>\n</div>",
        link: function(scope, element, attrs) {
          var DAYHOUR_ARRAY, WEEKDAY_ARRAY, init, selectedValue, setDaySelected, setHourSelected, setSelected, _i, _results;
          scope.dateGrid.startHour = {};
          scope.dateGrid.overHour = {};
          scope.dateGrid.endHour = {};
          scope.dateGrid.everydayStartHour = {};
          scope.dateGrid.everydayOverHour = {};
          scope.dateGrid.allDayStartDay = null;
          scope.dateGrid.allDayOverDay = null;
          WEEKDAY_ARRAY = [0, 1, 2, 3, 4, 5, 6];
          DAYHOUR_ARRAY = (function() {
            _results = [];
            for (_i = 0; _i <= 23; _i++){ _results.push(_i); }
            return _results;
          }).apply(this);
          init = function() {
            var day, hour, _j, _k, _len, _len1, _results1;
            _results1 = [];
            for (_j = 0, _len = WEEKDAY_ARRAY.length; _j < _len; _j++) {
              day = WEEKDAY_ARRAY[_j];
              for (_k = 0, _len1 = DAYHOUR_ARRAY.length; _k < _len1; _k++) {
                hour = DAYHOUR_ARRAY[_k];
                scope.dateGrid.week[day].hours.push({
                  day: day,
                  hour: hour,
                  selected: false
                });
                if (day === 0) {
                  scope.dateGrid.everyday.hours.push({
                    hour: hour,
                    selected: false
                  });
                }
              }
              _results1.push(scope.dateGrid.week[day].allday = {
                selected: false
              });
            }
            return _results1;
          };
          setSelected = function(day, hour, selectedValue) {
            if (day === null) {
              return scope.dateGrid.everyday.hours[hour].selected = selectedValue;
            } else if (hour === null) {
              return scope.dateGrid.week[day].allday.selected = selectedValue;
            } else {
              return scope.dateGrid.week[day].hours[hour].selected = selectedValue;
            }
          };
          setHourSelected = function(hour, selectedValue) {
            var day, _j, _len, _results1;
            _results1 = [];
            for (_j = 0, _len = WEEKDAY_ARRAY.length; _j < _len; _j++) {
              day = WEEKDAY_ARRAY[_j];
              _results1.push(setSelected(day, hour, selectedValue));
            }
            return _results1;
          };
          setDaySelected = function(day, selectedValue) {
            var hour, _j, _len, _results1;
            _results1 = [];
            for (_j = 0, _len = DAYHOUR_ARRAY.length; _j < _len; _j++) {
              hour = DAYHOUR_ARRAY[_j];
              _results1.push(setSelected(day, hour, selectedValue));
            }
            return _results1;
          };
          scope.hourMouseDown = function(hour) {
            hour.selected = !hour.selected;
            return scope.dateGrid.startHour = hour;
          };
          scope.hourMouseOver = function(hour) {
            var day, selectedValue, _j, _ref, _ref1, _results1;
            if (!scope.dateGrid.startHour) {
              return;
            }
            scope.dateGrid.overHour = hour;
            selectedValue = scope.dateGrid.startHour.selected;
            _results1 = [];
            for (day = _j = _ref = scope.dateGrid.startHour.day, _ref1 = scope.dateGrid.overHour.day; _ref <= _ref1 ? _j <= _ref1 : _j >= _ref1; day = _ref <= _ref1 ? ++_j : --_j) {
              _results1.push((function() {
                var _k, _ref2, _ref3, _results2;
                _results2 = [];
                for (hour = _k = _ref2 = scope.dateGrid.startHour.hour, _ref3 = scope.dateGrid.overHour.hour; _ref2 <= _ref3 ? _k <= _ref3 : _k >= _ref3; hour = _ref2 <= _ref3 ? ++_k : --_k) {
                  _results2.push(setSelected(day, hour, selectedValue));
                }
                return _results2;
              })());
            }
            return _results1;
          };
          scope.hourMouseUp = function(hour) {
            scope.dateGrid.startHour = {};
            return scope.dateGrid.overHour = {};
          };
          scope.everydayMouseDown = function(hour) {
            var day, _j, _len;
            hour.selected = !hour.selected;
            for (_j = 0, _len = WEEKDAY_ARRAY.length; _j < _len; _j++) {
              day = WEEKDAY_ARRAY[_j];
              setSelected(day, hour.hour, hour.selected);
            }
            return scope.dateGrid.everydayStartHour = hour;
          };
          scope.everydayMouseOver = function(hour) {
            var selectedValue, _j, _ref, _ref1, _results1;
            if (!scope.dateGrid.everydayStartHour) {
              return;
            }
            scope.dateGrid.everydayOverHour = hour;
            selectedValue = scope.dateGrid.everydayStartHour.selected;
            _results1 = [];
            for (hour = _j = _ref = scope.dateGrid.everydayStartHour.hour, _ref1 = scope.dateGrid.everydayOverHour.hour; _ref <= _ref1 ? _j <= _ref1 : _j >= _ref1; hour = _ref <= _ref1 ? ++_j : --_j) {
              setSelected(null, hour, selectedValue);
              _results1.push(setHourSelected(hour, selectedValue));
            }
            return _results1;
          };
          scope.everydayMouseUp = function(hour) {
            scope.dateGrid.everydayStartHour = {};
            return scope.dateGrid.everydayOverHour = {};
          };
          selectedValue = false;
          scope.allDayMouseDown = function(weekDay, day) {
            console.log("weekDay", weekDay, "day", day);
            weekDay.allday.selected = !weekDay.allday.selected;
            selectedValue = weekDay.allday.selected;
            setSelected(day, null, selectedValue);
            setDaySelected(day, selectedValue);
            return scope.dateGrid.allDayStartDay = day;
          };
          scope.allDayMouseOver = function(weekDay, day) {
            var _j, _ref, _ref1, _results1;
            if (!scope.dateGrid.allDayStartDay) {
              return;
            }
            scope.dateGrid.allDayOverDay = day;
            _results1 = [];
            for (day = _j = _ref = scope.dateGrid.allDayStartDay, _ref1 = scope.dateGrid.allDayOverDay; _ref <= _ref1 ? _j <= _ref1 : _j >= _ref1; day = _ref <= _ref1 ? ++_j : --_j) {
              setSelected(day, null, selectedValue);
              _results1.push(setDaySelected(day, selectedValue));
            }
            return _results1;
          };
          scope.allDayMouseUp = function(weekDay, day) {
            scope.dateGrid.allDayStartDay = null;
            return scope.dateGrid.allDayOverDay = null;
          };
          return init();
        }
      };
    }
  ]);

}).call(this);
