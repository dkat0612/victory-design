define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var States = [
        {
            name: 'products.show',
            url: '/show/:id',
            views: {
                '@': {
                    template: '<vc-product></vc-product>'
                }
            }
        },
        {
            name: 'products.cart',
            url: '/cart',
            views: {
                '@': {
                    template: '<vc-product-cart><vc-product-cart>'
                }
            }
        },
        {
            name: 'main',
            url: '/',
            templateUrl: '/home/index'
        }
    ];
    exports.default = States;
});
//# sourceMappingURL=app.routes.js.map