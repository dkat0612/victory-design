import WizardController from './item.controller';

export const NAME: string = 'vcWizardItem';
export const COMPONENT: ng.IComponentOptions = {
    controller: WizardController,
    templateUrl: '/public/app/common/wizard/item/item.template.html',
    transclude: true,
    require: {
        wizard: '^^vcWizard'
    },
    bindings: {
        name: '@',
        next: '<',
        prev: '<',
        first: '<',
        last: '<',
        check: '&',
        onChange: '&'
    }
}

export default {
    name: NAME,
    comonent: COMPONENT
}