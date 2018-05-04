define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NAME = 'focusMe';
    exports.DIRECTIVE = ['$timeout', function ($timeout) {
            var directive = {
                scope: {
                    focusMe: '='
                },
                link: function ($scope, $element, $attrs) {
                    var watcher = $scope.$watch('focusMe', function (value) {
                        console.log('value=', value);
                        if (value === true) {
                            $timeout(function () {
                                $element[0].focus();
                            });
                        }
                    });
                    $element.bind('blur', function () {
                        $scope.focusMe = false;
                    });
                    $scope.$on('destroy', function () {
                        watcher();
                    });
                }
            };
            return directive;
        }];
    exports.default = {
        name: exports.NAME,
        directive: exports.DIRECTIVE
    };
});
//# sourceMappingURL=focus-me.directive.js.map