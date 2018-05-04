define(["require", "exports", "./http.service"], function (require, exports, http_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NAME = 'vcExlineService';
    var ExlineService = (function () {
        function ExlineService($http, $q) {
            this.$http = $http;
            this.$q = $q;
        }
        ExlineService.prototype.getOriginPlace = function (keyword) {
            var promise = this.$http.get('https://api.exline.systems/public/v1/regions/origin', {
                params: {
                    title: keyword
                }
            });
            return promise;
        };
        ExlineService.prototype.getDestinationPlace = function (keyword) {
            var promise = this.$http.get('https://api.exline.systems/public/v1/regions/destination', {
                params: {
                    title: keyword
                }
            });
            return promise;
        };
        ExlineService.prototype.getPrice = function (model) {
            var model2 = angular.copy(model);
            model2.service = 'standard';
            var promise2 = this.$http.get('https://api.exline.systems/public/v1/calculate', {
                params: model2
            });
            model.service = 'express';
            if (model.package_weight)
                model.weight = model.package_weight;
            var promise = this.$http.get('https://api.exline.systems/public/v1/calculate', {
                params: model
            });
            var result = new http_service_1.HttpServicePromise(this.$q.all([promise.promise, promise2.promise]).then(function (r) {
                var res = {
                    calculations: {
                        express: r[0].data.calculation,
                        standard: r[1].data.calculation
                    }
                };
                return { data: res };
            }), this.$q.defer());
            return result;
        };
        return ExlineService;
    }());
    exports.ExlineService = ExlineService;
    ExlineService.$inject = [http_service_1.NAME, '$q'];
    exports.default = {
        name: exports.NAME,
        service: ExlineService
    };
});
//# sourceMappingURL=exline.service.js.map