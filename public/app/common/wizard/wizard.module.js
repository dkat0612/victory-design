define(["require", "exports", "./wizard.component", "./item/item.component"], function (require, exports, wizard_component_1, item_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mdl = angular.module('vc.common.wizard', []);
    mdl.component(wizard_component_1.default.name, wizard_component_1.default.comonent);
    mdl.component(item_component_1.default.name, item_component_1.default.comonent);
    exports.default = mdl.name;
});
//# sourceMappingURL=wizard.module.js.map