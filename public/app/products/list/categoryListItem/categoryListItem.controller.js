define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CategoryListItemController = (function () {
        function CategoryListItemController($state, $stateParams) {
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.children = [];
        }
        CategoryListItemController.prototype.navigate = function () {
            this.$state.go('category.show.param', {
                id: this.category.id,
                page: 1
            });
        };
        CategoryListItemController.prototype.isActive = function () {
            return this.$stateParams.id == this.category.id;
        };
        CategoryListItemController.prototype.isOpened = function () {
            var flag = false;
            this.children.forEach(function (listItem) {
                flag = flag || listItem.isOpened();
            });
            return this.$stateParams.id == this.category.id || flag;
        };
        CategoryListItemController.prototype.$onInit = function () {
            if (this.parentItem)
                this.parentItem.children.push(this);
        };
        return CategoryListItemController;
    }());
    CategoryListItemController.$inject = ['$state', '$stateParams'];
    exports.default = CategoryListItemController;
});
//# sourceMappingURL=categoryListItem.controller.js.map