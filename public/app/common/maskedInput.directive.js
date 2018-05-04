define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NAME = 'maskedInput';
    var DIRECTIVE = {
        restrict: 'A',
        scope: {
            mask: '@maskedInput',
            placeholder: '@miPlaceholder'
        },
        link: function ($scope, $element, attrs) {
            $element.mask($scope.mask, {
                placeholder: $scope.placeholder
            });
        }
    };
    exports.default = DIRECTIVE;
});
//# sourceMappingURL=maskedInput.directive.js.map