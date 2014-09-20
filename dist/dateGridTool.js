(function() {
  angular.module("dateGridTool", []).directive("dateGridTool", [
    function() {
      return {
        restrict: "E",
        template: "<div data-ref=\"dayPartingGrid\" onselectstart=\"return false\" class=\"bt-view bt-view bt-day-parting-grid-view\"><span class=\"bt-view bt-view bt-text fsm fwn fcb\">Your ads will be served in your audience's time zone. For example, if you select 8am - 10am, your ad will be served to people from 8am to 10am in their local time.</span>\n  <div class=\"_52t2 clearfix\">\n    <div class=\"_8-y\">12am</div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-y\">3am</div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-y\">6am</div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-y\">9am</div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-y\">12pm</div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-y\">3pm</div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-y\">6pm</div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-y\">9pm</div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8-z\"></div>\n    <div class=\"_8_p\">All Day</div>\n  </div>\n  <div>\n    <div ng-repeat=\"day in dateGrid.week\" ng-class=\"{'_8-v _516k clearfix': ($index == 0), '_516k clearfix': ($index &gt; 0 &amp;&amp; $index &lt; 7), '_8-x _516k clearfix': ($index == 7)}\">\n      <div class=\"bt-view bt-view _516l _516q\">\n        <div class=\"_516r\">{{day.title}}</div>\n      </div>\n      <div class=\"bt-view bt-view\">\n        <div ng-repeat=\"hour in day.hours\" ng-mousedown=\"hourMouseDown(hour)\" ng-mouseover=\"hourMouseOver(hour)\" ng-mouseup=\"hourMouseUp(hour)\" ng-class=\"{'_516n _516l _516m': ($index%3 == 0), '_516p _516l _516m': ($index%3 == 1), '_516o _516l _516m': ($index%3 == 2), 'hourStatus-selected': hour.selected}\"></div>\n      </div>\n      <div data-ref=\"allDayBox0\" class=\"bt-view bt-view _8-w\"></div>\n    </div>\n    <div class=\"_8-x _516k clearfix\">\n      <div data-ref=\"everyDayLabel\" class=\"bt-view bt-view _516l _516q\">\n        <div class=\"_516r\">{{dateGrid.everyday.title}}</div>\n      </div>\n      <div class=\"bt-view bt-view\">\n        <div ng-repeat=\"hour in dateGrid.everyday.hours\" ng-class=\"{'_516n _516l _516m': ($index%3 == 0), '_516p _516l _516m': ($index%3 == 1), '_516o _516l _516m': ($index%3 == 2)}\"></div>\n      </div>\n    </div>\n  </div>\n  <div class=\"_496o\">\n    <div class=\"hourStatus-selected _496q\"></div>\n    <div>Scheduled hours are shaded blue</div>\n  </div>\n</div>",
        link: function(scope, element, attrs) {
          var day, hour, _i, _j, _k;
          scope.dateGrid.startHour = {};
          scope.dateGrid.overHour = {};
          scope.dateGrid.endHour = {};
          for (day = _i = 0; _i <= 6; day = ++_i) {
            for (hour = _j = 0; _j <= 23; hour = ++_j) {
              scope.dateGrid.week[day].hours.push({
                day: day,
                hour: hour,
                selected: false
              });
            }
            scope.dateGrid.week[day].allday = {};
          }
          for (hour = _k = 0; _k <= 23; hour = ++_k) {
            scope.dateGrid.everyday.hours.push({});
          }
          scope.hourMouseDown = function(hour) {
            if (hour.selected === true) {
              hour.selected = false;
            } else {
              hour.selected = true;
            }
            return scope.dateGrid.startHour = hour;
          };
          scope.hourMouseOver = function(hour) {
            var _l, _ref, _ref1, _results;
            if (!scope.dateGrid.startHour) {
              return;
            }
            scope.dateGrid.overHour = hour;
            _results = [];
            for (day = _l = _ref = scope.dateGrid.startHour.day, _ref1 = scope.dateGrid.overHour.day; _ref <= _ref1 ? _l <= _ref1 : _l >= _ref1; day = _ref <= _ref1 ? ++_l : --_l) {
              _results.push((function() {
                var _m, _ref2, _ref3, _results1;
                _results1 = [];
                for (hour = _m = _ref2 = scope.dateGrid.startHour.hour, _ref3 = scope.dateGrid.overHour.hour; _ref2 <= _ref3 ? _m <= _ref3 : _m >= _ref3; hour = _ref2 <= _ref3 ? ++_m : --_m) {
                  _results1.push(scope.dateGrid.week[day].hours[hour].selected = scope.dateGrid.startHour.selected);
                }
                return _results1;
              })());
            }
            return _results;
          };
          return scope.hourMouseUp = function(hour) {
            return scope.dateGrid.startHour = null;
          };
        }
      };
    }
  ]);

}).call(this);
