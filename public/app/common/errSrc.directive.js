define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NAME = 'errSrc';
    var DIRECTIVE = {
        restrict: 'A',
        link: function ($scope, $element, attrs) {
            $element.bind('error', function () {
                if (attrs.src != attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                }
            });
            attrs.$observe('ngSrc', function (value) {
                if (!value && attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                }
            });
        }
    };
    exports.default = DIRECTIVE;
});
//# sourceMappingURL=errSrc.directive.js.map