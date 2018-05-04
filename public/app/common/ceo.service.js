define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NAME = 'vcCeoService';
    var CEOService = (function () {
        function CEOService($document) {
            this.$document = $document;
        }
        CEOService.prototype.setTitle = function (title) {
            this.$document.find('title').html(title + ' - Victory Computers');
        };
        CEOService.prototype.setDescription = function (description) {
            this.$document.find('meta[name="description"]').attr('content', description);
        };
        CEOService.prototype.setKeywords = function (keywords) {
            this.$document.find('meta[name="keywords"]').attr('content', keywords);
        };
        return CEOService;
    }());
    exports.CEOService = CEOService;
    CEOService.$inject = ['$document'];
    exports.default = {
        name: exports.NAME,
        service: CEOService
    };
});
//# sourceMappingURL=ceo.service.js.map