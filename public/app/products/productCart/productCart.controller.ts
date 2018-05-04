/// <reference path="../../common/exline.service.ts" />
import {ICategory, IProductResult, NAME as Repository_NAME, default as Repository, IProduct, IProductResultData} from './../repository.service';
import {NAME as Cart_NAME, default as Cart, ICart, ICartProduct, IOrderModel, IProductCart} from './../../cart/cart.service';
import {default as ListenerService, NAME as ListenerService_NAME, EventTypes, IOnCartClearedListener} from './../../common/listenerService/listener.service';
import {CEOService, NAME as CEOSErvice_NAME} from './../../common/ceo.service';
import {ExlineService, NAME as ExlineService_NAME, IGetPlaceResult, IRegion, IGetPriceRequest, IGetPriceResponse} from './../../common/exline.service';
import {HttpServicePromise} from './../../common/http.service';

class ProductCartController implements ng.IComponentController, IOnCartClearedListener {
    constructor(
        private $state: ng.ui.IStateService,
        private repo: Repository,
        private $cart: Cart,
        public listenerService: ListenerService,
        private $scope: ng.IScope,
        private ceoService: CEOService,
        private exlineService: ExlineService,
        private $timeout: ng.ITimeoutService
    ) { }

    public cart: ICart[];
    public products: IProduct[] = [];

    public moveProduct($index: number, direction: string) {
        let swapIndex = (direction == 'up') ? $index - 1 : $index + 1;
        let t = this.products[$index];
        this.products[$index] = this.products[swapIndex];
        this.products[swapIndex] = t;
        let c = this.cart[$index];
        this.cart[$index] = this.cart[swapIndex];
        this.cart[swapIndex] = c;
        this.$cart.saveCart(this.cart);
    }

    public getStatus(product: IProduct) {
        return this.repo.getCartStatus(product);
    }

    public onCartCleared() {
        this.products = [];
        this.cart = [];
    }

    public foundCheaper() {
        alertify.alert('Нашли дешевле?', 'Вся продукция Victory Computers<br>В наличии, с учётом НДС, по актуальной цене<br><br>Если Вы нашли товар на тех же условиях дешевле чем в нашем магазине.<br>Мы сделаем спец предложение Вам и обязательно уценим данный товар для остальных клиентов.<br><br>Мы стараемся мониторить цены и давать лучшие предложения на всю продукцию. Пожалуйста дайте нам знать, если нашли дешевле.<br><br><br><b>Тел.: 380-77-89<br><b>E-mail:</b> <a href="mailto:sales@victory.kz">sales@victory.kz</a>', function () { });
    }

    public addAmount(index, num) {
        num = + num;
        if ((+this.cart[index].amount) + num < 1) return;
        this.cart[index].amount = (+this.cart[index].amount) + num;
        this.amountChanged(index);
    }

    public amountChanged(index: number) {
        let product = this.cart[index];
        this.$cart.updateProduct(product.id, product.name, product.price, product.weight, product.amount);
    }

    public removeFromCart(product: IProduct) {
        let id = product.id;
        this.cart = this.$cart.removeFromCart(id);
        _(this.products).remove((p: IProduct) => p.id == id).commit();
        if (this.products.length == 0) {
            this.$state.go('products');
        }
    }

    public getLink() {
        let link = 'http://victory.kz/products/solution?products=';
        let cart = this.$cart.getCart();
        let products = [];
        cart.forEach(c => {
            products.push(c.id + '-' + c.amount);
        });
        link += products.join(',');
        alertify.alert("Victory Computers", `Делитесь своими коллекциями!<br><br><b>Скопируйте</b> данную ссылку для дальнейшей пересылки:<br><br> <a href="` + link + `">` + link + `</a>`);
    }

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

    public getTotal() {
        let total = 0;
        this.products.forEach((p, i) => {
            total += (+p.price) * this.cart[i].amount
        });
        return total;
    }

    public $onInit() {
        this.ceoService.setTitle('Корзина');
        this.cart = this.$cart.getCart();
        if (this.cart.length == 0) {
            this.$state.go('products');
            return;
        }
        this.cart.forEach((c, i) => {
            this.repo.getProduct(c.id).then(r => {
                if (r.data.status == 'ok') {
                    this.products[i] = r.data.data.product;
                    this.$cart.updateProduct(r.data.data.product.id, r.data.data.product.name, r.data.data.product.price, +r.data.data.product.weight);
                }
            });
        });
        this.subscribe();
    }
    public lastProductWeight = -1;

    

    public subscribe() {
        this.listenerService.Subscribe([
            EventTypes.CART_CLEARED
        ], this);
    }
    public $onDestroy() {
        this.listenerService.Unsubscribe([
            EventTypes.CART_CLEARED
        ], this);
    }

    

   

    

}
ProductCartController.$inject = ['$state', Repository_NAME, Cart_NAME, ListenerService_NAME, '$scope', CEOSErvice_NAME, ExlineService_NAME, '$timeout'];

export default ProductCartController;
