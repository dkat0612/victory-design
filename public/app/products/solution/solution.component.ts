import Controller from './solution.controller';

const NAME: string = 'vcProductSolution';
const COMPONENT: ng.IComponentOptions = {
    templateUrl: '/public/app/products/solution/solution.template.html',
    controller: Controller
}

export default {
    name: NAME,
    component: COMPONENT
}