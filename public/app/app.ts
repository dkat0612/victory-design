/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../Scripts/typings/alertify/alertify.d.ts" />
/// <reference path="../../Scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
/// <reference path="../../Scripts/typings/angularjs/angular-cookies.d.ts" />
/// <reference path="../../Scripts/typings/lodash/lodash.d.ts" />
/// <reference path="../../Scripts/typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/angular-ui-router/index.d.ts" />
/// <reference path="../../Scripts/typings/maskedinput/maskedinput.d.ts" />



import Cart from './cart/cart.module';
import States from './app.routes';
import Products from './products/products.module';
import Components from './common/common.module';
import Static from './static/static.module';



let mdl = angular.module('app', [
    'ngCookies',
    'ui.router',
    'ui.bootstrap',
    'ngSanitize',
    'ngResource',
    Static,
    Products,
    Cart,
    Components
]);
mdl.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$sceDelegateProvider', '$httpProvider', (
    $stateProvider: ng.ui.IStateProvider,
    $urlRouterProvider: ng.ui.IUrlRouterProvider,
    $locationProvider: ng.ILocationProvider,
    $sceDelegateProvider: ng.ISCEDelegateProvider,
    $httpProvider: ng.IHttpProvider
) => {
    $sceDelegateProvider.resourceUrlWhitelist(['self', 'http://*.victory.kz/**', 'http://api.victory.kz/**']);

    States.forEach((state) => {
        $stateProvider.state(state);
    });
    //$locationProvider.hashPrefix('!');

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false,
        rewriteLinks: true
    });

    $urlRouterProvider.otherwise(() => {
        console.log('wrongstate');
    })    
}]);

mdl.run(['$document', '$rootScope', ($document: ng.IDocumentService, $rootScope: ng.IRootScopeService) => {
    $rootScope.$on('$viewContentLoading', (event, viewconfig) => {
        let preloader = $document.find('#content-preloader');
        preloader.removeClass('hidden');
    });
    $rootScope.$on('$viewContentLoaded', (event) => {
        let preloader = $document.find('#content-preloader');
        preloader.addClass('hidden');
    });
}]);

angular.bootstrap(document, [mdl.name]);

export default mdl.name;
