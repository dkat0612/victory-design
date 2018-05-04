define(["require", "exports", "./listener.service"], function (require, exports, ListenerService) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mdl = angular.module('common.listenerService', []);
    mdl.service(ListenerService.NAME, ListenerService.default);
    exports.default = mdl.name;
});
//# sourceMappingURL=listener.module.js.map