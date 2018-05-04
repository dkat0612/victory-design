import Solution from './solution.component';

let mdl = angular.module('vc.products.solution', []);

mdl.component(Solution.name, Solution.component);

mdl.config(['$stateProvider', ($stateProvider: ng.ui.IStateProvider) => {
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

export default mdl.name;