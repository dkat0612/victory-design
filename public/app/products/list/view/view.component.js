define(["require", "exports", "./view.controller", "./../list.component"], function (require, exports, view_controller_1, list_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NAME = 'vcProductsView';
    var COMPONENT = {
        bindings: {
            category: '<'
        },
        require: {
            list: '^^' + list_component_1.NAME
        },
        templateUrl: '/public/app/products/list/view/view.template.html',
        controller: view_controller_1.default,
    };
    exports.default = COMPONENT;
});
//# sourceMappingURL=view.component.js.map