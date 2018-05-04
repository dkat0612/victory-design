define(["require", "exports", "./cart.component", "./cart.service", "./cartActions.controller"], function (require, exports, cart_component_1, cart_service_1, cartActions_controller_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mdl = angular.module('vc.cart', []);
    mdl.component(cart_component_1.NAME, cart_component_1.default);
    mdl.service(cart_service_1.NAME, cart_service_1.default);
    mdl.controller(cartActions_controller_1.NAME, cartActions_controller_1.default);
    exports.default = mdl.name;
});
//# sourceMappingURL=cart.module.js.map