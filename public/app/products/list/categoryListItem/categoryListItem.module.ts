import {NAME as ListItem_NAME, default as ListItem} from './categoryListItem.component';

let mdl = angular.module('vc.products.list.categoryListItem', []);

mdl.component(ListItem_NAME, ListItem);

export default mdl.name;
