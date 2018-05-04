define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ProductStatus;
    (function (ProductStatus) {
        ProductStatus[ProductStatus["NewProduct"] = 0] = "NewProduct";
        ProductStatus[ProductStatus["VisibleOnSite"] = 1] = "VisibleOnSite";
        ProductStatus[ProductStatus["DeletedFromSite"] = 2] = "DeletedFromSite";
        ProductStatus[ProductStatus["WaitingToDelete"] = 3] = "WaitingToDelete";
    })(ProductStatus = exports.ProductStatus || (exports.ProductStatus = {}));
    var ProductPlaces;
    (function (ProductPlaces) {
        ProductPlaces[ProductPlaces["OrdinaryProduct"] = 0] = "OrdinaryProduct";
        ProductPlaces[ProductPlaces["Kaspi"] = 1] = "Kaspi";
        ProductPlaces[ProductPlaces["RetailNoProduct"] = 2] = "RetailNoProduct";
        ProductPlaces[ProductPlaces["ForOrder"] = 3] = "ForOrder";
        ProductPlaces[ProductPlaces["SiteProduct"] = 9] = "SiteProduct";
        ProductPlaces[ProductPlaces["RetailHasProduct"] = 10] = "RetailHasProduct";
    })(ProductPlaces = exports.ProductPlaces || (exports.ProductPlaces = {}));
    var ProductType;
    (function (ProductType) {
        ProductType[ProductType["NoType"] = 0] = "NoType";
        ProductType[ProductType["PriceLower"] = 1] = "PriceLower";
        ProductType[ProductType["NewProduct"] = 2] = "NewProduct";
        ProductType[ProductType["SpecialOffer"] = 3] = "SpecialOffer";
        ProductType[ProductType["Hit"] = 4] = "Hit";
        ProductType[ProductType["Sale"] = 5] = "Sale";
        ProductType[ProductType["WithGift"] = 6] = "WithGift";
    })(ProductType = exports.ProductType || (exports.ProductType = {}));
    var ProductRepository = (function () {
        function ProductRepository($http, $serializer) {
            this.$http = $http;
            this.$serializer = $serializer;
            this.api = 'http://api.victory.kz';
        }
        ProductRepository.prototype.getCategories = function (id) {
            var model = {
                id: id
            };
            return this.$http.post(this.api + '/category/get', this.$serializer(model), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        };
        ProductRepository.prototype.getProduct = function (id) {
            var model = {
                id: id
            };
            return this.$http.post(this.api + '/products/product', this.$serializer(model), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        };
        ProductRepository.prototype.getProducts = function (model) {
            return this.$http.post(this.api + '/products/get', this.$serializer(model), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        };
        ProductRepository.prototype.makeOrder = function (model) {
            return this.$http.post(this.api + '/orders/generate', this.$serializer(model), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        };
        ProductRepository.prototype.getStatus = function (product) {
            var result = {
                css: '',
                text: '',
            };
            if (+product.amount <= 0) {
                if (+product.place == ProductPlaces.RetailNoProduct) {
                    result.css = 'exist';
                    result.text = 'На складе +1 день';
                }
                else if (+product.status == ProductStatus.DeletedFromSite) {
                    result.css = 'del';
                    result.text = 'Удален';
                }
                else if (+product.status == ProductStatus.WaitingToDelete) {
                    result.css = 'del';
                    result.text = 'Удален';
                }
                else if (+product.place == ProductPlaces.ForOrder) {
                    result.css = 'del';
                    result.text = 'На заказ';
                }
                else {
                    result.css = 'del';
                    result.text = 'Резерв';
                }
            }
            else {
                result.css = 'exist';
                result.text = 'В наличии';
            }
            return result;
        };
        ProductRepository.prototype.getCartStatus = function (product) {
            if (!product)
                return { css: 'del', text: 'Проверяем наличие ...' };
            var AmountStatus = '';
            var AmountStyle = '';
            if (+product.status == ProductStatus.DeletedFromSite) {
                AmountStatus = "Товар удалён";
                AmountStyle = "del";
            }
            else if (+product.place == ProductPlaces.RetailNoProduct) {
                AmountStatus = "Товар на уд. складе, 100% оплата, +1 день к доставке";
                AmountStyle = "exist";
            }
            else if (+product.amount > 10) {
                AmountStatus = "В наличии много";
                AmountStyle = "exist";
            }
            else if (+product.amount > 0) {
                AmountStatus = "В наличии";
                AmountStyle = "exist";
            }
            else {
                AmountStatus = "Данный товар полностью зарезервирован под клиентов, пожалуйста, ожидайте наличия, снятия резерва, поступления или замените его на другой. Мы не выставим Вам счёь на этот заказ.";
                AmountStyle = "del";
            }
            return {
                css: AmountStyle,
                text: AmountStatus
            };
        };
        return ProductRepository;
    }());
    ProductRepository.$inject = ['$http', '$httpParamSerializerJQLike'];
    exports.NAME = 'vcProductRepository';
    exports.default = ProductRepository;
});
//# sourceMappingURL=repository.service.js.map
