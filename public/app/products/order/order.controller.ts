import { NAME as CartService_NAME, default as CartService, CustomerTypes } from './../../cart/cart.service';
import { NAME as Cart_NAME, default as Cart, ICart, ICartProduct, IOrderModel, IProductCart } from './../../cart/cart.service';
import { CEOService, NAME as CEOSErvice_NAME } from './../../common/ceo.service';
import { ExlineService, NAME as ExlineService_NAME, IGetPlaceResult, IRegion, IGetPriceRequest, IGetPriceResponse, ICalculations } from './../../common/exline.service';
import { HttpServicePromise } from './../../common/http.service';
import { ICategory, IProductResult, NAME as Repository_NAME, default as Repository, IProduct, IProductResultData } from './../repository.service';
import { WizardController } from './../../common/wizard/wizard.controller';
import { DELIVERIES, PAYMENTS, PERSONS, Delivery, Payment, ALMATY_CODE, Person, PAYMENTS_BY_DATA } from './models';

export enum PaymentType {
    CashOffice = 0,
    Bank = 1,
    VisaOffice = 2,
    VisaOnline = 3,
    Courier = 4,
    NotChoosen = -1
}

export class OrderController {
    constructor(
        private $state: ng.ui.IStateService,
        private repo: Repository,
        private $cart: CartService,
        private $scope: ng.IScope,
        private ceoService: CEOService,
        private exlineService: ExlineService,
        private $cookies: ng.cookies.ICookiesService
    ) {
    }

    private db = {
        persons: PERSONS,
        deliveries: DELIVERIES,
        payments: PAYMENTS,
        relations: PAYMENTS_BY_DATA
    }
    private _selectedDelivery: Delivery;
    get selectedDelivery(): Delivery {
        return this._selectedDelivery
    }
    set selectedDelivery(delivery: Delivery) {
        if (this.buying) return;
        this._selectedDelivery = delivery;
        this._selectedPayment = null;
    }

    private _selectedPayment: Payment;
    get selectedPayment(): Payment {
        return this._selectedPayment;
    }
    set selectedPayment(person: Payment) {
        if (this.buying) return;
        this._selectedPayment = person;
    }
    private _selectedPerson: Person = this.db.persons[1];
    get selectedPerson(): Person {
        return this._selectedPerson
    }
    set selectedPerson(person: Person) {
        if (this.buying) return;
        this._selectedPerson = person;
        this._selectedPayment = null;
    }

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

