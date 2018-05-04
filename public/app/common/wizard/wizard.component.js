define(["require", "exports", "./wizard.controller"], function (require, exports, wizard_controller_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NAME = 'vcWizard';
    exports.COMPONENT = {
        controller: wizard_controller_1.default,
        templateUrl: '/public/app/common/wizard/wizard.template.html',
        transclude: true,
        bindings: {
            onFinish: '&',
            finishText: '@',
            showButtons: '<',
            link: '=?',
            disabled: '<'
        }
    };
    exports.default = {
        name: exports.NAME,
        comonent: exports.COMPONENT
    };
});
//# sourceMappingURL=wizard.component.js.map