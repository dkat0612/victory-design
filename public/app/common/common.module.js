define(["require", "exports", "./pagination/pagination.module", "./errSrc.directive", "./maskedInput.directive", "./listenerService/listener.module", "./ceo.service", "./http.service", "./exline.service", "./wizard/wizard.module", "./focus-me/focus-me.directive"], function (require, exports, pagination_module_1, ErrSrc, MaskedInput, listener_module_1, ceo_service_1, http_service_1, exline_service_1, wizard_module_1, focus_me_directive_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mdl = angular.module('app.common', [
        pagination_module_1.default,
        listener_module_1.default,
        wizard_module_1.default
    ]);
    mdl.directive(ErrSrc.NAME, [function () {
            return ErrSrc.default;
        }]);
    mdl.directive(MaskedInput.NAME, [function () {
            return MaskedInput.default;
        }]);
    mdl.directive(focus_me_directive_1.default.name, focus_me_directive_1.default.directive);
    mdl.service(ceo_service_1.default.name, ceo_service_1.default.service);
    mdl.service(http_service_1.default.name, http_service_1.default.service);
    mdl.service(exline_service_1.default.name, exline_service_1.default.service);
    exports.default = mdl.name;
});
//# sourceMappingURL=common.module.js.map