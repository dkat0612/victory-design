import WizardController from './wizard.controller';

export const NAME: string = 'vcWizard';
export const COMPONENT: ng.IComponentOptions = {
    controller: WizardController,
    templateUrl: '/public/app/common/wizard/wizard.template.html',
    transclude: true,
    bindings: {
        onFinish: '&',
        finishText: '@',
        showButtons: '<',
        link: '=?',
        disabled: '<'
    }
}

export default {
    name: NAME,
    comonent: COMPONENT
}