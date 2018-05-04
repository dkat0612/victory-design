define(["require", "exports", "./categoryListItem.controller", "./../list.component"], function (require, exports, categoryListItem_controller_1, list_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NAME = 'vcCategoryListItem';
    var COMPONENT = {
        bindings: {
            category: '<'
        },
        require: {
            parentItem: '^^?' + exports.NAME,
            list: '^^' + list_component_1.NAME
        },
        templateUrl: '/public/app/products/list/categoryListItem/categoryListItem.template.html',
        controller: categoryListItem_controller_1.default,
    };
    exports.default = COMPONENT;
});
//# sourceMappingURL=categoryListItem.component.js.map