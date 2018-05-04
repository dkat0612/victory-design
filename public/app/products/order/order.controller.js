define(["require", "exports", "./../../cart/cart.service", "./../../cart/cart.service", "./../../common/ceo.service", "./../../common/exline.service", "./../repository.service", "./models"], function (require, exports, cart_service_1, cart_service_2, ceo_service_1, exline_service_1, repository_service_1, models_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PaymentType;
    (function (PaymentType) {
        PaymentType[PaymentType["CashOffice"] = 0] = "CashOffice";
        PaymentType[PaymentType["Bank"] = 1] = "Bank";
        PaymentType[PaymentType["VisaOffice"] = 2] = "VisaOffice";
        PaymentType[PaymentType["VisaOnline"] = 3] = "VisaOnline";
        PaymentType[PaymentType["Courier"] = 4] = "Courier";
        PaymentType[PaymentType["NotChoosen"] = -1] = "NotChoosen";
    })(PaymentType = exports.PaymentType || (exports.PaymentType = {}));
    var OrderController = (function () {
        function OrderController($state, repo, $cart, $scope, ceoService, exlineService, $cookies) {
            this.$state = $state;
            this.repo = repo;
            this.$cart = $cart;
            this.$scope = $scope;
            this.ceoService = ceoService;
            this.exlineService = exlineService;
            this.$cookies = $cookies;
            this.db = {
                persons: models_1.PERSONS,
                deliveries: models_1.DELIVERIES,
                payments: models_1.PAYMENTS,
                relations: models_1.PAYMENTS_BY_DATA
            };
            this._selectedPerson = this.db.persons[1];
            this.products = [];
            this.model = {
                email: '',
                name: '',
                phone: '',
                adress: '',
                deliveryType: '',
                town: '',
                cart: [],
                exlineIncluded: true,
                exlineInsurance: 15000,
                exlinePrice: 0,
                exlineType: '',
                iin: '',
                delivery: null,
                person: null,
                payment: null,
                reqisits: ''
            };
            this.paymentType = PaymentType.NotChoosen;
            this.weight = 0.5;
            this.price = 0;
            this.selectingTown = false;
            this.destinationTown = '';
            this.destinationRegions = [];
            this.selectedTown = null;
            this.errors = {};
            this.bought = false;
            this.buying = false;
            this.getPriceResponse = null;
            this.deliveries = null;
            this.gettingPrices = false;
            this.insured = false;
            this.focusTownInput = false;
        }
        Object.defineProperty(OrderController.prototype, "selectedDelivery", {
            get: function () {
                return this._selectedDelivery;
            },
            set: function (delivery) {
                if (this.buying)
                    return;
                this._selectedDelivery = delivery;
                this._selectedPayment = null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OrderController.prototype, "selectedPayment", {
            get: function () {
                return this._selectedPayment;
            },
            set: function (person) {
                if (this.buying)
                    return;
                this._selectedPayment = person;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OrderController.prototype, "selectedPerson", {
            get: function () {
                return this._selectedPerson;
            },
            set: function (person) {
                if (this.buying)
                    return;
                this._selectedPerson = person;
                this._selectedPayment = null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OrderController.prototype, "iinCheck", {
            // valid_nn($nn) {
            //     let $s = 0;
            //     for (let $i = 0; $i < 11; $i++) {
            //         $s = $s + ($i + 1) * $nn[$i];
            //     }
            //     let $k = $s % 11;
            //     if ($k == 10) {
            //         $s = 0;
            //         for (let $i = 0; $i < 11; $i++) {
            //             let $t = ($i + 3) % 11;
            //             if ($t == 0) {
            //                 $t = 11;
            //             }
            //             $s = $s + $t * $nn[$i];
            //         }
            //         $k = $s % 11;
            //         if ($k == 10)
            //             return false;
            //         return ($k == substr($nn, 11, 1));
            //     }
            //     return ($k == substr($nn, 11, 1));
            // }
            get: function () {
                if (isNaN(this.model.iin)) {
                    return false;
                }
                var iin = this.model.iin.toString().split('').map(function (c) { return new Number(c).valueOf() * 1; });
                var s = 0;
                for (var i = 0; i < 11; i++) {
                    s += iin[i] * (i + 1);
                }
                var k = s % 11;
                if (k == 10) {
                    s = 0;
                    for (var i = 0; i < 11; i++) {
                        var weight = (i + 3) % 11;
                        if (weight == 0) {
                            weight = 11;
                        }
                        s += iin[i] * weight;
                    }
                    k = s % 11;
                    if (k == 10) {
                        return false;
                    }
                }
                return iin[11] == k;
                ;
            },
            enumerable: true,
            configurable: true
        });
        OrderController.prototype.checkFirst = function () {
            if (!this.selectedPerson || !this.selectedDelivery)
                return false;
            if (this.selectedTown.id != models_1.ALMATY_CODE && (this.selectedDelivery.id != 3 || !this.model.exlineType))
                return false;
            return true;
        };
        OrderController.prototype.checkThird = function () {
            if (this.selectedPerson.id == 1) {
                if (!this.model.reqisits || this.model.reqisits.length == 0)
                    return false;
                if (!this.model.reqisits_1 || this.model.reqisits_1.length == 0)
                    return false;
                if (!this.model.reqisits_2 || this.model.reqisits_2.length == 0)
                    return false;
                if (!this.model.reqisits_3 || this.model.reqisits_3.length == 0)
                    return false;
            }
            if (!this.model.name || this.model.name.length == 0)
                return false;
            if (!this.model.phone || this.model.phone.length == 0)
                return false;
            if (this.selectedDelivery.id == 2 || this.selectedDelivery.id == 3) {
                if (!this.model.adress || this.model.adress.length == 0)
                    return false;
            }
            return true;
        };
        OrderController.prototype.isPaymentVisible = function (payment) {
            if (!payment)
                return false;
            if (!this.selectedDelivery || !this.selectedPerson)
                return false;
            var personRelations = this.db.relations[this.selectedPerson.id];
            if (!personRelations)
                return false;
            var relations = personRelations[this.selectedDelivery.id];
            if (!relations)
                return false;
            var relation = relations.some(function (id) { return id == payment.id; });
            return relation;
        };
        OrderController.prototype.getTotalPrice = function () {
            var price = this.price;
            if (this.selectedDelivery && this.selectedDelivery.id == 3) {
                price += this.model.exlinePrice;
            }
            if (this.selectedPayment) {
                price += price * this.selectedPayment.commission;
            }
            return price;
        };
        OrderController.prototype.checkPayment = function () {
            if (!this.selectedDelivery || !this.selectedPerson || !this.selectedPayment)
                return false;
            if (!this.checkFirst())
                return false;
            if (!this.checkSecond())
                return false;
            if (this.selectedPerson.id == 2 && this.selectedDelivery.id != 3) {
                if (!this.checkThird())
                    return false;
            }
            return true;
        };
        OrderController.prototype.checkSecond = function () {
            var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!this.model.email || this.model.email.length == 0 || !emailRegex.test(this.model.email)) {
                return false;
            }
            if (this.selectedPerson.id == 2 && this.selectedDelivery.id != 3) {
                if (!this.model.name || this.model.name.length == 0) {
                    return false;
                }
                if (!this.model.phone || this.model.phone.length == 0) {
                    return false;
                }
                if (this.selectedDelivery.id == 2 && (!this.model.adress || this.model.adress.length == 0)) {
                    return false;
                }
            }
            else {
                if (!this.model.iin || this.model.iin.length == 0 || !this.iinCheck) {
                    this.errors.iin = true;
                    return false;
                }
            }
            return true;
        };
        OrderController.prototype.getThirdPrevTab = function () {
            if (!this.selectedPerson || !this.selectedDelivery)
                return 'first';
            if (this.selectedPerson.id == 2 && this.selectedDelivery.id != 3) {
                return 'second';
            }
            else {
                return 'third';
            }
        };
        OrderController.prototype.getThirdTab = function () {
            if (!this.selectedPerson || !this.selectedDelivery)
                return 'third';
            if (this.selectedPerson.id == 2 && this.selectedDelivery.id != 3) {
                return 'payment';
            }
            else {
                return 'third';
            }
        };
        OrderController.prototype.checkOrder = function () {
            if (this.paymentType == PaymentType.NotChoosen) {
                alertify.error('Выберите способ оплаты', 3);
                return false;
            }
            return this.checkAdress() && this.checkCustomer();
        };
        OrderController.prototype.checkCustomer = function () {
            var hasError = false;
            if (!this.model.name || this.model.name.length == 0) {
                hasError = true;
                this.errors.name = true;
            }
            if (!this.model.phone || this.model.phone.length == 0) {
                hasError = true;
                this.errors.phone = true;
            }
            var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!this.model.email || this.model.email.length == 0 || !emailRegex.test(this.model.email)) {
                hasError = true;
                this.errors.email = true;
            }
            return !hasError;
        };
        OrderController.prototype.checkAdress = function () {
            var hasError = false;
            if (this.selectedTown == null || this.selectedTown.id == null) {
                hasError = true;
                this.errors.town = true;
            }
            if (this.model.deliveryType == 'exline' || this.model.deliveryType == 'adress') {
                if (!this.model.adress || this.model.adress.length == 0) {
                    hasError = true;
                    this.errors.adress = true;
                }
            }
            if (this.model.deliveryType == 'exline') {
                if (!this.model.iin || this.model.iin.length == 0) {
                    hasError = true;
                    this.errors.iin = true;
                }
                if (!this.model.exlineType || (this.model.exlineType != 'standard' && this.model.exlineType != 'express')) {
                    if (!hasError) {
                        alertify.error('Выберите тип доставки', 3000);
                    }
                    hasError = true;
                }
            }
            return !hasError;
        };
        OrderController.prototype.chooseDelivery = function (type) {
            this.model.deliveryType = type;
            this.paymentType = PaymentType.NotChoosen;
        };
        OrderController.prototype.pageTwoOpened = function () {
            if (!this.selectedTown) {
                this.selectTown();
            }
        };
        OrderController.prototype.$onInit = function () {
            var _this = this;
            window.scrollTo(0, 0);
            this.ceoService.setTitle('Корзина');
            this.cart = this.$cart.getCart();
            if (this.cart.length == 0) {
                this.$state.go('products');
                return;
            }
            this.weight = 0.5;
            this.package_weight = 0.5;
            this.price = 0;
            this.cart.forEach(function (c, i) {
                _this.repo.getProduct(c.id).then(function (r) {
                    if (r.data.status == 'ok') {
                        _this.products[i] = r.data.data.product;
                        _this.$cart.updateProduct(r.data.data.product.id, r.data.data.product.name, r.data.data.product.price, +r.data.data.product.weight);
                        _this.weight += (+r.data.data.product.weight) * _this.cart[i].amount;
                        _this.package_weight += (+r.data.data.product.package_weight) * _this.cart[i].amount;
                        _this.price += (+r.data.data.product.price) * _this.cart[i].amount;
                    }
                });
            });
        };
        OrderController.prototype.getParsedCart = function () {
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
        OrderController.prototype.finished = function () {
            var _this = this;
            this.model.cart = this.getParsedCart();
            this.model.deliveryType = this.selectedDelivery.type;
            this.model.person = this.selectedPerson.id;
            this.model.delivery = this.selectedDelivery.id;
            this.model.payment = this.selectedPayment.id;
            var promise = this.$cart.saveOrder(this.model);
            this.bought = true;
            this.buying = true;
            promise.then(function (r) {
                _this.model.id = r.id;
                _this.cart = [];
                _this.products = [];
                _this.$cookies.put('email', _this.model.email);
                _this.$cookies.put('order', _this.model.id.toString());
                _this.$cart.clearCart(true);
                if (_this.selectedPayment.online) {
                    _this.$state.go('payments', {
                        order: _this.model.id
                    });
                }
            }, function () {
                _this.bought = false;
                alertify.notify('Произошла ошибка попробуйте обновить страницу', 'error', 3000);
            });
            promise.finally(function () {
                _this.buying = false;
            });
        };
        OrderController.prototype.closeSelection = function () {
            this.selectingTown = false;
            this.destinationTown = '';
        };
        OrderController.prototype.getVictoryComission = function () {
            if (this.model.exlineIncluded)
                return 150;
            else
                return 0;
        };
        OrderController.prototype.getInsurance = function () {
            if (!this.insured) {
                return 120;
            }
            else {
                var price = Math.round(this.price * 0.008);
                if (price < 120)
                    return 120;
                return price;
            }
        };
        OrderController.prototype.selectExline = function (type) {
            if (type != 'standard' && type != 'express')
                return;
            this.model.exlineType = type;
            this.model.exlinePrice = this.deliveries[type].price + this.deliveries[type].fuel_surplus;
            this.model.exlinePrice += this.getVictoryComission();
            this.model.exlinePrice += this.getInsurance();
        };
        OrderController.prototype.toggleInsurance = function () {
            this.insured = !this.insured;
            this.model.exlineInsurance = (this.insured) ? this.price : 15000;
            this.selectExline(this.model.exlineType);
        };
        OrderController.prototype.toggleVictoryCommision = function () {
            this.model.exlineIncluded = !this.model.exlineIncluded;
            this.selectExline(this.model.exlineType);
        };
        OrderController.prototype.getPrice = function () {
            var _this = this;
            if (this.getPriceResponse) {
                this.getPriceResponse.cancel();
            }
            this.gettingPrices = true;
            this.getPriceResponse = this.exlineService.getPrice({
                origin_id: models_1.ALMATY_CODE,
                destination_id: this.selectedTown.id,
                weight: this.weight,
                package_weight: this.package_weight
            });
            this.getPriceResponse.promise.then(function (r) {
                if (r.data.calculations.express) {
                    r.data.calculations.express.price = Math.round(r.data.calculations.express.price);
                }
                if (r.data.calculations.standard) {
                    r.data.calculations.standard.price = Math.round(r.data.calculations.standard.price);
                }
                _this.deliveries = r.data.calculations;
            }).finally(function () {
                _this.getPriceResponse = null;
                _this.gettingPrices = false;
            });
        };
        OrderController.prototype.selectTown = function (town) {
            if (town) {
                this.selectedTown = town;
                this.selectingTown = false;
                this.destinationTown = '';
                this.destinationRegions = [];
                this.model.town = this.selectedTown.title + ', ' + this.selectedTown.cached_path;
                this.errors.town = false;
                if (town.id != models_1.ALMATY_CODE) {
                    this.selectedDelivery = _(this.db.deliveries).find(function (delivery) { return delivery.id == 3; });
                    this.getPrice();
                }
                else {
                    this.selectedDelivery = _(this.db.deliveries).find(function (delivery) { return delivery.id == 1; });
                }
            }
            else {
                this.focusTownInput = true;
                this.selectingTown = true;
                this.destinationRegions = [];
                this.destinationTown = '';
            }
        };
        OrderController.prototype.getDestinationTown = function () {
            var _this = this;
            if (this.destinationResult) {
                this.destinationResult.cancel();
            }
            if (this.destinationTown.length == 0) {
                this.destinationRegions = [];
                return;
            }
            this.destinationResult = this.exlineService.getDestinationPlace(this.destinationTown);
            this.destinationResult.promise.then(function (r) {
                _this.destinationRegions = r.data.regions;
            }).finally(function () {
                if (_this.destinationResult) {
                    _this.destinationResult = null;
                }
            });
        };
        return OrderController;
    }());
    exports.OrderController = OrderController;
    OrderController.$inject = ['$state', repository_service_1.NAME, cart_service_2.NAME, '$scope', ceo_service_1.NAME, exline_service_1.NAME, '$cookies'];
    exports.default = OrderController;
    var PaymentTypes = (function () {
        function PaymentTypes(text, config) {
            this.text = text;
            this.config = {
                commission: 0,
                customerTypes: [cart_service_1.CustomerTypes.FIZ, cart_service_1.CustomerTypes.UR],
                delivery: true,
                self: true,
                onlyAlmaty: false,
                withNDS: false
            };
            _(this.config).extendWith(config).commit();
        }
        return PaymentTypes;
    }());
});
//# sourceMappingURL=order.controller.js.map