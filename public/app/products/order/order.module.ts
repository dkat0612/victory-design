import OrderComponent from './order.component';

let mdl = angular.module('product.order', []);

mdl.component(OrderComponent.name, OrderComponent.component);

mdl.config(['$stateProvider', ($stateProvider: ng.ui.IStateProvider) => {
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

export default mdl.name;