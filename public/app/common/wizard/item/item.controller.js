define(["require", "exports", "./../wizard.controller"], function (require, exports, wizard_controller_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WizarItemdController = (function () {
        function WizarItemdController() {
            this.active = false;
        }
        WizarItemdController.prototype.$onInit = function () {
            this.wizard.addItem(this);
        };
        return WizarItemdController;
    }());
    exports.WizarItemdController = WizarItemdController;
    wizard_controller_1.default.$inject = [];
    exports.default = WizarItemdController;
});
//# sourceMappingURL=item.controller.js.map