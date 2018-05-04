define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WizardController = (function () {
        function WizardController() {
            this.items = [];
            this.activeItem = null;
            this.disabled = false;
        }
        WizardController.prototype.$onInit = function () {
            this.link = this;
            console.log(this);
        };
        WizardController.prototype.setActive = function (name) {
            var item = _(this.items).find(function (item) {
                return item.name == name;
            });
            this.activeItem.active = false;
            this.activeItem = item;
            this.activeItem.active = true;
            if (this.activeItem.onChange)
                this.activeItem.onChange();
        };
        WizardController.prototype.next = function () {
            if (this.activeItem.check()) {
                this.setActive(this.activeItem.next);
            }
            else {
                alertify.error('Форма заполнена не верно', 3000);
            }
        };
        WizardController.prototype.prev = function () {
            this.setActive(this.activeItem.prev);
        };
        WizardController.prototype.finish = function () {
            var _this = this;
            var hasError = false;
            this.items.forEach(function (i) {
                if (hasError)
                    return;
                if (i.check && !i.check()) {
                    alertify.notify('Форма заполнена не верно', 'error', 3000);
                    _this.setActive(i.name);
                    hasError = true;
                }
            });
            if (!hasError)
                this.onFinish();
        };
        WizardController.prototype.addItem = function (item) {
            console.log(item);
            this.items.push(item);
            if (item.first) {
                if (this.activeItem != null) {
                    throw new Error("First item already defined");
                }
                this.activeItem = item;
                item.active = true;
            }
        };
        return WizardController;
    }());
    exports.WizardController = WizardController;
    WizardController.$inject = [];
    exports.default = WizardController;
});
//# sourceMappingURL=wizard.controller.js.map