    get iinCheck() {
        if (isNaN(this.model.iin as any)) {
            return false;
        }

        const iin = this.model.iin.toString().split('').map(c => new Number(c).valueOf() * 1);

        let s = 0;
        for (let i = 0; i < 11; i++) {
            s += iin[i] * (i + 1);
        }
        let k = s % 11;
        if (k == 10) {
            s = 0;
            for (let i = 0; i < 11; i ++) {
                let weight = (i + 3) % 11;
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
        return iin[11] == k;;
    }

    public wizard: WizardController;

    public cart: ICart[];
    public products: IProduct[] = [];

    public model: IOrderModel = {
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
    }

    public paymentType: PaymentType = PaymentType.NotChoosen;

    public weight: number = 0.5;
    public price: number = 0;

    public selectingTown: boolean = false;
    public destinationTown: string = '';
    public destinationResult: Core.IHttpServicePromise<IGetPlaceResult>;
    public destinationRegions: IRegion[] = [];
    public selectedTown: IRegion = null;
    public errors: {
        name?: boolean,
        phone?: boolean,
        town?: boolean,
        adress?: boolean,
        iin?: boolean,
        email?: boolean
    } = {}

    public checkFirst() {
        if (!this.selectedPerson || !this.selectedDelivery) return false;
        if (this.selectedTown.id != ALMATY_CODE && (this.selectedDelivery.id != 3 || !this.model.exlineType)) return false;
        return true;
    }

    public checkThird() {
        if (this.selectedPerson.id == 1) {
            if (!this.model.reqisits || this.model.reqisits.length == 0) return false;
            if (!this.model.reqisits_1 || this.model.reqisits_1.length == 0) return false;
            if (!this.model.reqisits_2 || this.model.reqisits_2.length == 0) return false;
            if (!this.model.reqisits_3 || this.model.reqisits_3.length == 0) return false;
        }
        if (!this.model.name || this.model.name.length == 0) return false;
        if (!this.model.phone || this.model.phone.length == 0) return false;
        if (this.selectedDelivery.id == 2 || this.selectedDelivery.id == 3) {
            if (!this.model.adress || this.model.adress.length == 0) return false;
        }
        return true;
    }

    public isPaymentVisible(payment: Payment) {
        if (!payment) return false;

        if (!this.selectedDelivery || !this.selectedPerson) return false;
        const personRelations = this.db.relations[this.selectedPerson.id];
        if (!personRelations) return false;
        const relations = personRelations[this.selectedDelivery.id] as Array<number>;
        if (!relations) return false;
        const relation = relations.some(id => id == payment.id);
        return relation;
    }

    public getTotalPrice() {
        let price = this.price;
        if (this.selectedDelivery && this.selectedDelivery.id == 3) {
            price += this.model.exlinePrice;
        }
        if (this.selectedPayment) {
            price += price * this.selectedPayment.commission;
        }
        return price;


    }

    public checkPayment() {
        if (!this.selectedDelivery || !this.selectedPerson || !this.selectedPayment) return false;
        if (!this.checkFirst()) return false;
        if (!this.checkSecond()) return false;
        if (this.selectedPerson.id == 2 && this.selectedDelivery.id != 3) {
            if (!this.checkThird()) return false;
        }
        return true;
    }

    public checkSecond() {
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
        } else {
            if (!this.model.iin || this.model.iin.length == 0 || !this.iinCheck) {
                this.errors.iin = true;
                return false;
            }
        }
        return true;
    }

    public getThirdPrevTab() {
        if (!this.selectedPerson || !this.selectedDelivery) return 'first';
        if (this.selectedPerson.id == 2 && this.selectedDelivery.id != 3) {
            return 'second';
        } else {
            return 'third'
        }
    }

    public getThirdTab() {
        if (!this.selectedPerson || !this.selectedDelivery) return 'third';
        if (this.selectedPerson.id == 2 && this.selectedDelivery.id != 3) {
            return 'payment';
        } else {
            return 'third'
        }
    }

    public checkOrder() {
        if (this.paymentType == PaymentType.NotChoosen) {
            alertify.error('Выберите способ оплаты', 3);
            return false;
        }
        return this.checkAdress() && this.checkCustomer();
    }

    public checkCustomer() {
        let hasError = false;
        if (!this.model.name || this.model.name.length == 0) {
            hasError = true;
            this.errors.name = true;
        }
        if (!this.model.phone || this.model.phone.length == 0) {
            hasError = true;
            this.errors.phone = true;
        }

        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!this.model.email || this.model.email.length == 0 || !emailRegex.test(this.model.email)) {
            hasError = true;
            this.errors.email = true;
        }

        return !hasError;
    }

    public checkAdress() {
        let hasError = false;

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
    }

    public chooseDelivery(type: string) {
        this.model.deliveryType = type;
        this.paymentType = PaymentType.NotChoosen;
    }

    public pageTwoOpened() {
        if (!this.selectedTown) {
            this.selectTown();
        }
    }

    public $onInit() {
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
        this.cart.forEach((c, i) => {
            this.repo.getProduct(c.id).then(r => {
                if (r.data.status == 'ok') {
                    this.products[i] = r.data.data.product;
                    this.$cart.updateProduct(r.data.data.product.id, r.data.data.product.name, r.data.data.product.price, +r.data.data.product.weight);
                    this.weight += (+r.data.data.product.weight) * this.cart[i].amount;
                    this.package_weight += (+r.data.data.product.package_weight) * this.cart[i].amount;
                    this.price += (+r.data.data.product.price) * this.cart[i].amount;
                }
            });
        });
    }
    private package_weight: number;

    public getParsedCart(): IProductCart[] {
        let cart = this.$cart.getCart();
        let parsedCart: IProductCart[] = [];
        cart.forEach(c => {
            parsedCart.push({
                amount: c.amount,
                product: {
                    id: c.id,
                    name: c.name,
                    price: c.price
                }
            });
        })
        return parsedCart;
    }

    public bought: boolean = false;
    public buying: boolean = false;
    public finished() {
        this.model.cart = this.getParsedCart();
        this.model.deliveryType = this.selectedDelivery.type;
        this.model.person = this.selectedPerson.id;
        this.model.delivery = this.selectedDelivery.id;
        this.model.payment = this.selectedPayment.id;
        let promise = this.$cart.saveOrder(this.model);
        this.bought = true;
        this.buying = true;
        promise.then((r: any) => {
            this.model.id = <number>r.id;
            this.cart = [];
            this.products = [];
            this.$cookies.put('email', this.model.email);
            this.$cookies.put('order', this.model.id.toString());
            this.$cart.clearCart(true);
            if (this.selectedPayment.online) {
                this.$state.go('payments', {
                    order: this.model.id
                });
            }
        }, () => {
            this.bought = false;
            alertify.notify('Произошла ошибка попробуйте обновить страницу', 'error', 3000);
        });
        promise.finally(() => {
            this.buying = false;
        });
    }

