/// <reference path="../wizard.controller.ts" />
import WizardController from './../wizard.controller';

export class WizarItemdController {

    
    public name: string;
    public next: string;
    public prev: string;
    public first: boolean;
    public last: boolean;
    public finished: boolean;
    public wizard: WizardController;
    public active: boolean = false;
    public check: (...args: any[]) => boolean;
    public onChange: (...args: any[]) => void;

    public constructor() { }

    public $onInit() {
        this.wizard.addItem(this);
    }

}
WizardController.$inject = [];

export default WizarItemdController;