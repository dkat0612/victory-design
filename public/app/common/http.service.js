define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HttpServicePromise = (function () {
        function HttpServicePromise(promise, canceler) {
            this.promise = promise;
            this.canceler = canceler;
        }
        HttpServicePromise.prototype.cancel = function () {
            this.canceler.resolve(true);
        };
        return HttpServicePromise;
    }());
    exports.HttpServicePromise = HttpServicePromise;
    var HttpService = (function () {
        function HttpService($http, $q) {
            this.$http = $http;
            this.$q = $q;
        }
        HttpService.prototype.get = function (url, config) {
            var defered = this.$q.defer();
            if (config.timeout == undefined) {
                config.timeout = defered.promise;
            }
            var promise = this.$http.get(url, config);
            var response = new HttpServicePromise(promise, defered);
            return response;
        };
        return HttpService;
    }());
    exports.HttpService = HttpService;
    HttpService.$inject = ['$http', '$q'];
    exports.NAME = 'vcHttpService';
    exports.default = {
        name: exports.NAME,
        service: HttpService
    };
});
//# sourceMappingURL=http.service.js.map