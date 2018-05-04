define(["require", "exports", "./static.controller"], function (require, exports, static_controller_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NAME = 'vcStaticPages';
    var COMPONENT = {
        templateUrl: '/public/app/static/static.template.html',
        controller: static_controller_1.default
    };
    exports.default = {
        name: NAME,
        component: COMPONENT
    };
});
//# sourceMappingURL=static.component.js.map