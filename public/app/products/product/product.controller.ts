import {ICategory, IProductResult, NAME as Repository_NAME, default as Repository, IProduct, IProductResultData} from './../repository.service';
import {NAME as CartService_NAME, default as CartService} from './../../cart/cart.service';
import {CEOService, NAME as CEOService_NAME} from './../../common/ceo.service';

interface IStateParams {
    id: string;
}

class ProductController implements ng.IComponentController {
    constructor(
        private $scope: ng.IScope,
        public $state: ng.ui.IStateService,
        public repo: Repository,
        public $stateParams: IStateParams,
        private $cart: CartService,
        private $sce: ng.ISCEService,
        private $element: ng.IRootElementService,
        private ceoService: CEOService,
        private $document: ng.IDocumentService
    ) { }

    public product: IProduct;
    public breadcrumb: { id: string, title: string }[];

    public photosShowing: boolean = false;
    public activePhoto: string;
    public showPhotos() {
        $('body').css('overflow', 'hidden');
        this.activePhoto = this.product.id + '.jpg';
        this.photosShowing = true;

        this.keyEvent = this.$document.on('keyup', (event) => {
            let code = event.keyCode;
            if (code == 37) this.prevPhoto();
            if (code == 39) this.nextPhoto();
            if (code == 27) this.closeSlider(null);
            this.$scope.$apply();
        });
    }

    public buy() {
        if (+this.product.solution == 0) {
            this.$cart.buy(this.product.id, this.product.name, this.product.price.toString(), +this.product.weight);
        } else {
            this.product.solution_products.forEach(p => {
                this.$cart.addToCart(p.product_id, '', 0, p.amount, 0);
            });
            alertify.confirm('VictoryComputers', 'Комплектующие добавлены в корзину, перейти к оформлению заказа?', () => {
                this.$state.go('products.cart');
            }, () => { });
        }
    }

    public getAmountAsterix() {
        if (this.product == undefined) return "";
        let productAmount;
        if (+this.product.status == 5) productAmount = "| * |";
        else if (+this.product.amount <= 0) productAmount = "";
        else if (+this.product.amount > 0 && (+this.product.amount <= 5)) productAmount = "| * |";
        else if (+this.product.amount > 5 && (+this.product.amount <= 15)) productAmount = "| ** |";
        else if (+this.product.amount > 15) productAmount = "| *** |";
        else productAmount = "| Что-то не так |";
        return productAmount;
    }

    public getStatus() {
        if (this.product == undefined) return {css: 'del', text: 'Проверяем наличие ...'};
        return this.repo.getStatus(this.product);
    }

    public foundCheaper() {
        alertify.alert('Нашли дешевле?', 'Вся продукция Victory Computers<br>В наличии, с учётом НДС, по актуальной цене<br><br>Если Вы нашли товар на тех же условиях дешевле чем в нашем магазине.<br>Мы сделаем спец предложение Вам и обязательно уценим данный товар для остальных клиентов.<br><br>Мы стараемся мониторить цены и давать лучшие предложения на всю продукцию. Пожалуйста дайте нам знать, если нашли дешевле.<br><br><br><b>Тел.: 380-77-89<br><b>E-mail:</b> <a href="mailto:sales@victory.kz">sales@victory.kz</a>', function () { });
    }

