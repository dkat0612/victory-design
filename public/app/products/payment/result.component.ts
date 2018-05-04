export class ResultController implements ng.IComponentController {
    constructor(private $stateParams, private $http: ng.IHttpService, private $state: ng.ui.IStateService) { }

    public $onInit() {
        this.status = this.$state.is('payments.success') ? 'success' : null;
        this.status = this.status || (this.$state.is('payments.fail') ? 'fail' : null);

        if (this.status == 'success') {
            let promise = this.$http.get('http://api.victory.kz/payment/start/' + this.$stateParams.order).then(r => r.data);
            promise.then(order => {
                this.order = order;
            });
        }
    }
    private status: string;
    private order;

}

ResultController.$inject = ['$stateParams', '$http', '$state'];

export const NAME: string = 'vcPaymentResult';
export const COMPONENT: ng.IComponentOptions = {
    templateUrl: '/public/app/products/payment/result.template.html',
    controller: ResultController
}

export default {
    name: NAME,
    component: COMPONENT
}