define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PaginationController = (function () {
        function PaginationController($scope, $timeout) {
            this.$scope = $scope;
            this.$timeout = $timeout;
        }
        PaginationController.prototype.pages = function () {
            var p = [];
            for (var i = 1; i <= this.count; i++)
                p.push(i);
            return p;
        };
        PaginationController.prototype.choosePage = function (page) {
            var _this = this;
            this.$timeout(function () {
                _this.onPageChange({ $page: page });
            }, 0);
        };
        return PaginationController;
    }());
    PaginationController.$inject = ['$scope', '$timeout'];
    exports.default = PaginationController;
});
//# sourceMappingURL=pagination.controller.js.map