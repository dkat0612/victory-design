define(["require", "exports", "./pagination.controller"], function (require, exports, pagination_controller_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var COMPONENT = {
        bindings: {
            onPageChange: '&',
            count: '<',
            activePage: '<'
        },
        templateUrl: '/public/app/common/pagination/pagination.template.html',
        controller: pagination_controller_1.default,
    };
    exports.default = COMPONENT;
    exports.NAME = 'vcPagination';
});
//# sourceMappingURL=pagination.component.js.map