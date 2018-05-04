import WizardComponent from './wizard.component';
import WizardItemComponent from './item/item.component';

let mdl = angular.module('vc.common.wizard', [])

mdl.component(WizardComponent.name, WizardComponent.comonent);
mdl.component(WizardItemComponent.name, WizardItemComponent.comonent);

export default mdl.name