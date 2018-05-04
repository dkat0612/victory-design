define(["require", "exports", "./../../cart/cart.service"], function (require, exports, cart_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SolutionController = (function () {
        function SolutionController($stateParams, $cart, $state) {
            this.$stateParams = $stateParams;
            this.$cart = $cart;
            this.$state = $state;
        }
        SolutionController.prototype.$onInit = function () {
            var _this = this;
            var cart = [];
            var products = this.$stateParams.products.split(',');
            this.$cart.clearCart(true);
            products.forEach(function (p) {
                var product = p.split('-');
                _this.$cart.addToCart(product[0], '', '', product[1], 0);
            });
            this.$state.go('products.cart');
        };
        return SolutionController;
    }());
    SolutionController.$inject = ['$stateParams', cart_service_1.NAME, '$state'];
    exports.default = SolutionController;
});
//# sourceMappingURL=solution.controller.js.map