    public closeSelection() {
        this.selectingTown = false;
        this.destinationTown = '';
    }

    public getPriceResponse: Core.IHttpServicePromise<IGetPriceResponse> = null;
    public deliveries: ICalculations = null;
    public gettingPrices: boolean = false;
    public insured = false;

    public getVictoryComission() {
        if (this.model.exlineIncluded) return 150;
        else return 0;
    }

    public getInsurance() {
        if (!this.insured) {
            return 120;
        } else {
            let price = Math.round(this.price * 0.008);
            if (price < 120) return 120;
            return price;
        }
    }

    public selectExline(type: string) {
        if (type != 'standard' && type != 'express') return;
        this.model.exlineType = type;
        this.model.exlinePrice = this.deliveries[type].price + this.deliveries[type].fuel_surplus;
        this.model.exlinePrice += this.getVictoryComission();
        this.model.exlinePrice += this.getInsurance();
    }

    public toggleInsurance() {
        this.insured = !this.insured;
        this.model.exlineInsurance = (this.insured) ? this.price : 15000;
        this.selectExline(this.model.exlineType);
    }

    public toggleVictoryCommision() {
        this.model.exlineIncluded = !this.model.exlineIncluded;
        this.selectExline(this.model.exlineType);
    }

    public getPrice() {
        if (this.getPriceResponse) {
            this.getPriceResponse.cancel();
        }
        this.gettingPrices = true;
        this.getPriceResponse = this.exlineService.getPrice({
            origin_id: ALMATY_CODE,
            destination_id: this.selectedTown.id,
            weight: this.weight,
            package_weight: this.package_weight
        });
        this.getPriceResponse.promise.then(r => {
            if (r.data.calculations.express) {
                r.data.calculations.express.price = Math.round(r.data.calculations.express.price);
            }
            if (r.data.calculations.standard) {
                r.data.calculations.standard.price = Math.round(r.data.calculations.standard.price);
            }
            this.deliveries = r.data.calculations;

        }).finally(() => {
            this.getPriceResponse = null;
            this.gettingPrices = false;
        });
    }

    public focusTownInput: boolean = false;

    public selectTown(town?: IRegion) {
        if (town) {
            this.selectedTown = town;
            this.selectingTown = false;
            this.destinationTown = '';
            this.destinationRegions = [];
            this.model.town = this.selectedTown.title + ', ' + this.selectedTown.cached_path;
            this.errors.town = false;
            if (town.id != ALMATY_CODE) {
                this.selectedDelivery = _(this.db.deliveries).find((delivery: Delivery) => delivery.id == 3);
                this.getPrice();
            } else {
                this.selectedDelivery = _(this.db.deliveries).find((delivery: Delivery) => delivery.id == 1);
            }

        } else {
            this.focusTownInput = true;
            this.selectingTown = true;
            this.destinationRegions = [];
            this.destinationTown = '';
        }
    }


    public getDestinationTown() {
        if (this.destinationResult) {
            this.destinationResult.cancel();
        }
        if (this.destinationTown.length == 0) {
            this.destinationRegions = [];
            return;
        }
        this.destinationResult = this.exlineService.getDestinationPlace(this.destinationTown);
        this.destinationResult.promise.then(r => {
            this.destinationRegions = r.data.regions;
        }).finally(() => {
            if (this.destinationResult) {
                this.destinationResult = null;
            }
        });
    }

}
OrderController.$inject = ['$state', Repository_NAME, Cart_NAME, '$scope', CEOSErvice_NAME, ExlineService_NAME, '$cookies'];
export default OrderController;

interface IDeliveryConfig {
    onlyAlmaty?: boolean;
    delivery?: boolean;
    self?: boolean;
    withNDS?: boolean;
    customerTypes?: CustomerTypes[],
    commission?: number;
}

class PaymentTypes {
    private config: IDeliveryConfig = {
        commission: 0,
        customerTypes: [CustomerTypes.FIZ, CustomerTypes.UR],
        delivery: true,
        self: true,
        onlyAlmaty: false,
        withNDS: false
    };
    constructor(public text: string, config?: IDeliveryConfig) {
        _(this.config).extendWith(config).commit();
    }
}