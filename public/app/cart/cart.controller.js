define(["require", "exports", "./cart.service"], function (require, exports, cart_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CartController = (function () {
        function CartController(cart, $state) {
            this.cart = cart;
            this.$state = $state;
        }
        CartController.prototype.getCart = function () {
            return this.cart.getCart();
        };
        CartController.prototype.clearCart = function () {
            this.cart.clearCart();
        };
        return CartController;
    }());
    CartController.$inject = [cart_service_1.NAME, '$state'];
    exports.default = CartController;
});
//# sourceMappingURL=cart.controller.js.map