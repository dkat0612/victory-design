class CartActionController {
    constructor() { }

    public addToCart(id: number) {
        console.log('add to cart', id);
    }
}
CartActionController.$inject = [];

export default CartActionController;
export const NAME: string = 'vcCartActionsController';