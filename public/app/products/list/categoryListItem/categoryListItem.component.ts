import Controller from './categoryListItem.controller';
import {NAME as List} from './../list.component';

export const NAME: string = 'vcCategoryListItem';

const COMPONENT: ng.IComponentOptions = {
    bindings: {
        category: '<'
    },
    require: {
        parentItem: '^^?' + NAME,
        list: '^^' + List
    },
    templateUrl: '/public/app/products/list/categoryListItem/categoryListItem.template.html',
    controller: Controller,
}

export default COMPONENT;
