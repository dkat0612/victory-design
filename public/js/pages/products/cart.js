function recount() {
    var price = 0;
    $('.product-all-price').each(function() {
        price += $(this).find('span').html() * 1;
    });
    $('.order').find('.price span').html(price);
}

var timer = [];
var amountChanging = 0;

function changeAmount(id, value, onchange) {
    if (timer[id] != undefined && timer[id] != null) {
        if (onchange != undefined) return;
        clearTimeout(timer[id]);
        timer[id] = null;
    }

    var price = $('#product-price-' + id).find('span').html() * 1;
    $('#product-all-price-' + id).find('span').html(price * value);
    recount();

    amountChanging ++;

    timer[id] = setTimeout(function() {
        $.ajax({
            url: '/products/change_cart_amount',
            type: 'POST',
            data: {id: id, amount: value},
            success: function() {amountChanging --; },
            error: function() {amountChanging --;}
        });
    }, 500);
}

function inputName() {
        $.ajax({
        success: function(cart) {
            alertify.alert('Поле Имя','Мы обратимся к Вам по Имени, указанному в данном поле.<br><br><b>Опционально:</b> Город, Адрес<br><br>Чтобы ускорить заказ, Вы можете указать в это поле любую дополнительную информацию, которую считаете важной.', function() {});
        },
        error: function() {
            alertify.notify('Произошла ошибка, попробуйте еще раз', 'error', 5);
        }
    });
}
function inputEmail() {
        $.ajax({
        success: function(cart) {
            alertify.alert('Поле E-mail','Мы отправим на E-mail всю информацию по заказу. <br><br>Заполняя E-mail<br>Вы сокращаете время на обработку заказа.<br><br>Обязательно нужно указать E-mail либо Телефон', function() {});
        },
        error: function() {
            alertify.notify('Произошла ошибка, попробуйте еще раз', 'error', 5);
        }
    });
}
function inputPhone() {
        $.ajax({
        success: function(cart) {
            alertify.alert('Поле Телефон','Мы позвоним Вам для подтверждения заказа. <br><br>Заполняя Телефон:<br>Вы сокращаете время на обработку заказа.<br><br>Обязательно нужно указать E-mail либо Телефон', function() {});
        },
        error: function() {
            alertify.notify('Произошла ошибка, попробуйте еще раз', 'error', 5);
        }
    });
}

function CheckOrderInfo() {
    console.log(amountChanging);

    var inputName = false;
    var inputEmail = false;
    var inputPhone = false;

    var name = $('#customer-name');
    if (name.val() == "") {
        name.addClass('has-error');
        name.one('keyup', function() {
            $(this).removeClass('has-error');
        });
        inputName = true;
    }

    var email = $('#customer-email');
    if (email.val() == "") {
        email.addClass('has-error');
        email.one('keyup', function() {
            $(this).removeClass('has-error');
        });
        inputEmail = true;
    }

    var phone = $('#customer-phone');
    if (phone.val() == "") {
        phone.addClass('has-error');
        phone.one('keyup', function() {
            $(this).removeClass('has-error');
        });
        inputPhone = true;
    }

    var amounts = false;
    $('.product .info .special-input input').each(function(i) {
        if ($(this).val() == "" || isNaN($(this).val()) || $(this).val() == 0) {
            $(this).addClass('has-error');
            $(this).one('keyup', function() {
                $(this).removeClass('has-error');
            });
            amounts = true;
        }
    })
    //var cart = JSON.parse(cart);
    //console.log(cart);
    //var availability = false;
    //for (var id in cart) {
    //            if (product.status == 2) { availability = true; }
    //        }
    //if (product.status == 2) { availability = false; }

    if ((inputName) || (inputEmail && inputPhone) || (inputName && inputEmail && inputPhone)) { alertify.notify('Введите Ваши данные<br><br>Телефон - Мы Вам позвоним<br>E-mail - Письмо о заказе', 'error', 5); return; }
    if (amounts) { alertify.notify('Заполните все поля с количеством товара или удалите ненужные товары из корзины', 'error', 5); return; }
    //if (availability) alertify.notify('Некоторые позиции не найдены в 1С, замените их, перепроверьте корзину', 'error', 5);
    //if (inputName || inputEmail || inputPhone || amounts) return;

    SendOrder(name.val(), phone.val(), email.val());
}

