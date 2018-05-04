class PaginationController implements ng.IComponentController {
    constructor(public $scope: ng.IScope, public $timeout: ng.ITimeoutService) { }

    public onPageChange: Function;
    public count: number;
    public activePage: number;

    public pages() {
        let p = [];
        for (let i = 1; i <= this.count; i++) p.push(i);
        return p;
    }

    public choosePage(page: number) {
        this.$timeout(() => {
            this.onPageChange({ $page: page });
        }, 0);
    }

}
PaginationController.$inject = ['$scope', '$timeout'];

export default PaginationController;