import StaticPages from './static.component';

let mdl = angular.module('vc.static', []);

mdl.component(StaticPages.name, StaticPages.component);

mdl.config(['$stateProvider', ($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state({
        name: 'static',
        url: '/static/:page',
        template: '<vc-static-pages></vc-static-pages>'
    });
}]);

export default mdl.name;
