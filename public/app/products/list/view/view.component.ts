import Controller from './view.controller';
import {NAME as List} from './../list.component';

export const NAME: string = 'vcProductsView';

const COMPONENT: ng.IComponentOptions = {
    bindings: {
        category: '<'
    },
    require: {
        list: '^^' + List
    },
    templateUrl: '/public/app/products/list/view/view.template.html',
    controller: Controller,
}

export default COMPONENT;
