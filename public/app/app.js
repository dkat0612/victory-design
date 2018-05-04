/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../Scripts/typings/alertify/alertify.d.ts" />
/// <reference path="../../Scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
/// <reference path="../../Scripts/typings/angularjs/angular-cookies.d.ts" />
/// <reference path="../../Scripts/typings/lodash/lodash.d.ts" />
/// <reference path="../../Scripts/typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/angular-ui-router/index.d.ts" />
/// <reference path="../../Scripts/typings/maskedinput/maskedinput.d.ts" />
define(["require", "exports", "./cart/cart.module", "./app.routes", "./products/products.module", "./common/common.module", "./static/static.module"], function (require, exports, cart_module_1, app_routes_1, products_module_1, common_module_1, static_module_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mdl = angular.module('app', [
        'ngCookies',
        'ui.router',
        'ui.bootstrap',
        'ngSanitize',
        'ngResource',
        static_module_1.default,
        products_module_1.default,
        cart_module_1.default,
        common_module_1.default
    ]);
    mdl.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$sceDelegateProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $sceDelegateProvider, $httpProvider) {
            $sceDelegateProvider.resourceUrlWhitelist(['self', 'http://*.victory.kz/**', 'http://api.victory.kz/**']);
            app_routes_1.default.forEach(function (state) {
                $stateProvider.state(state);
            });
            //$locationProvider.hashPrefix('!');
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false,
                rewriteLinks: true
            });
            $urlRouterProvider.otherwise(function () {
                console.log('wrongstate');
            });
        }]);
    mdl.run(['$document', '$rootScope', function ($document, $rootScope) {
            $rootScope.$on('$viewContentLoading', function (event, viewconfig) {
                var preloader = $document.find('#content-preloader');
                preloader.removeClass('hidden');
            });
            $rootScope.$on('$viewContentLoaded', function (event) {
                var preloader = $document.find('#content-preloader');
                preloader.addClass('hidden');
            });
        }]);
    angular.bootstrap(document, [mdl.name]);
    exports.default = mdl.name;
});
//# sourceMappingURL=app.js.map