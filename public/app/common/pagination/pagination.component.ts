import Controller from './pagination.controller';

const COMPONENT: ng.IComponentOptions = {
    bindings: {
        onPageChange: '&',
        count: '<',
        activePage: '<'
    },
    templateUrl: '/public/app/common/pagination/pagination.template.html',
    controller: Controller,
}

export default COMPONENT;
export const NAME: string = 'vcPagination';