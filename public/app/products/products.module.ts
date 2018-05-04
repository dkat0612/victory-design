import List from './list/list.module';
import Product from './product/product.module';
import ProductCart from './productCart/productCart.module';
import Solution from './solution/solution.module';
import Order from './order/order.module';
import Payments from './payment/payment.module';

import {NAME as ProductRepository_NAME, default as ProductRepository} from './repository.service';

let mdl = angular.module('vc.products', [
    List,
    Product,
    ProductCart,
    Solution,
    Order,
    Payments
]);

mdl.service(ProductRepository_NAME, ProductRepository);

export default mdl.name;
