import {NAME as Pagination_NAME, default as Pagination} from './pagination.component';

let mdl = angular.module('vc.common.pagination', []);

mdl.component(Pagination_NAME, Pagination);

export default mdl.name;
