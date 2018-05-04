import Form from './form.component';
import Result from './result.component';

let mdl = angular.module('app.payments', []);

mdl.config(['$stateProvider', ($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state({
        name: 'payments',
        url: '/payment/{order:int}',
        template: '<vc-payment-form></vc-payment-form>'
    });

        $stateProvider.state({
        name: 'payments.success',
        url: '/success',
        views: {
            '@': {
                template: '<vc-payment-result></vc-payment-result>'
            }
        }

    });

    $stateProvider.state({
        name: 'payments.fail',
        url: '/fail',
        views: {
            '@': {
                template: '<vc-payment-result></vc-payment-result>'
            }
        }
    });
}]);

mdl.component(Form.name, Form.component);
mdl.component(Result.name, Result.component);

export default mdl.name;