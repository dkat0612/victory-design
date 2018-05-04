define(["require", "exports", "./order.component"], function (require, exports, order_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mdl = angular.module('product.order', []);
    mdl.component(order_component_1.default.name, order_component_1.default.component);
    mdl.config(['$stateProvider', function ($stateProvider) {
            console.log('configured');
            $stateProvider.state({
                name: 'products.order',
                url: '/order',
                views: {
                    '@': {
                        template: '<vc-make-order></vc-make-order>'
                    }
                }
            });
        }]);
    exports.default = mdl.name;
});
//# sourceMappingURL=order.module.js.map