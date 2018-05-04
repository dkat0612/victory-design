define(["require", "exports", "./order.controller"], function (require, exports, order_controller_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NAME = "vcMakeOrder";
    exports.COMPONENT = {
        controller: order_controller_1.default,
        templateUrl: '/public/app/products/order/order.template.html'
    };
    exports.default = {
        name: exports.NAME,
        component: exports.COMPONENT
    };
});
//# sourceMappingURL=order.component.js.map