export interface IScope extends ng.IScope {
    focusMe: boolean;
}

export const NAME: string = 'focusMe';
export const DIRECTIVE = ['$timeout', ($timeout) => {
    let directive: ng.IDirective = {
        scope: {
            focusMe: '='
        },
        link: ($scope: IScope, $element: ng.IRootElementService, $attrs: ng.IAttributes) => {
            let watcher = $scope.$watch('focusMe', (value) => {
                console.log('value=', value);
                if (value === true) {
                    $timeout(() => {
                        $element[0].focus();
                    });
                }
            });

            $element.bind('blur', function () {
                $scope.focusMe = false;
            });

            $scope.$on('destroy', () => {
                watcher();
            });
        }
    }

    return directive;
}];

export default {
    name: NAME,
    directive: DIRECTIVE
}