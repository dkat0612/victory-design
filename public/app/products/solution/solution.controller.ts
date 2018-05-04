import {default as Cart, NAME as Cart_NAME, ICart} from './../../cart/cart.service';

class SolutionController implements ng.IComponentController {
    constructor(private $stateParams, private $cart: Cart, public $state: ng.ui.IStateService) {
    }

    $onInit() {
        let cart: ICart[] = [];
        let products = (<string>this.$stateParams.products).split(',');
        this.$cart.clearCart(true);
        products.forEach(p => {
            let product = p.split('-');
            this.$cart.addToCart(product[0], '', '', product[1], 0);
        });
        this.$state.go('products.cart');
    }
}
SolutionController.$inject = ['$stateParams', Cart_NAME, '$state'];
export default SolutionController;