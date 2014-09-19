(function() {
  angular.module("dateGridTool", []).directive("dateGridTool", [
    function() {
      return {
        restrict: "E",
        templateUrl: "../dist/dateGridTool.html",
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
