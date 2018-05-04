define(["require", "exports", "./form.component", "./result.component"], function (require, exports, form_component_1, result_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mdl = angular.module('app.payments', []);
    mdl.config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state({
                name: 'payments',
                url: '/payment/{order:int}',
                template: '<vc-payment-form></vc-payment-form>'
            });
            $stateProvider.state({
                name: 'payments.success',
                url: '/success',
                views: {
                    '@': {
                        template: '<vc-payment-result></vc-payment-result>'
                    }
                }
            });
            $stateProvider.state({
                name: 'payments.fail',
                url: '/fail',
                views: {
                    '@': {
                        template: '<vc-payment-result></vc-payment-result>'
                    }
                }
            });
        }]);
    mdl.component(form_component_1.default.name, form_component_1.default.component);
    mdl.component(result_component_1.default.name, result_component_1.default.component);
    exports.default = mdl.name;
});
//# sourceMappingURL=payment.module.js.map