function GenerateOrder(name, phone, cart, email) {
        console.log('email-here', email);
        var dataToSend = {
                name: name,
                phone: phone,
                cart: cart,
                email: email
            };
        console.log('dataToSend:', dataToSend);
        $.ajax({
            url: window.api + '/orders/generate',
            type: 'POST',
            data: dataToSend,
            success: function(data) {
                data = JSON.parse(data);

                if (data.status == "ok") {

                    $('#customer-name-info').html(name);
                    $('#customer-phone-info').html(phone);

                    $('.order').find('.preloader').removeClass('fadeIn animated');
                    $('.order').find('.preloader').addClass('fadeOut animated');
                    $('.order').find('.order-info').removeClass('fadeOut animated');
                    $('.order').find('.order-info').addClass('fadeIn animated');
                    $('.order').find('.order-info').find('span').html(data.data);
                    //ClearCart(true);
                    $(window).scrollTo(0, 300);
                } else {
                    alertify.notify('Произошла ошибка, попробуйте еще раз', 'error', 5);
                    $('.order').find('.preloader').removeClass('fadeIn animated');
                    $('.order').find('.preloader').addClass('fadeOut animated');
                    $('.order').find('.customer-info').removeClass('fadeOut animated');
                    $('.order').find('.customer-info').addClass('fadeIn animated');
                }
            },
            error: function() {
                alertify.notify('Произошла ошибка, попробуйте еще раз', 'error', 5);
                $('.order').find('.preloader').removeClass('fadeIn animated');
                $('.order').find('.preloader').addClass('fadeOut animated');
                $('.order').find('.customer-info').removeClass('fadeOut animated');
                $('.order').find('.customer-info').addClass('fadeIn animated');
            }
        });
}

function SendOrder(name, phone, email) {
    $('.order').find('.preloader').removeClass('fadeOut animated');
    $('.order').find('.preloader').addClass('fadeIn animated');
    $('.order').find('.customer-info').removeClass('fadeIn animated');
    $('.order').find('.customer-info').addClass('fadeOut animated');

    $.ajax({
        url: '/products/get_cart',
        type: 'POST',
        data: {},
        success: function(cart) {
            GenerateOrder(name, phone, cart, email);
        },
        error: function() {
            alertify.notify('Произошла ошибка, попробуйте еще раз', 'error', 5);
            $('.order').find('.preloader').removeClass('fadeIn animated');
            $('.order').find('.preloader').addClass('fadeOut animated');
            $('.order').find('.customer-info').removeClass('fadeOut animated');
            $('.order').find('.customer-info').addClass('fadeIn animated');
        }
    });
}

function BestOffer() {
        $.ajax({
        success: function(cart) {
            alertify.alert('Нашли дешевле?','Вся продукция Victory Computers<br>В наличии, с учётом НДС, по актуальной цене<br><br>Если Вы нашли товар на тех же условиях дешевле чем в нашем магазине.<br>Мы сделаем спец предложение Вам и обязательно уценим данный товар для остальных клиентов.<br><br>Мы стараемся мониторить цены и давать лучшие предложения на всю продукцию. Пожалуйста дайте нам знать, если нашли дешевле.<br><br><br><b>Тел.: 380-77-89<br><b>E-mail:</b> <a href="mailto:sales@victory.kz">sales@victory.kz</a>', function() {});
        },
        error: function() {
            alertify.notify('Произошла ошибка, попробуйте еще раз', 'error', 5);
        }
    });
}

function SaveLink() {
    $.ajax({
        url: '/products/get_cart',
        type: 'POST',
        data: {},
        success: function(cart) {
            var cart = JSON.parse(cart);
            console.log(cart);
            var link = "http://victory.kz/products/solution?products=";
            for (var id in cart) {
                link += id + "-" + cart[id].amount + ",";
            }
            link = link.substr(0, link.length - 1);
            alertify.alert('Ссылка на корзину','Скопируйте данную ссылку и сохраните где Вам нужно:<br> <a href="'+ link + '">' + link + '</a>', function() {});
        },
        error: function() {
            alertify.notify('Произошла ошибка, попробуйте еще раз', 'error', 5);
        }
    });
}



$(document).ready(function() {
    $('#customer-phone').mask('+7(999)999-99-99');
});
