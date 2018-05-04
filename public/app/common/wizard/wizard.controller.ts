import WizardItemController from './item/item.controller';

export class WizardController {
    public items: WizardItemController[] = [];
    public activeItem: WizardItemController = null;
    public onFinish: Function;
    public link: any;
    public disabled: boolean = false;

    public $onInit() {
        this.link = this;
        console.log(this);
    }

    public setActive(name: string) {
        let item = _(this.items).find((item: WizardItemController) => {
            return item.name == name
        });
        this.activeItem.active = false;
        this.activeItem = item;
        this.activeItem.active = true;
        if (this.activeItem.onChange) this.activeItem.onChange();
    }

    public next() {
        if (this.activeItem.check()) {
            this.setActive(this.activeItem.next);
        } else {
            alertify.error('Форма заполнена не верно', 3000);
        }
    }

    public prev() {
        this.setActive(this.activeItem.prev);
    }

    public finish() {
        let hasError = false;
        this.items.forEach((i) => {
            if (hasError) return;
            if (i.check && !i.check()) {
                alertify.notify('Форма заполнена не верно', 'error', 3000);
                this.setActive(i.name);
                hasError = true;
            }
        });
        if (!hasError) this.onFinish();
    }

    public addItem(item: WizardItemController) {
        console.log(item);
        this.items.push(item);
        if (item.first) {
            if (this.activeItem != null) {
                throw new Error("First item already defined");
            }
            this.activeItem = item;
            item.active = true;
        }
    }

}
WizardController.$inject = [];

export default WizardController;