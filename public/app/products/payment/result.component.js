define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ResultController = (function () {
        function ResultController($stateParams, $http, $state) {
            this.$stateParams = $stateParams;
            this.$http = $http;
            this.$state = $state;
        }
        ResultController.prototype.$onInit = function () {
            var _this = this;
            this.status = this.$state.is('payments.success') ? 'success' : null;
            this.status = this.status || (this.$state.is('payments.fail') ? 'fail' : null);
            if (this.status == 'success') {
                var promise = this.$http.get('http://api.victory.kz/payment/start/' + this.$stateParams.order).then(function (r) { return r.data; });
                promise.then(function (order) {
                    _this.order = order;
                });
            }
        };
        return ResultController;
    }());
    exports.ResultController = ResultController;
    ResultController.$inject = ['$stateParams', '$http', '$state'];
    exports.NAME = 'vcPaymentResult';
    exports.COMPONENT = {
        templateUrl: '/public/app/products/payment/result.template.html',
        controller: ResultController
    };
    exports.default = {
        name: exports.NAME,
        component: exports.COMPONENT
    };
});
//# sourceMappingURL=result.component.js.map