import OrderController from './order.controller';

export const NAME: string = "vcMakeOrder";
export const COMPONENT: ng.IComponentOptions = {
    controller: OrderController,
    templateUrl: '/public/app/products/order/order.template.html'
}

export default {
    name: NAME,
    component: COMPONENT
}