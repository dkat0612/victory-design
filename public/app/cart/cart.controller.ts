import {NAME as Cart_NAME, default as Cart} from './cart.service';

class CartController implements ng.IComponentController {
    constructor(public cart: Cart, private $state: ng.ui.IStateService) { }
    public getCart() {
        return this.cart.getCart();
    }

    public clearCart() {
        this.cart.clearCart();
        
    }
}
CartController.$inject = [Cart_NAME, '$state'];

export default CartController;