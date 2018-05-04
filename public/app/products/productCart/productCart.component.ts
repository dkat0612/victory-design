import Controller from './productCart.controller';

const COMPONENT: ng.IComponentOptions = {
    templateUrl: '/public/app/products/productCart/productCart.template.html',
    controller: Controller,
}

export default COMPONENT;
export const NAME: string = 'vcProductCart';