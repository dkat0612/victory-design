function PopulateCart(cart) {
    var cartText = "У вас в корзине <span></span> ";
    var cart = Object.keys(cart);
    if (cart.length < 10 || cart.length % 100 > 20) {
        switch(cart.length % 10) {
            case 1: cartText +=  "товар"; break;
            case 2: cartText += "товара"; break;
            case 3: cartText += "товара"; break;
            case 4: cartText += "товара"; break;
            case 5: cartText += "товара"; break;
            case 6: cartText += "товаров"; break;
            case 7: cartText += "товаров"; break;
            case 8: cartText += "товаров"; break;
            case 9: cartText += "товаров"; break;
            default: cartText += "товаров"; break;
        }
    } else cartText += "товаров";
    $('.cart').find('.info').html(cartText);

    $('.cart').find('.info span').html(cart.length);
    if (cart.length == 0) {
        $('.cart').addClass('hidden');
        window.location.replace('/products');
    }
}

function SendToCart(id, amount) {
    $.ajax({
            url: '/products/add_to_cart',
            type: 'POST',
            data: {id: id, amount: amount},
            success: function(data) {
                data = JSON.parse(data);

                if (data.status == "success") {
                    alertify.notify("Товар успешно добавлен в корзину", 'success', 5);
                    $('.cart').removeClass('hidden');
                } else if (data.status == "exist") {
                    alertify.notify("Товар уже был добавлен в корзину", 'success', 5);
                    $('.cart').removeClass('hidden');
                } else {
                    alertify.notify("Ошибка при добавлении товара в корзину", 'error', 5);
                }

                PopulateCart(JSON.parse(data.cart));

            },
            error: function() {
                alertify.notify("Ошибка при добавлении товара в корзину", 'error', 5);
            }
        });
}

function AddToCart(id, number) {

    var amount = 0;
    if (number == undefined || number == '') {
        var prompt = alertify.prompt();
        $(prompt.elements.header).html('Victory Computers');
        prompt.set('message', 'Введите кол-во необходимого товара');
        $(prompt.elements.body).find('input').prop('type', 'number').val(1);
        prompt.set('onok', function(evt, value) {
            if (!isNaN(value) && value != '' && value >= 1) SendToCart(id, value); else {
                setTimeout(function() {AddToCart(id)}, 100);
                alertify.notify('Введите положительное число', 'error', 5);
            }
        })
        prompt.show();


    } else {
        if (isNaN(number)) AddToCart(id); else  SendToCart(id, number);
    }

}

function RemoveFromCart(id, productRemove) {
    $.ajax({
        url: '/products/remove_from_cart',
        type: 'POST',
        data: {id: id},
        success: function(data) {
            data = JSON.parse(data);
            if (data.status == "ok") {
                PopulateCart(data.cart);
                alertify.notify('Товар успешно удален из корзины', 'success', 5);
                if (productRemove === true) {
                    $('#product-' + id).remove();
                    recount();
                }
            } else {
                alertify.notify('Произошла ошибка, попробуйте еще раз', 'error', 5);
            }
        },
        error: function() {
            alertify.notify('Произошла ошибка, попробуйте еще раз', 'error', 5);
        }
    })
}

function ClearCart(removeProducts) {
    $.ajax({
        url: '/products/clear_cart',
        type: 'POST',
        data: {},
        success: function(data) {
            if (data == "success") {
                window.location.replace('/products');
                if (removeProducts != undefined) {
                    $('.product').remove();
                }

                alertify.notify("Корзина успешно очищена", 'success', 5);
                $('.cart').addClass('hidden');
            }
        }
    });
}
