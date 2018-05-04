import Pagination from './pagination/pagination.module';
import * as ErrSrc from './errSrc.directive';
import * as MaskedInput from './maskedInput.directive';
import ListenerService from './listenerService/listener.module';
import CEOService from './ceo.service';
import HttpService from './http.service';
import ExlineService from './exline.service';
import Wizard from './wizard/wizard.module';
import FocusMe from './focus-me/focus-me.directive';


let mdl = angular.module('app.common', [
    Pagination,
    ListenerService,
    Wizard
]);

mdl.directive(ErrSrc.NAME, [() => {
    return ErrSrc.default;
}]);

mdl.directive(MaskedInput.NAME, [() => {
    return MaskedInput.default;
}]);

mdl.directive(FocusMe.name, FocusMe.directive);

mdl.service(CEOService.name, CEOService.service);
mdl.service(HttpService.name, HttpService.service);
mdl.service(ExlineService.name, ExlineService.service);

export default mdl.name;