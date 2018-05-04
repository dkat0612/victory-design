import {NAME as List_NAME, default as List} from './list.component';
import CategoryListItem from './categoryListItem/categoryListItem.module';
import ProductsView from './view/view.module';

let mdl = angular.module('vc.products.list', [
    CategoryListItem,
    ProductsView
]);

mdl.component(List_NAME, List);

mdl.config(['$stateProvider', ($stateProvider: ng.ui.IStateProvider) => {
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

export default mdl.name;
