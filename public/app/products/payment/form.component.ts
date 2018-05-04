interface StateParams {
    order: number;
}

interface IEpayRequest {
    email?: string,
    PostLink: string;
    FailurePostLink: string;
    BackLink: string;
    FailureBackLink: string;
    Signed_Order_B64: string;
}

export class PaymentFormController {
    constructor(private $stateParams: StateParams, private $http: ng.IHttpService, private $cookies: ng.cookies.ICookiesService) { }

    public loading: boolean = false;
    public price: number;
    public sitelink: string = 'http://victory.kz';
    public order;
    public myOrder: boolean = false;

    public model: IEpayRequest = {
        BackLink: `${this.sitelink}/payment/${this.$stateParams.order}/success`,
        FailureBackLink: `${this.sitelink}/payment/${this.$stateParams.order}/fail`,
        PostLink: `${this.sitelink}/paymentraw/success/${this.$stateParams.order}`,
        FailurePostLink: `${this.sitelink}/paymentraw/fail/${this.$stateParams.order}`,
        Signed_Order_B64: ''
    }

    public $onInit() {
        this.model.email = this.$cookies.get('email');
        this.myOrder = +this.$cookies.get('order') == +this.$stateParams.order;
        let confirmedOrders: number[] = angular.fromJson(sessionStorage.getItem('confirmedOrders'));
        this.myOrder = _(confirmedOrders).includes(+this.$stateParams.order) || this.myOrder;

        if (this.myOrder) {
            this.loading = true;
            this.getOrder().then(r => {
                this.order = r.order;
                this.model.Signed_Order_B64 = r.sign;
                this.price = r.price;
            }).finally(() => {
                this.loading = false;
            })
        };
        
    }


    public phone: string;
    public confirm() {
        let promise = this.$http.post("http://api.victory.kz/payment/confirm/" + this.$stateParams.order, { phone: this.phone }).then(r => { return r.data });
        this.loading = true;
        promise.then(data => {
            this.myOrder = true;
            let confirmedOrders: number[] = angular.fromJson(sessionStorage.getItem('confirmedOrders')) || [];
            confirmedOrders.push(+this.$stateParams.order);
            sessionStorage.setItem('confirmedOrders', angular.toJson(confirmedOrders));
            this.getOrder().then(r => {
                this.order = r.order;
                this.model.Signed_Order_B64 = r.sign;
                this.price = r.price;
            }).finally(() => {
                this.loading = false;
            });
        }, (reason) => {
            alertify.error("Скорее всего вы ввели неправильный номер, попробуйте еще раз", 3);
        }).finally(() => {
            this.loading = false;
        });
    }

    public getOrder() {
        let promise = this.$http.get<{
            order: any,
            sign: string,
            price: number
        }>("http://api.victory.kz/payment/sign/" + this.$stateParams.order).then(r => { return r.data; });
        return promise;
    }

}
PaymentFormController.$inject = ['$stateParams', '$http', '$cookies'];

export const NAME: string = 'vcPaymentForm';
export const COMPONENT: ng.IComponentOptions = {
    controller: PaymentFormController,
    templateUrl: '/public/app/products/payment/form.template.html'
}

export default {
    name: NAME,
    component: COMPONENT
}