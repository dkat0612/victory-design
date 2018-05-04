import {ICategory, IProductResult, NAME as Repository_NAME, default as Repository, IProduct, IProductResultData} from './../repository.service';
import ProductView from './view/view.controller';
import {CEOService, NAME as CEOService_NAME} from './../../common/ceo.service';

interface ISortParams {
    field: string;
    type: string;
    limit: number;
    keywords: string;
    category: number;
    page: number;
    toOrder: number;
}

interface IStateParams extends ng.ui.IStateParamsService {
    id: string|number;
    page: string|number;
}

class ListController implements ng.IComponentController {
    constructor(public $state: ng.ui.IStateService, public repo: Repository, public $stateParams: IStateParams, private ceoService: CEOService, private $timeout: ng.ITimeoutService) { }

    public categories: ICategory[];

    public breadcrumb: any[];

    public getBreadcrumb() {
        if (this.breadcrumb == undefined) {
            this.breadcrumb = [{ id: 0, title: 'Товары' }];
        }
        return this.breadcrumb;
    }

    public productView: ProductView;

    public keywordsTimeout: ng.IPromise<void>;

    public keywordsChanged() {
        delete this.keywordsTimeout;
        this.keywordsTimeout = this.$timeout(2000);
        this.keywordsTimeout.then(() => {
            this.productView.load();
        });
    }

    public pageChanged(page: string) {
        let stateParams: IStateParams = this.$stateParams;
        if (stateParams.id != undefined) stateParams.id = this.$stateParams.id; else stateParams.id = "0";
        stateParams.page = stateParams.page = page;
        this.$state.go('category.show.param.page', stateParams);
    }

    public sortParams: ISortParams = {
        category: 0,
        field: 'price',
        keywords: '',
        limit: 10,
        page: 1,
        toOrder: 1,
        type: 'desc'
    }

    public limits = [10, 20, 50, 100];

    
    public pages: number = 0;

    public keyup(event: JQueryKeyEventObject) {
        if (event.keyCode == 13) this.productView.load();
    }

    

    public sort(field: string) {
        if (this.sortParams.field == field) {
            if (this.sortParams.type == 'asc') this.sortParams.type = 'desc';
            else this.sortParams.type = 'asc';
        } else {
            this.sortParams.field = field;
            this.sortParams.type = 'desc';
        }
        this.productView.load();
    }

    public $onInit() {
        this.sortParams.category = <number>this.$stateParams.id;
        var promise = this.repo.getCategories(0);
        promise.then((response) => {
            if (response.data.status == "ok") {
                this.categories = response.data.data;
            } else {
                alertify.notify(response.data.message, 'error', 3000);
            }
        }, (reason) => {
            alertify.notify(reason, 'error', 3000);
        });
    }

}
ListController.$inject = ['$state', Repository_NAME, '$stateParams', CEOService_NAME, '$timeout'];

export default ListController;