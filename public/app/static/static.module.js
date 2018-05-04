define(["require", "exports", "./static.component"], function (require, exports, static_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mdl = angular.module('vc.static', []);
    mdl.component(static_component_1.default.name, static_component_1.default.component);
    mdl.config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state({
                name: 'static',
                url: '/static/:page',
                template: '<vc-static-pages></vc-static-pages>'
            });
        }]);
    exports.default = mdl.name;
});
//# sourceMappingURL=static.module.js.map