define(["require", "exports", "./item.controller"], function (require, exports, item_controller_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NAME = 'vcWizardItem';
    exports.COMPONENT = {
        controller: item_controller_1.default,
        templateUrl: '/public/app/common/wizard/item/item.template.html',
        transclude: true,
        require: {
            wizard: '^^vcWizard'
        },
        bindings: {
            name: '@',
            next: '<',
            prev: '<',
            first: '<',
            last: '<',
            check: '&',
            onChange: '&'
        }
    };
    exports.default = {
        name: exports.NAME,
        comonent: exports.COMPONENT
    };
});
//# sourceMappingURL=item.component.js.map