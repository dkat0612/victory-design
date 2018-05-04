define(["require", "exports", "./list.component", "./categoryListItem/categoryListItem.module", "./view/view.module"], function (require, exports, list_component_1, categoryListItem_module_1, view_module_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mdl = angular.module('vc.products.list', [
        categoryListItem_module_1.default,
        view_module_1.default
    ]);
    mdl.component(list_component_1.NAME, list_component_1.default);
    mdl.config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state({
                name: 'category',
                url: '/category',
                views: {
                    '@': {
                        template: '<vc-product-list></vc-product-list>'
                    }
                }
            });
            $stateProvider.state({
                name: 'category.show',
                url: '/show',
                views: {
                    '@category': {
                        template: '<vc-products-view></vc-products-view>'
                    }
                }
            });
            $stateProvider.state({
                name: 'category.show.param',
                url: '/{id:int}',
                views: {
                    '@category': {
                        template: '<vc-products-view></vc-products-view>'
                    }
                }
            });
            $stateProvider.state({
                name: 'category.show.param.page',
                url: '/{page:int}',
                views: {
                    '@category': {
                        template: '<vc-products-view></vc-products-view>'
                    }
                }
            });
            $stateProvider.state({
                name: 'products',
                url: '/products',
                views: {
                    '@': {
                        template: '<vc-product-list></vc-product-list>'
                    },
                    '@products': {
                        template: '<vc-products-view></vc-products-view>'
                    }
                }
            });
        }]);
    exports.default = mdl.name;
});
//# sourceMappingURL=list.module.js.map