import ProductList from './../list.controller';
import {ICategory, NAME as Repository_NAME, default as Repository} from './../../repository.service';

interface IStateParams extends ng.ui.IStateParamsService {
    id: string;
}

class CategoryListItemController implements ng.IComponentController {
    constructor(public $state: ng.ui.IStateService, public $stateParams: IStateParams) { }

    public category: ICategory;
    public parentItem: CategoryListItemController;
    public children: CategoryListItemController[] = [];
    public list: ProductList;
    
    public navigate() {
        this.$state.go('category.show.param', {
            id: this.category.id,
            page: 1
        });
    }

    public isActive() {
        return this.$stateParams.id == this.category.id;
    }

    public isOpened() {
        let flag = false;
        this.children.forEach((listItem) => {
            flag = flag || listItem.isOpened();
        });
        return this.$stateParams.id == this.category.id || flag;
    }

    public $onInit() {
        if (this.parentItem) this.parentItem.children.push(this);
    }

}
CategoryListItemController.$inject = ['$state', '$stateParams'];

export default CategoryListItemController;