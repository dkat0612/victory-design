import {NAME as Product_NAME, default as Product} from './productCart.component';

let mdl = angular.module('vc.products.productCart', []);

mdl.component(Product_NAME, Product);

export default mdl.name;
