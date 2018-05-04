define(["require", "exports", "./../repository.service", "./../../cart/cart.service", "./../../common/ceo.service"], function (require, exports, repository_service_1, cart_service_1, ceo_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ProductController = (function () {
        function ProductController($scope, $state, repo, $stateParams, $cart, $sce, $element, ceoService, $document) {
            this.$scope = $scope;
            this.$state = $state;
            this.repo = repo;
            this.$stateParams = $stateParams;
            this.$cart = $cart;
            this.$sce = $sce;
            this.$element = $element;
            this.ceoService = ceoService;
            this.$document = $document;
            this.photosShowing = false;
        }
        ProductController.prototype.showPhotos = function () {
            var _this = this;
            $('body').css('overflow', 'hidden');
            this.activePhoto = this.product.id + '.jpg';
            this.photosShowing = true;
            this.keyEvent = this.$document.on('keyup', function (event) {
                var code = event.keyCode;
                if (code == 37)
                    _this.prevPhoto();
                if (code == 39)
                    _this.nextPhoto();
                if (code == 27)
                    _this.closeSlider(null);
                _this.$scope.$apply();
            });
        };
        ProductController.prototype.buy = function () {
            var _this = this;
            if (+this.product.solution == 0) {
                this.$cart.buy(this.product.id, this.product.name, this.product.price.toString(), +this.product.weight);
            }
            else {
                this.product.solution_products.forEach(function (p) {
                    _this.$cart.addToCart(p.product_id, '', 0, p.amount, 0);
                });
                alertify.confirm('VictoryComputers', 'Комплектующие добавлены в корзину, перейти к оформлению заказа?', function () {
                    _this.$state.go('products.cart');
                }, function () { });
            }
        };
        ProductController.prototype.getAmountAsterix = function () {
            if (this.product == undefined)
                return "";
            var productAmount;
            if (+this.product.status == 5)
                productAmount = "| * |";
            else if (+this.product.amount <= 0)
                productAmount = "";
            else if (+this.product.amount > 0 && (+this.product.amount <= 5))
                productAmount = "| * |";
            else if (+this.product.amount > 5 && (+this.product.amount <= 15))
                productAmount = "| ** |";
            else if (+this.product.amount > 15)
                productAmount = "| *** |";
            else
                productAmount = "| Что-то не так |";
            return productAmount;
        };
        ProductController.prototype.getStatus = function () {
            if (this.product == undefined)
                return { css: 'del', text: 'Проверяем наличие ...' };
            return this.repo.getStatus(this.product);
        };
        ProductController.prototype.foundCheaper = function () {
            alertify.alert('Нашли дешевле?', 'Вся продукция Victory Computers<br>В наличии, с учётом НДС, по актуальной цене<br><br>Если Вы нашли товар на тех же условиях дешевле чем в нашем магазине.<br>Мы сделаем спец предложение Вам и обязательно уценим данный товар для остальных клиентов.<br><br>Мы стараемся мониторить цены и давать лучшие предложения на всю продукцию. Пожалуйста дайте нам знать, если нашли дешевле.<br><br><br><b>Тел.: 380-77-89<br><b>E-mail:</b> <a href="mailto:sales@victory.kz">sales@victory.kz</a>', function () { });
        };
        ProductController.prototype.getWarranty = function () {
            if (this.product == undefined)
                return "";
            var productWarranty = 'Гарантия: ' + this.product.warranty + ' ' + this.product.warranty_period;
            if (this.product.warranty == 0)
                productWarranty = "";
            else if (this.product.warranty == 2 && this.product.warranty_period == "Месяц")
                productWarranty = "Гарантия: 2 Месяца";
            else if (this.product.warranty == 2 && this.product.warranty_period == "Год")
                productWarranty = "Гарантия: 2 Года";
            else if (this.product.warranty == 3 && this.product.warranty_period == "Месяц")
                productWarranty = "Гарантия: 3 Месяца";
            else if (this.product.warranty == 3 && this.product.warranty_period == "Год")
                productWarranty = "Гарантия: 3 Года";
            else if (this.product.warranty == 4 && this.product.warranty_period == "Месяц")
                productWarranty = "Гарантия: 4 Месяца";
            else if (this.product.warranty == 4 && this.product.warranty_period == "Год")
                productWarranty = "Гарантия: 4 Года";
            else if (this.product.warranty == 5 && this.product.warranty_period == "Месяц")
                productWarranty = "Гарантия: 5 Месяцев";
            else if (this.product.warranty == 5 && this.product.warranty_period == "Год")
                productWarranty = "Гарантия: 5 Лет";
            else if (this.product.warranty == 6 && this.product.warranty_period == "Месяц")
                productWarranty = "Гарантия: 6 Месяцев";
            else if (this.product.warranty == 6 && this.product.warranty_period == "Год")
                productWarranty = "Гарантия: 6 Лет";
            else if (this.product.warranty == 7 && this.product.warranty_period == "Месяц")
                productWarranty = "Гарантия: 7 Месяцев";
            else if (this.product.warranty == 7 && this.product.warranty_period == "Год")
                productWarranty = "Гарантия: 7 Лет";
            else if (this.product.warranty == 10 && this.product.warranty_period == "Год")
                productWarranty = "Гарантия: 10 Лет";
            else if (this.product.warranty == 11 && this.product.warranty_period == "Год")
                productWarranty = "Гарантия: 11 Лет";
            else if (this.product.warranty == 1 && this.product.warranty_period == "xxx")
                productWarranty = '1 Год +';
            else
                productWarranty = 'Гарантия: ' + this.product.warranty + ' ' + this.product.warranty_period;
            return productWarranty;
        };
        ProductController.prototype.toTrusted = function (str) {
            return this.$sce.trustAsHtml(str);
        };
        ProductController.prototype.getBreadcrumb = function () {
            if (this.product == undefined)
                return [];
            return this.breadcrumb;
        };
        ProductController.prototype.closeSlider = function ($event) {
            if ($event == null || $event.target.classList.contains('main') || $event.target.classList.contains('fa-times')) {
                this.photosShowing = false;
                $('body').css('overflow', '');
                this.$document.off('keyup', this.keyEvent);
            }
        };
        ProductController.prototype.nextPhoto = function () {
            if (this.activePhoto == this.product.id + '.jpg') {
                if (this.product.photos.length) {
                    this.activePhoto = this.product.photos[0].photo + '.jpg';
                }
            }
            else {
                var index = -1;
                for (var i = 0; i < this.product.photos.length; i++) {
                    if (this.activePhoto == this.product.photos[i].photo + '.jpg')
                        index = i;
                }
                if (index == this.product.photos.length - 1) {
                    this.activePhoto = this.product.id + '.jpg';
                }
                else {
                    this.activePhoto = this.product.photos[index + 1].photo + '.jpg';
                }
            }
        };
        ProductController.prototype.prevPhoto = function () {
            if (this.activePhoto == this.product.id + '.jpg') {
                if (this.product.photos.length) {
                    this.activePhoto = this.product.photos[this.product.photos.length - 1].photo + '.jpg';
                }
            }
            else {
                var index = -1;
                for (var i = 0; i < this.product.photos.length; i++) {
                    if (this.activePhoto == this.product.photos[i].photo + '.jpg')
                        index = i;
                }
                if (index == 0) {
                    this.activePhoto = this.product.id + '.jpg';
                }
                else {
                    this.activePhoto = this.product.photos[index - 1].photo + '.jpg';
                }
            }
        };
        ProductController.prototype.$onInit = function () {
            var _this = this;
            var promise = this.repo.getProduct(this.$stateParams.id);
            promise.then(function (response) {
                if (response.data.status == "ok") {
                    _this.product = response.data.data.product;
                    _this.breadcrumb = response.data.data.path;
                    _this.ceoService.setTitle(_this.product.name);
                    var description = 'Victory продает по Алматы, Астана, Казахстан, купить ' + _this.product.price_name + '  в наличии купить Алматы доставка по Казахстану оптом цена';
                    _this.ceoService.setDescription(description);
                    var keywords_1 = [];
                    _this.product.price_name.split(' ').forEach(function (str) {
                        var tmp = str.split('/');
                        keywords_1.push(tmp.join(','));
                    });
                    var page_keywords = 'купить,Алматы,Казахстан,дешего,цена,Victory,Computers,в наличии, продает,' + keywords_1.join(',');
                    _this.ceoService.setKeywords(page_keywords);
                }
            });
        };
        return ProductController;
    }());
    ProductController.$inject = ['$scope', '$state', repository_service_1.NAME, '$stateParams', cart_service_1.NAME, '$sce', '$element', ceo_service_1.NAME, '$document'];
    exports.default = ProductController;
});
//# sourceMappingURL=product.controller.js.map