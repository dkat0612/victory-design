define(["require", "exports", "./../common/listenerService/listener.service"], function (require, exports, listener_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CustomerTypes;
    (function (CustomerTypes) {
        CustomerTypes[CustomerTypes["FIZ"] = 1] = "FIZ";
        CustomerTypes[CustomerTypes["UR"] = 0] = "UR";
    })(CustomerTypes = exports.CustomerTypes || (exports.CustomerTypes = {}));
    var CartService = (function () {
        function CartService($cookies, $rootScope, $listener, $state, $resource, $http) {
            this.$cookies = $cookies;
            this.$rootScope = $rootScope;
            this.$listener = $listener;
            this.$state = $state;
            this.$http = $http;
            this.cart = [];
            this.cart = [];
            this.cart = this.$cookies.getObject('cart');
            if (this.cart == undefined || this.cart == null)
                this.cart = [];
            this.orderRepo = $resource('http://api.victory.kz/orders/:id', {}, {}, {
                cancellable: true
            });
        }
        CartService.prototype.saveOrder = function (order) {
            if (order.person != 1) {
                order.reqisits = '';
                order.reqisits_1 = '';
                order.reqisits_2 = '';
                order.reqisits_3 = '';
            }
            //if ([4, 5, 7].indexOf(order.payment) >= 0) {
            //    let price = 0;
            //    order.cart.forEach(cartProduct => {
            //        price += cartProduct.product.price * cartProduct.amount;
            //    });
            //    price = price * 0.04;
            //    order.cart.push({
            //        amount: 1,
            //        product: {
            //            id: '24206',
            //            name: 'Коммиссия банка',
            //            price: price
            //        }
            //    });
            //}
            var newOrder = new this.orderRepo(order);
            return newOrder.$save();
        };
        CartService.prototype.saveCart = function (cart) {
            this.$cookies.putObject('cart', cart);
        };
        CartService.prototype.addToCart = function (id, name, price, amount, weight) {
            var product = {
                amount: amount,
                id: id,
                name: name,
                price: price,
                weight: weight
            };
            var index = -1;
            this.cart.forEach(function (c, i) {
                if (c.id == id)
                    index = i;
            });
            if (index == -1) {
                this.cart.push(product);
            }
            else {
                this.cart[index] = product;
            }
            this.$cookies.putObject('cart', this.cart);
        };
        CartService.prototype.clearCart = function (force) {
            var _this = this;
            if (force) {
                this.cart = [];
                this.$cookies.remove('cart');
                this.$listener.emitCartCleared();
            }
            else {
                alertify.confirm("Victory Computers", "Вы действительно хотите очистить корзину?", function () {
                    _this.cart = [];
                    _this.$cookies.remove('cart');
                    _this.$listener.emitCartCleared();
                    _this.$state.go('products');
                    _this.$rootScope.$apply();
                }, function () { });
            }
        };
        CartService.prototype.removeFromCart = function (id) {
            this.cart = this.getCart();
            _(this.cart).remove(function (p) { return p.id == id; }).commit();
            this.$cookies.putObject('cart', this.cart);
            return this.cart;
        };
        CartService.prototype.updateProduct = function (id, name, price, weight, amount) {
            var cart = this.getCart();
            cart.forEach(function (c) {
                if (c.id == id) {
                    c.id = id;
                    c.name = name;
                    c.price = price;
                    c.weight = weight;
                    if (amount) {
                        c.amount = amount;
                    }
                }
            });
            this.$cookies.putObject('cart', cart);
        };
        CartService.prototype.getCart = function () {
            this.cart = this.$cookies.getObject('cart');
            if (this.cart == undefined)
                this.cart = [];
            return this.cart;
        };
        CartService.prototype.buy = function (id, name, price, weight) {
            var _this = this;
            alertify.prompt('Victory Computers', 'Введите кол-во необходимого товара', '1', function (evt, amount) {
                if (isNaN(amount))
                    return;
                _this.addToCart(id, name, price, amount, weight);
                _this.$rootScope.$apply();
            }, function () { });
        };
        return CartService;
    }());
    CartService.$inject = ['$cookies', '$rootScope', listener_service_1.NAME, '$state', '$resource', '$http'];
    exports.NAME = 'vcCartService';
    exports.default = CartService;
});
//# sourceMappingURL=cart.service.js.map