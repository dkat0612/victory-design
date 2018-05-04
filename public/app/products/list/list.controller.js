define(["require", "exports", "./../repository.service", "./../../common/ceo.service"], function (require, exports, repository_service_1, ceo_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ListController = (function () {
        function ListController($state, repo, $stateParams, ceoService, $timeout) {
            this.$state = $state;
            this.repo = repo;
            this.$stateParams = $stateParams;
            this.ceoService = ceoService;
            this.$timeout = $timeout;
            this.sortParams = {
                category: 0,
                field: 'price',
                keywords: '',
                limit: 10,
                page: 1,
                toOrder: 1,
                type: 'desc'
            };
            this.limits = [10, 20, 50, 100];
            this.pages = 0;
        }
        ListController.prototype.getBreadcrumb = function () {
            if (this.breadcrumb == undefined) {
                this.breadcrumb = [{ id: 0, title: 'Товары' }];
            }
            return this.breadcrumb;
        };
        ListController.prototype.keywordsChanged = function () {
            var _this = this;
            delete this.keywordsTimeout;
            this.keywordsTimeout = this.$timeout(2000);
            this.keywordsTimeout.then(function () {
                _this.productView.load();
            });
        };
        ListController.prototype.pageChanged = function (page) {
            var stateParams = this.$stateParams;
            if (stateParams.id != undefined)
                stateParams.id = this.$stateParams.id;
            else
                stateParams.id = "0";
            stateParams.page = stateParams.page = page;
            this.$state.go('category.show.param.page', stateParams);
        };
        ListController.prototype.keyup = function (event) {
            if (event.keyCode == 13)
                this.productView.load();
        };
        ListController.prototype.sort = function (field) {
            if (this.sortParams.field == field) {
                if (this.sortParams.type == 'asc')
                    this.sortParams.type = 'desc';
                else
                    this.sortParams.type = 'asc';
            }
            else {
                this.sortParams.field = field;
                this.sortParams.type = 'desc';
            }
            this.productView.load();
        };
        ListController.prototype.$onInit = function () {
            var _this = this;
            this.sortParams.category = this.$stateParams.id;
            var promise = this.repo.getCategories(0);
            promise.then(function (response) {
                if (response.data.status == "ok") {
                    _this.categories = response.data.data;
                }
                else {
                    alertify.notify(response.data.message, 'error', 3000);
                }
            }, function (reason) {
                alertify.notify(reason, 'error', 3000);
            });
        };
        return ListController;
    }());
    ListController.$inject = ['$state', repository_service_1.NAME, '$stateParams', ceo_service_1.NAME, '$timeout'];
    exports.default = ListController;
});
//# sourceMappingURL=list.controller.js.map