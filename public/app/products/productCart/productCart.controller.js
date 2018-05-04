define(["require", "exports", "./../repository.service", "./../../cart/cart.service", "./../../common/listenerService/listener.service", "./../../common/ceo.service", "./../../common/exline.service"], function (require, exports, repository_service_1, cart_service_1, listener_service_1, ceo_service_1, exline_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ProductCartController = (function () {
        function ProductCartController($state, repo, $cart, listenerService, $scope, ceoService, exlineService, $timeout) {
            this.$state = $state;
            this.repo = repo;
            this.$cart = $cart;
            this.listenerService = listenerService;
            this.$scope = $scope;
            this.ceoService = ceoService;
            this.exlineService = exlineService;
            this.$timeout = $timeout;
            this.products = [];
            this.lastProductWeight = -1;
        }
        ProductCartController.prototype.moveProduct = function ($index, direction) {
            var swapIndex = (direction == 'up') ? $index - 1 : $index + 1;
            var t = this.products[$index];
            this.products[$index] = this.products[swapIndex];
            this.products[swapIndex] = t;
            var c = this.cart[$index];
            this.cart[$index] = this.cart[swapIndex];
            this.cart[swapIndex] = c;
            this.$cart.saveCart(this.cart);
        };
        ProductCartController.prototype.getStatus = function (product) {
            return this.repo.getCartStatus(product);
        };
        ProductCartController.prototype.onCartCleared = function () {
            this.products = [];
            this.cart = [];
        };
        ProductCartController.prototype.foundCheaper = function () {
            alertify.alert('Нашли дешевле?', 'Вся продукция Victory Computers<br>В наличии, с учётом НДС, по актуальной цене<br><br>Если Вы нашли товар на тех же условиях дешевле чем в нашем магазине.<br>Мы сделаем спец предложение Вам и обязательно уценим данный товар для остальных клиентов.<br><br>Мы стараемся мониторить цены и давать лучшие предложения на всю продукцию. Пожалуйста дайте нам знать, если нашли дешевле.<br><br><br><b>Тел.: 380-77-89<br><b>E-mail:</b> <a href="mailto:sales@victory.kz">sales@victory.kz</a>', function () { });
        };
        ProductCartController.prototype.addAmount = function (index, num) {
            num = +num;
            if ((+this.cart[index].amount) + num < 1)
                return;
            this.cart[index].amount = (+this.cart[index].amount) + num;
            this.amountChanged(index);
        };
        ProductCartController.prototype.amountChanged = function (index) {
            var product = this.cart[index];
            this.$cart.updateProduct(product.id, product.name, product.price, product.weight, product.amount);
        };
        ProductCartController.prototype.removeFromCart = function (product) {
            var id = product.id;
            this.cart = this.$cart.removeFromCart(id);
            _(this.products).remove(function (p) { return p.id == id; }).commit();
            if (this.products.length == 0) {
                this.$state.go('products');
            }
        };
        ProductCartController.prototype.getLink = function () {
            var link = 'http://victory.kz/products/solution?products=';
            var cart = this.$cart.getCart();
            var products = [];
            cart.forEach(function (c) {
                products.push(c.id + '-' + c.amount);
            });
            link += products.join(',');
            alertify.alert("Victory Computers", "\u0414\u0435\u043B\u0438\u0442\u0435\u0441\u044C \u0441\u0432\u043E\u0438\u043C\u0438 \u043A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u044F\u043C\u0438!<br><br><b>\u0421\u043A\u043E\u043F\u0438\u0440\u0443\u0439\u0442\u0435</b> \u0434\u0430\u043D\u043D\u0443\u044E \u0441\u0441\u044B\u043B\u043A\u0443 \u0434\u043B\u044F \u0434\u0430\u043B\u044C\u043D\u0435\u0439\u0448\u0435\u0439 \u043F\u0435\u0440\u0435\u0441\u044B\u043B\u043A\u0438:<br><br> <a href=\"" + link + "\">" + link + "</a>");
        };
        ProductCartController.prototype.getParsedCart = function () {
            var cart = this.$cart.getCart();
            var parsedCart = [];
            cart.forEach(function (c) {
                parsedCart.push({
                    amount: c.amount,
                    product: {
                        id: c.id,
                        name: c.name,
                        price: c.price
                    }
                });
            });
            return parsedCart;
        };
        ProductCartController.prototype.getTotal = function () {
            var _this = this;
            var total = 0;
            this.products.forEach(function (p, i) {
                total += (+p.price) * _this.cart[i].amount;
            });
            return total;
        };
        ProductCartController.prototype.$onInit = function () {
            var _this = this;
            this.ceoService.setTitle('Корзина');
            this.cart = this.$cart.getCart();
            if (this.cart.length == 0) {
                this.$state.go('products');
                return;
            }
            this.cart.forEach(function (c, i) {
                _this.repo.getProduct(c.id).then(function (r) {
                    if (r.data.status == 'ok') {
                        _this.products[i] = r.data.data.product;
                        _this.$cart.updateProduct(r.data.data.product.id, r.data.data.product.name, r.data.data.product.price, +r.data.data.product.weight);
                    }
                });
            });
            this.subscribe();
        };
        ProductCartController.prototype.subscribe = function () {
            this.listenerService.Subscribe([
                listener_service_1.EventTypes.CART_CLEARED
            ], this);
        };
        ProductCartController.prototype.$onDestroy = function () {
            this.listenerService.Unsubscribe([
                listener_service_1.EventTypes.CART_CLEARED
            ], this);
        };
        return ProductCartController;
    }());
    ProductCartController.$inject = ['$state', repository_service_1.NAME, cart_service_1.NAME, listener_service_1.NAME, '$scope', ceo_service_1.NAME, exline_service_1.NAME, '$timeout'];
    exports.default = ProductCartController;
});
//# sourceMappingURL=productCart.controller.js.map