define(["require", "exports", "./../../../cart/cart.service", "./../../repository.service", "./../../../common/ceo.service"], function (require, exports, cart_service_1, repository_service_1, ceo_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ProductsViewController = (function () {
        function ProductsViewController($scope, $state, $stateParams, repo, cart, ceoService) {
            this.$scope = $scope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.repo = repo;
            this.cart = cart;
            this.ceoService = ceoService;
        }
        ProductsViewController.prototype.showProduct = function (product) {
            return product.id.indexOf('W') < 0;
        };
        ProductsViewController.prototype.getWarranty = function (product) {
            var productWarranty = 'Гарантия: ' + product.warranty + ' ' + product.warranty_period;
            if (product.warranty == 0)
                productWarranty = "";
            else if (product.warranty == 2 && product.warranty_period == "Месяц")
                productWarranty = "Гарантия: 2 Месяца";
            else if (product.warranty == 2 && product.warranty_period == "Год")
                productWarranty = "Гарантия: 2 Года";
            else if (product.warranty == 3 && product.warranty_period == "Месяц")
                productWarranty = "Гарантия: 3 Месяца";
            else if (product.warranty == 3 && product.warranty_period == "Год")
                productWarranty = "Гарантия: 3 Года";
            else if (product.warranty == 4 && product.warranty_period == "Месяц")
                productWarranty = "Гарантия: 4 Месяца";
            else if (product.warranty == 4 && product.warranty_period == "Год")
                productWarranty = "Гарантия: 4 Года";
            else if (product.warranty == 5 && product.warranty_period == "Месяц")
                productWarranty = "Гарантия: 5 Месяцев";
            else if (product.warranty == 5 && product.warranty_period == "Год")
                productWarranty = "Гарантия: 5 Лет";
            else if (product.warranty == 6 && product.warranty_period == "Месяц")
                productWarranty = "Гарантия: 6 Месяцев";
            else if (product.warranty == 6 && product.warranty_period == "Год")
                productWarranty = "Гарантия: 6 Лет";
            else if (product.warranty == 7 && product.warranty_period == "Месяц")
                productWarranty = "Гарантия: 7 Месяцев";
            else if (product.warranty == 7 && product.warranty_period == "Год")
                productWarranty = "Гарантия: 7 Лет";
            else if (product.warranty == 10 && product.warranty_period == "Год")
                productWarranty = "Гарантия: 10 Лет";
            else if (product.warranty == 11 && product.warranty_period == "Год")
                productWarranty = "Гарантия: 11 Лет";
            else if (product.warranty == 1 && product.warranty_period == "xxx")
                productWarranty = '1 Год +';
            else
                productWarranty = 'Гарантия: ' + product.warranty + ' ' + product.warranty_period;
            return productWarranty;
        };
        ProductsViewController.prototype.getStatus = function (product) {
            return this.repo.getStatus(product);
        };
        ProductsViewController.prototype.load = function () {
            var _this = this;
            if (this.list.sortParams.category == undefined || this.list.sortParams.category == null)
                this.list.sortParams.category = 0;
            if (this.list.sortParams.page == undefined)
                this.list.sortParams.page = 1;
            var promise = this.repo.getProducts(this.list.sortParams);
            promise.then(function (response) {
                if (response.data.status == "ok") {
                    _this.products = response.data.data.products;
                    _this.list.breadcrumb = response.data.data.path;
                    _this.list.pages = Math.ceil(response.data.data.pages);
                    var description = '';
                    var categories_1 = [];
                    _this.list.breadcrumb.forEach(function (category) {
                        categories_1.push(category.title);
                    });
                    var category = _this.list.breadcrumb[_this.list.breadcrumb.length - 1].title;
                    _this.ceoService.setTitle(category);
                    _this.ceoService.setDescription('Victory продает по Алматы, Астана, Казахстан, купить ' + categories_1.join(', ') + '  в наличии купить Алматы доставка по Казахстану оптом цена');
                    var keywords_1 = [];
                    categories_1.forEach(function (category) {
                        category.split(' ').forEach(function (keyword) {
                            keywords_1.push(keyword.replace(',', ''));
                        });
                    });
                    _this.ceoService.setKeywords('купить,Алматы,Казахстан,дешего,цена,Victory,Computers,в наличии, продает,' + keywords_1.join(','));
                }
                else {
                    alertify.notify(response.data.message, 'error', 3000);
                }
            });
        };
        ProductsViewController.prototype.buy = function (product) {
            this.cart.buy(product.id, product.name, product.price.toString(), +product.weight);
        };
        ProductsViewController.prototype.$onInit = function () {
            var _this = this;
            this.$scope.$watchCollection('$ctrl.$stateParams', function (newValue, oldValue) {
                _this.list.sortParams.category = _this.$stateParams.id;
                _this.list.sortParams.page = (_this.$stateParams.page != null && _this.$stateParams.page != undefined) ? _this.$stateParams.page : 1;
                _this.load();
            });
            this.list.productView = this;
            this.list.sortParams.category = this.$stateParams.id;
            this.list.sortParams.page = (this.$stateParams.page != null && this.$stateParams.page != undefined) ? this.$stateParams.page : 1;
            this.load();
        };
        return ProductsViewController;
    }());
    ProductsViewController.$inject = ['$scope', '$state', '$stateParams', repository_service_1.NAME, cart_service_1.NAME, ceo_service_1.NAME];
    exports.default = ProductsViewController;
});
//# sourceMappingURL=view.controller.js.map