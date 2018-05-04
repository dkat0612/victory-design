import {NAME as Cart_NAME, default as Cart} from './../../../cart/cart.service';
import {ICategory, NAME as Repository_NAME, default as Repository, IProduct, ProductPlaces, ProductStatus} from './../../repository.service';
import ListController from './../list.controller';
import {CEOService, NAME as CEOService_NAME} from './../../../common/ceo.service';

interface IStateParams extends ng.ui.IStateParamsService {
    id: number;
    page: number;
}

class ProductsViewController implements ng.IComponentController {
    constructor(public $scope: ng.IScope, public $state: ng.ui.IStateService, public $stateParams: IStateParams, public repo: Repository, public cart: Cart, private ceoService: CEOService) { }
    
    public category: string;
    public products: IProduct[];

    public list: ListController;

    public showProduct(product: IProduct) {
        return product.id.indexOf('W') < 0;
    }

    public getWarranty(product: IProduct) {
        var productWarranty = 'Гарантия: ' + product.warranty + ' ' + product.warranty_period;
        if (product.warranty == 0) productWarranty = "";
        else if (product.warranty == 2 && product.warranty_period == "Месяц") productWarranty = "Гарантия: 2 Месяца";
        else if (product.warranty == 2 && product.warranty_period == "Год") productWarranty = "Гарантия: 2 Года";
        else if (product.warranty == 3 && product.warranty_period == "Месяц") productWarranty = "Гарантия: 3 Месяца";
        else if (product.warranty == 3 && product.warranty_period == "Год") productWarranty = "Гарантия: 3 Года";
        else if (product.warranty == 4 && product.warranty_period == "Месяц") productWarranty = "Гарантия: 4 Месяца";
        else if (product.warranty == 4 && product.warranty_period == "Год") productWarranty = "Гарантия: 4 Года";
        else if (product.warranty == 5 && product.warranty_period == "Месяц") productWarranty = "Гарантия: 5 Месяцев";
        else if (product.warranty == 5 && product.warranty_period == "Год") productWarranty = "Гарантия: 5 Лет";
        else if (product.warranty == 6 && product.warranty_period == "Месяц") productWarranty = "Гарантия: 6 Месяцев";
        else if (product.warranty == 6 && product.warranty_period == "Год") productWarranty = "Гарантия: 6 Лет";
        else if (product.warranty == 7 && product.warranty_period == "Месяц") productWarranty = "Гарантия: 7 Месяцев";
        else if (product.warranty == 7 && product.warranty_period == "Год") productWarranty = "Гарантия: 7 Лет";
        else if (product.warranty == 10 && product.warranty_period == "Год") productWarranty = "Гарантия: 10 Лет";
        else if (product.warranty == 11 && product.warranty_period == "Год") productWarranty = "Гарантия: 11 Лет";
        else if (product.warranty == 1 && product.warranty_period == "xxx") productWarranty = '1 Год +';
        else productWarranty = 'Гарантия: ' + product.warranty + ' ' + product.warranty_period;
        return productWarranty;
    }

    public getStatus(product: IProduct) {
        return this.repo.getStatus(product);
    }

    public load() {
        
        if (this.list.sortParams.category == undefined || this.list.sortParams.category == null) this.list.sortParams.category = 0;
        if (this.list.sortParams.page == undefined) this.list.sortParams.page = 1;
        var promise = this.repo.getProducts(this.list.sortParams);
        promise.then((response) => {
            if (response.data.status == "ok") {
                this.products = response.data.data.products;
                this.list.breadcrumb = response.data.data.path;
                this.list.pages = Math.ceil(response.data.data.pages);
                let description = '';
                let categories: string[] = [];
                this.list.breadcrumb.forEach(category => {
                    categories.push(category.title);
                });
                let category = this.list.breadcrumb[this.list.breadcrumb.length - 1].title;
                this.ceoService.setTitle(category);
                this.ceoService.setDescription('Victory продает по Алматы, Астана, Казахстан, купить ' + categories.join(', ') + '  в наличии купить Алматы доставка по Казахстану оптом цена');
                let keywords = [];
                categories.forEach(category => {
                    category.split(' ').forEach(keyword => {
                        keywords.push(keyword.replace(',', ''));
                    });
                });
                this.ceoService.setKeywords('купить,Алматы,Казахстан,дешего,цена,Victory,Computers,в наличии, продает,' + keywords.join(','));
            } else {
                alertify.notify(response.data.message, 'error', 3000);
            }
        });
    }

    public buy(product: IProduct) {
        this.cart.buy(product.id, product.name, product.price.toString(), +product.weight);
    }

    public $onInit() {

        this.$scope.$watchCollection('$ctrl.$stateParams', (newValue: IStateParams, oldValue: IStateParams) => {
            this.list.sortParams.category = this.$stateParams.id;
            this.list.sortParams.page = (this.$stateParams.page != null && this.$stateParams.page != undefined) ? this.$stateParams.page : 1;
            this.load();
        })

        this.list.productView = this;
        this.list.sortParams.category = this.$stateParams.id;
        this.list.sortParams.page = (this.$stateParams.page != null && this.$stateParams.page != undefined) ? this.$stateParams.page : 1;
        this.load();
    }

}
ProductsViewController.$inject = ['$scope', '$state', '$stateParams', Repository_NAME, Cart_NAME, CEOService_NAME];

export default ProductsViewController;