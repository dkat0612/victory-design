export interface ICategory {
    deleted: string;
    description: string;
    id: string;
    parent: string;
    subcategories: ICategory[];
    title: string;
    weight: string;
}

export enum ProductStatus {
    NewProduct = 0,
    VisibleOnSite = 1,
    DeletedFromSite = 2,
    WaitingToDelete = 3,
}

export enum ProductPlaces {
    OrdinaryProduct = 0,
    Kaspi = 1,
    RetailNoProduct = 2,
    ForOrder = 3,
    SiteProduct = 9,
    RetailHasProduct = 10
}

export enum ProductType {
    NoType = 0,
    PriceLower = 1,
    NewProduct = 2,
    SpecialOffer = 3,
    Hit = 4,
    Sale = 5,
    WithGift = 6
}

export interface IProduct {
    amount: string
    category: string;
    description: string;
    id: string;
    kaspi_price: string;
    kprice: string;
    link: string;
    modified: string;
    name: string;
    place: string;
    price: number;
    price_disc: string;
    price_name: string;
    price_offer: string;
    real_price: string;
    recomended_name: string;
    retail_price: string;
    status: string;
    thumbnail: string;
    type: string;
    vendor_code: string;
    warranty: number;
    warranty_period: string;
    wholesale_price: string;
    wprice: string;
    solution: string;
    solution_products?: {
        solution_id: string;
        product_id: string;
        amount: string;
    }[];
    photos: {
        id: string;
        photo: string;
    }[];
    weight: string;
    package_weight: string;
}

export interface IProductResultData {
    pages: number;
    path: {
        id: number,
        title: string
    }[];
    products: IProduct[]
}

interface IGetProductResponseData {
    path: {
        id: string,
        title: string
    }[];
    product: IProduct
}

export interface IGetProductResponseModel {
    data: IGetProductResponseData;
    status: string;
    message: string;
}

export interface IProductResult {
    data: IProductResultData;
    status: string;
    message: string;
}

export interface IGetCategoriesResponseModel {
    data: ICategory[];
    message: string;
    status: string;
}

export interface IMakeOrderResult {
    data: number | string;
    message: string;
    status: string;
}

class ProductRepository {
    constructor(public $http: ng.IHttpService, public $serializer: ng.IHttpParamSerializer) { }

    public api: string = 'http://api.victory.kz';

    public getCategories(id: number): ng.IHttpPromise<IGetCategoriesResponseModel> {
        let model = {
            id: id
        };
        return this.$http.post(this.api + '/category/get', this.$serializer(model), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }

    public getProduct(id: string): ng.IHttpPromise<IGetProductResponseModel> {
        let model = {
            id: id
        };
        return this.$http.post(this.api + '/products/product', this.$serializer(model), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }

    public getProducts(model): ng.IHttpPromise<IProductResult> {
        return this.$http.post(this.api + '/products/get', this.$serializer(model), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }

    public makeOrder(model): ng.IHttpPromise<IMakeOrderResult> {
        return this.$http.post(this.api + '/orders/generate', this.$serializer(model), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }

    public getStatus(product: IProduct) {
        let result = {
            css: '',
            text: '',
        }
        if (+product.amount <= 0) {
            if (+product.place == ProductPlaces.RetailNoProduct) {
                result.css = 'exist';
                result.text = 'На складе +1 день';
            } else if (+product.status == ProductStatus.DeletedFromSite) {
                result.css = 'del'
                result.text = 'Удален'
            } else if (+product.place == ProductPlaces.ForOrder) {
                result.css = 'del'
                result.text = 'На заказ'
            }
            else {
                result.css = 'del';
                result.text = 'Резерв'
            }
        } else {
            result.css = 'exist';
            result.text = 'В наличии';
        }
        return result;
    }

    public getCartStatus(product: IProduct) {
        if (!product) return { css: 'del', text: 'Проверяем наличие ...' };
        let AmountStatus = '';
        let AmountStyle = '';
        if (+product.status == ProductStatus.DeletedFromSite) {
            AmountStatus = "Товар удалён";
            AmountStyle = "del";
        }
        else if (+product.place == ProductPlaces.RetailNoProduct) {
            AmountStatus = "Товар на уд. складе, 100% оплата, +1 день к доставке";
            AmountStyle = "exist";
        }
        else if (+product.amount > 10) {
            AmountStatus = "В наличии много";
            AmountStyle = "exist";
        }
        else if (+product.amount > 0) {
            AmountStatus = "В наличии";
            AmountStyle = "exist";
        }
        else {
            AmountStatus = "Данный товар полностью зарезервирован под клиентов, пожалуйста, ожидайте наличия, снятия резерва, поступления или замените его на другой. Мы не выставим Вам счёь на этот заказ.";
            AmountStyle = "del";
        }
        return {
            css: AmountStyle,
            text: AmountStatus
        }
    }

}
ProductRepository.$inject = ['$http', '$httpParamSerializerJQLike'];

export const NAME: string = 'vcProductRepository';

export default ProductRepository;