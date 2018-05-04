import Controller from './static.controller';

const NAME: string = 'vcStaticPages';
const COMPONENT: ng.IComponentOptions = {
    templateUrl: '/public/app/static/static.template.html',
    controller: Controller
}

export default {
    name: NAME,
    component: COMPONENT
}
