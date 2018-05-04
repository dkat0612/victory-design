interface IScope extends ng.IScope {
    mask: string;
    placeholder: string;
}

export const NAME = 'maskedInput';

const DIRECTIVE: ng.IDirective = {
    restrict: 'A',
    scope: {
        mask: '@maskedInput',
        placeholder: '@miPlaceholder'
    },
    link: ($scope: IScope, $element: ng.IRootElementService, attrs) => {
        $element.mask($scope.mask, {
            placeholder: $scope.placeholder
        });
    }
}

export default DIRECTIVE;