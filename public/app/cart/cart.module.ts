import {NAME as Cart_NAME, default as Cart} from './cart.component';
import {NAME as CartService_NAME, default as CartService} from './cart.service';
import {NAME as CartActions_NAME, default as CartActions} from './cartActions.controller';

let mdl = angular.module('vc.cart', []);

mdl.component(Cart_NAME, Cart);
mdl.service(CartService_NAME, CartService);
mdl.controller(CartActions_NAME, CartActions);

export default mdl.name;
