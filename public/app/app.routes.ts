const States: ng.ui.IState[] = [
    {
        name: 'products.show',
        url: '/show/:id',
        views: {
            '@': {
                template: '<vc-product></vc-product>'
            }
        }
    },

    {
        name: 'products.cart',
        url: '/cart',
        views: {
            '@': {
                template: '<vc-product-cart><vc-product-cart>'
            }
        }
    },
    {
        name: 'main',
        url: '/',
        templateUrl: '/home/index'
    }
];

export default States;