    public getWarranty() {
        if (this.product == undefined) return "";
        var productWarranty = 'Гарантия: ' + this.product.warranty + ' ' + this.product.warranty_period;
        if (this.product.warranty == 0) productWarranty = "";
        else if (this.product.warranty == 2 && this.product.warranty_period == "Месяц") productWarranty = "Гарантия: 2 Месяца";
        else if (this.product.warranty == 2 && this.product.warranty_period == "Год") productWarranty = "Гарантия: 2 Года";
        else if (this.product.warranty == 3 && this.product.warranty_period == "Месяц") productWarranty = "Гарантия: 3 Месяца";
        else if (this.product.warranty == 3 && this.product.warranty_period == "Год") productWarranty = "Гарантия: 3 Года";
        else if (this.product.warranty == 4 && this.product.warranty_period == "Месяц") productWarranty = "Гарантия: 4 Месяца";
        else if (this.product.warranty == 4 && this.product.warranty_period == "Год") productWarranty = "Гарантия: 4 Года";
        else if (this.product.warranty == 5 && this.product.warranty_period == "Месяц") productWarranty = "Гарантия: 5 Месяцев";
        else if (this.product.warranty == 5 && this.product.warranty_period == "Год") productWarranty = "Гарантия: 5 Лет";
        else if (this.product.warranty == 6 && this.product.warranty_period == "Месяц") productWarranty = "Гарантия: 6 Месяцев";
        else if (this.product.warranty == 6 && this.product.warranty_period == "Год") productWarranty = "Гарантия: 6 Лет";
        else if (this.product.warranty == 7 && this.product.warranty_period == "Месяц") productWarranty = "Гарантия: 7 Месяцев";
        else if (this.product.warranty == 7 && this.product.warranty_period == "Год") productWarranty = "Гарантия: 7 Лет";
        else if (this.product.warranty == 10 && this.product.warranty_period == "Год") productWarranty = "Гарантия: 10 Лет";
        else if (this.product.warranty == 11 && this.product.warranty_period == "Год") productWarranty = "Гарантия: 11 Лет";
        else if (this.product.warranty == 1 && this.product.warranty_period == "xxx") productWarranty = '1 Год +';
        else productWarranty = 'Гарантия: ' + this.product.warranty + ' ' + this.product.warranty_period;
        return productWarranty;
    }

    public toTrusted(str: string) {
        return this.$sce.trustAsHtml(str);
    }

    public keyEvent: any;

    public getBreadcrumb() {
        if (this.product == undefined) return [];
        return this.breadcrumb;
    }

    public closeSlider($event: any) {
        if ($event == null || $event.target.classList.contains('main') || $event.target.classList.contains('fa-times')) {
            this.photosShowing = false;
            $('body').css('overflow', '');
            this.$document.off('keyup', this.keyEvent);
        }
    }

    public nextPhoto() {
        if (this.activePhoto == this.product.id + '.jpg') {
            if (this.product.photos.length) {
                this.activePhoto = this.product.photos[0].photo + '.jpg';
            }
        } else {
            let index = -1;
            for (let i = 0; i < this.product.photos.length; i++) {
                if (this.activePhoto == this.product.photos[i].photo + '.jpg') index = i;
            }
            if (index == this.product.photos.length - 1) {
                this.activePhoto = this.product.id + '.jpg';
            } else {
                this.activePhoto = this.product.photos[index + 1].photo + '.jpg';
            }
            
        }
    }

    public prevPhoto() {
        if (this.activePhoto == this.product.id + '.jpg') {
            if (this.product.photos.length) {
                this.activePhoto = this.product.photos[this.product.photos.length - 1].photo + '.jpg';
            }
        } else {
            let index = -1;
            for (let i = 0; i < this.product.photos.length; i++) {
                if (this.activePhoto == this.product.photos[i].photo + '.jpg') index = i;
            }
            if (index == 0) {
                this.activePhoto = this.product.id + '.jpg';
            } else {
                this.activePhoto = this.product.photos[index - 1].photo + '.jpg';
            }

        }
    }

    public $onInit() {
        let promise = this.repo.getProduct(this.$stateParams.id);
        promise.then(response => {
            
            if (response.data.status == "ok") {
                this.product = response.data.data.product;
                this.breadcrumb = response.data.data.path;
                this.ceoService.setTitle(this.product.name);
                let description = 'Victory продает по Алматы, Астана, Казахстан, купить ' + this.product.price_name + '  в наличии купить Алматы доставка по Казахстану оптом цена';
                this.ceoService.setDescription(description);

                let keywords = [];
                this.product.price_name.split(' ').forEach(str => {
                    let tmp = str.split('/');
                    keywords.push(tmp.join(','));
                })
                let page_keywords = 'купить,Алматы,Казахстан,дешего,цена,Victory,Computers,в наличии, продает,' + keywords.join(',');
                this.ceoService.setKeywords(page_keywords);
            }
        });
    }
}
ProductController.$inject = ['$scope', '$state', Repository_NAME, '$stateParams', CartService_NAME, '$sce', '$element', CEOService_NAME, '$document'];

export default ProductController;