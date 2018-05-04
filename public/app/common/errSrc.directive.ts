interface IAttrs extends ng.IAttributes {
    src: string;
    errSrc: string;
    ngSrc: string;
}

export const NAME: string = 'errSrc';

const DIRECTIVE: ng.IDirective = {
    restrict: 'A',
    link: ($scope, $element, attrs: IAttrs) => {
        $element.bind('error', function () {
            if (attrs.src != attrs.errSrc) {
                attrs.$set('src', attrs.errSrc);
            }
        });
        attrs.$observe('ngSrc', function (value) {
            if (!value && attrs.errSrc) {
                attrs.$set('src', attrs.errSrc);
            }
        });
    }
}

export default DIRECTIVE;