import {default as ListenerService, NAME as ListenerService_NAME, EventTypes} from './../common/listenerService/listener.service';

export interface ICart {
    id: string;
    amount: number;
    price: number;
    name: string;
    weight: number;
}


export interface ICartProduct {
    id: string;
    name?: string;
    price?: number;
}

export interface IProductCart {
    amount: number;
    product: ICartProduct;
}

export interface IOrderModel {
    id?: number;
    name: string;
    email?: string;
    phone: string;
    deliveryType: string;
    exlineType?: string;
    exlinePrice?: number;
    exlineIncluded: boolean;
    exlineInsurance?: number;
    adress?: string;
    reqisits?: string;
    reqisits_1?: string;
    reqisits_2?: string;
    reqisits_3?: string;
    town: string;
    iin?: string;
    created?: number;
    status?: number;
    cart: IProductCart[];
    payment: number;
    delivery: number;
    person: number;
}

export enum CustomerTypes {
    FIZ = 1,
    UR = 0,
}

class CartService {
    public cart: ICart[] = [];

    public orderRepo: ng.resource.IResourceClass<ng.resource.IResource<IOrderModel>>;
    constructor(private $cookies: ng.cookies.ICookiesService, private $rootScope: ng.IScope, public $listener: ListenerService, private $state: ng.ui.IStateService, $resource: ng.resource.IResourceService, private $http: ng.IHttpService) {
        this.cart = [];
        this.cart = this.$cookies.getObject('cart');
        if (this.cart == undefined || this.cart == null) this.cart = [];
        this.orderRepo = $resource('http://api.victory.kz/orders/:id', {}, {}, {
            cancellable: true
        });
    }

    public saveOrder(order: IOrderModel) {
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
        let newOrder = new this.orderRepo(order);
        return newOrder.$save();
    }

    public saveCart(cart: ICart[]) {
        this.$cookies.putObject('cart', cart);
    }

    public addToCart(id, name, price, amount, weight) {
        let product: ICart = {
            amount: amount,
            id: id,
            name: name,
            price: price,
            weight: weight
        };
        let index = -1;
        this.cart.forEach((c, i) => {
            if (c.id == id) index = i;
        });
        if (index == -1) {
            this.cart.push(product);
        } else {
            this.cart[index] = product;
        }

        this.$cookies.putObject('cart', this.cart);
    }

    public clearCart(force?: boolean) {
        if (force) {
            this.cart = [];
            this.$cookies.remove('cart');
            this.$listener.emitCartCleared();
        } else {
            alertify.confirm("Victory Computers", "Вы действительно хотите очистить корзину?", () => {
                this.cart = [];
                this.$cookies.remove('cart');
                this.$listener.emitCartCleared();
                this.$state.go('products');
                this.$rootScope.$apply();
            }, () => { });
        }
    }

    public removeFromCart(id: string) {
        this.cart = this.getCart();
        _(this.cart).remove((p: ICart) => p.id == id).commit();
        this.$cookies.putObject('cart', this.cart);
        return this.cart;
    }

    public updateProduct(id: string, name: string, price: number, weight: number, amount?: number) {
        let cart = this.getCart();
        cart.forEach(c => {
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
    }

    public getCart() {
        this.cart = this.$cookies.getObject('cart');
        if (this.cart == undefined) this.cart = [];
        return this.cart;
    }

    public buy(id: string, name: string, price: string, weight: number) {
        alertify.prompt('Victory Computers', 'Введите кол-во необходимого товара', '1', (evt, amount: number) => {
            if (isNaN(amount)) return;
            this.addToCart(id, name, price, amount, weight);
            this.$rootScope.$apply();
        }, () => { });
    }
}

CartService.$inject = ['$cookies', '$rootScope', ListenerService_NAME, '$state', '$resource', '$http'];

export const NAME: string = 'vcCartService';
export default CartService;