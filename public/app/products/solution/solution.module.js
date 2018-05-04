define(["require", "exports", "./solution.component"], function (require, exports, solution_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mdl = angular.module('vc.products.solution', []);
    mdl.component(solution_component_1.default.name, solution_component_1.default.component);
    mdl.config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state({
                name: 'products.solution',
                url: '/solution?products=',
                params: {
                    products: ''
                },
                views: {
                    '@': {
                        template: '<vc-product-solution></vc-product-solution>',
                    }
                }
            });
        }]);
    exports.default = mdl.name;
});
//# sourceMappingURL=solution.module.js.map