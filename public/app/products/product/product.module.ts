import {NAME as Product_NAME, default as Product} from './product.component';

let mdl = angular.module('vc.products.product', []);

mdl.component(Product_NAME, Product);

export default mdl.name;
