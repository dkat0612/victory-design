import * as ListenerService from './listener.service';

let mdl = angular.module('common.listenerService', []);

mdl.service(ListenerService.NAME, ListenerService.default);

export default mdl.name;