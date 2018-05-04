import Controller from './product.controller';

const COMPONENT: ng.IComponentOptions = {
    templateUrl: '/public/app/products/product/product.template.html',
    controller: Controller,
}

export default COMPONENT;
export const NAME: string = 'vcProduct';