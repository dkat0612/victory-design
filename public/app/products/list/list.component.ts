import Controller from './list.controller';

const COMPONENT: ng.IComponentOptions = {
    templateUrl: '/public/app/products/list/list.template.html',
    controller: Controller,
}

export default COMPONENT;
export const NAME: string = 'vcProductList';