define(["require", "exports", "./list/list.module", "./product/product.module", "./productCart/productCart.module", "./solution/solution.module", "./order/order.module", "./payment/payment.module", "./repository.service"], function (require, exports, list_module_1, product_module_1, productCart_module_1, solution_module_1, order_module_1, payment_module_1, repository_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mdl = angular.module('vc.products', [
        list_module_1.default,
        product_module_1.default,
        productCart_module_1.default,
        solution_module_1.default,
        order_module_1.default,
        payment_module_1.default
    ]);
    mdl.service(repository_service_1.NAME, repository_service_1.default);
    exports.default = mdl.name;
});
//# sourceMappingURL=products.module.js.map