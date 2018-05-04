define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PaymentFormController = (function () {
        function PaymentFormController($stateParams, $http, $cookies) {
            this.$stateParams = $stateParams;
            this.$http = $http;
            this.$cookies = $cookies;
            this.loading = false;
            this.sitelink = 'http://victory.kz';
            this.myOrder = false;
            this.model = {
                BackLink: this.sitelink + "/payment/" + this.$stateParams.order + "/success",
                FailureBackLink: this.sitelink + "/payment/" + this.$stateParams.order + "/fail",
                PostLink: this.sitelink + "/paymentraw/success/" + this.$stateParams.order,
                FailurePostLink: this.sitelink + "/paymentraw/fail/" + this.$stateParams.order,
                Signed_Order_B64: ''
            };
        }
        PaymentFormController.prototype.$onInit = function () {
            var _this = this;
            this.model.email = this.$cookies.get('email');
            this.myOrder = +this.$cookies.get('order') == +this.$stateParams.order;
            var confirmedOrders = angular.fromJson(sessionStorage.getItem('confirmedOrders'));
            this.myOrder = _(confirmedOrders).includes(+this.$stateParams.order) || this.myOrder;
            if (this.myOrder) {
                this.loading = true;
                this.getOrder().then(function (r) {
                    _this.order = r.order;
                    _this.model.Signed_Order_B64 = r.sign;
                    _this.price = r.price;
                }).finally(function () {
                    _this.loading = false;
                });
            }
            ;
        };
        PaymentFormController.prototype.confirm = function () {
            var _this = this;
            var promise = this.$http.post("http://api.victory.kz/payment/confirm/" + this.$stateParams.order, { phone: this.phone }).then(function (r) { return r.data; });
            this.loading = true;
            promise.then(function (data) {
                _this.myOrder = true;
                var confirmedOrders = angular.fromJson(sessionStorage.getItem('confirmedOrders')) || [];
                confirmedOrders.push(+_this.$stateParams.order);
                sessionStorage.setItem('confirmedOrders', angular.toJson(confirmedOrders));
                _this.getOrder().then(function (r) {
                    _this.order = r.order;
                    _this.model.Signed_Order_B64 = r.sign;
                    _this.price = r.price;
                }).finally(function () {
                    _this.loading = false;
                });
            }, function (reason) {
                alertify.error("Скорее всего вы ввели неправильный номер, попробуйте еще раз", 3);
            }).finally(function () {
                _this.loading = false;
            });
        };
        PaymentFormController.prototype.getOrder = function () {
            var promise = this.$http.get("http://api.victory.kz/payment/sign/" + this.$stateParams.order).then(function (r) { return r.data; });
            return promise;
        };
        return PaymentFormController;
    }());
    exports.PaymentFormController = PaymentFormController;
    PaymentFormController.$inject = ['$stateParams', '$http', '$cookies'];
    exports.NAME = 'vcPaymentForm';
    exports.COMPONENT = {
        controller: PaymentFormController,
        templateUrl: '/public/app/products/payment/form.template.html'
    };
    exports.default = {
        name: exports.NAME,
        component: exports.COMPONENT
    };
});
//# sourceMappingURL=form.component.js.map