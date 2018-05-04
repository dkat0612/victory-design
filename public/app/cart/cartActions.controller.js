define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CartActionController = (function () {
        function CartActionController() {
        }
        CartActionController.prototype.addToCart = function (id) {
            console.log('add to cart', id);
        };
        return CartActionController;
    }());
    CartActionController.$inject = [];
    exports.default = CartActionController;
    exports.NAME = 'vcCartActionsController';
});
//# sourceMappingURL=cartActions.controller.js.map