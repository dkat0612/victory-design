function LoadProduct(id) {

    $.ajax({
        url: window.api + '/products/product',
        type: 'POST',
        data: {
            id: id
        },
        async: window.asyncRequests,
        success: function(data) {
            //console.log(data);
            $('.preloader').addClass('fadeOut animated');
            $('.product').removeClass('hidden').addClass('fadeIn animated');
            data = JSON.parse(data);
            if (data.status == "ok") {
                var product = data.data.product;
                var carousel = $('#more-photos-carousel');
                carousel.find('.carousel-indicators').append('<li class = "active" data-target = "#more-photos-carousel" data-slide-to="0"></li>')
                carousel.find('.carousel-inner').append('<div class="item active"><img src = "/public/img/products/' + product.id +'.jpg"></div>');
                if (product.photos.length > 0) {
                    $('.more-photos').addClass('has-photos');
                    $('.more-photos').find('.photo-count').html(product.photos.length + 1);
                    for (var i in product.photos) {
                        carousel.find('.carousel-indicators')
                            .append('<li data-target = "#more-photos-carousel" data-slide-to="' + ((i*1) + 1) + '"></li>');
                        var item = $('<div class="item"></div>');
                        var img = $('<img src = "/public/img/products/' + product.photos[i].photo +'.jpg">');
                        item.append(img);
                        carousel.find('.carousel-inner').append(item);

                    }
                }

                $('.more-photos').click(function() {
                        $('#more-photos').removeClass('hidden');
                        $('#more-photos').removeClass('fadeOut animated');
                        $('#more-photos').addClass('fadeIn animated');
                    });

                $('#more-photos').find('.more-photos-close').click(function(e) {
                        $('#more-photos').removeClass('fadeIn animated');
                        $('#more-photos').addClass('fadeOut animated');
                        setTimeout(function() {
                            $('#more-photos').addClass('hidden');
                        }, 500);
                });
                $('body').unbind('keyup');
                $('body').keyup(function(e) {
                    if (e.keyCode == 27) {
                        $('#more-photos').removeClass('fadeIn animated');
                        $('#more-photos').addClass('fadeOut animated');
                        setTimeout(function() {
                            $('#more-photos').addClass('hidden');
                        }, 500);
                    } else if (e.keyCode == 37) {
                        $('a.left[href="#more-photos-carousel"]').trigger('click');
                    } else if (e.keyCode == 39) {
                        $('a.right[href="#more-photos-carousel"]').trigger('click');
                    }
                });

                $('.product-title h1').html(product.name);

                var productWarranty = 'Гарантия: '+ product.warranty + ' ' + product.warranty_period;
                if (product.warranty == 0) productWarranty = "";
                else if (product.warranty == 2 && product.warranty_period == "Месяц") productWarranty = "Гарантия: 2 Месяца";
                else if (product.warranty == 2 && product.warranty_period == "Год") productWarranty = "Гарантия: 2 Года";
                else if (product.warranty == 3 && product.warranty_period == "Месяц") productWarranty = "Гарантия: 3 Месяца";
                else if (product.warranty == 3 && product.warranty_period == "Год") productWarranty = "Гарантия: 3 Года";
                else if (product.warranty == 4 && product.warranty_period == "Месяц") productWarranty = "Гарантия: 4 Месяца";
                else if (product.warranty == 4 && product.warranty_period == "Год") productWarranty = "Гарантия: 4 Года";
                else if (product.warranty == 5 && product.warranty_period == "Месяц") productWarranty = "Гарантия: 5 Месяцев";
                else if (product.warranty == 5 && product.warranty_period == "Год") productWarranty = "Гарантия: 5 Лет";
                else if (product.warranty == 6 && product.warranty_period == "Месяц") productWarranty = "Гарантия: 6 Месяцев";
                else if (product.warranty == 6 && product.warranty_period == "Год") productWarranty = "Гарантия: 6 Лет";
                else if (product.warranty == 7 && product.warranty_period == "Месяц") productWarranty = "Гарантия: 7 Месяцев";
                else if (product.warranty == 7 && product.warranty_period == "Год") productWarranty = "Гарантия: 7 Лет";
                else if (product.warranty == 10 && product.warranty_period == "Год") productWarranty = "Гарантия: 10 Лет";
                else if (product.warranty == 11 && product.warranty_period == "Год") productWarranty = "Гарантия: 11 Лет";
                else if (product.warranty == 1 && product.warranty_period == "xxx") productWarranty = '1 Год +';
                else productWarranty = 'Гарантия: '+ product.warranty + ' ' + product.warranty_period;

                var productAmount;
                if (product.status == 5) productAmount = "| * |";
                else if (product.amount <= 0) productAmount = "";
                else if (product.amount > 0 && product.amount <= 5) productAmount = "| * |";
                else if (product.amount > 5 && product.amount <= 15) productAmount = "| ** |";
                else if (product.amount > 15) productAmount = "| *** |";
                else productAmount = "| Что-то не так |";

                $('.product-title').append(
                    "<h3><span>Код товара: " + product.id + "</span>" +
                    '<span class="amount-status ' + ((product.amount <= 0)? (product.status == 3)?'del':''):'exist')
                    + '">' + ((product.amount <= 0)? ((product.status == 3)?'Удалён':'Резерв'):'В наличии') + '</span><span>'+ productAmount +'</span><span> ' + productWarranty + '</h3>');

                $('.product-info .image img').attr('src', '/public/img/products/' + product.id + ".jpg").click(function() {
                    $('.more-photos').trigger('click');
                });
                $('.description').prepend(product.description);
                $('.description').find('td').each(function() {
                    $(this).removeAttr('width');
                    $(this).removeAttr('height');
                    $(this).removeAttr('style');
                });
                $('.description').find('tr').each(function() {
                    $(this).removeAttr('width');
                    $(this).removeAttr('height');
                    $(this).removeAttr('style');
                });
                $('.description').find('table').each(function() {
                    $(this).removeAttr('style');
                    $(this).addClass('product-description-table table table-bordered table-stripped');
                });

                var WorkingSmall_description = "Код производителя и ссылка на сайт производителя:<h2><b><a target='_blank' href='" + product.link +"'>" + product.vendor_code + "</a></b></h2>";
                if (product.vendor_code.length != 0) WorkingSmall_description = "Код и ссылка на сайт производителя:<h2><b><a target='_blank' href='" + product.link +"'>" + product.vendor_code + "</a></b></h2>";
                else WorkingSmall_description = "";

                $('.description').prepend(WorkingSmall_description + "Название: <h2><b>" + product.price_name + "</b></h2><p>Описание:</p>");

                $('.small-description').find('.card').append(product.small_description);
                $('.price').append(window.formatPrice(product.price) + " тг");

                var productStatus = $('.status');
                if (product.type == 0) productStatus.addClass('hidden');
                if (product.type == 1) productStatus.html('Снижение Цены').addClass('green');
                if (product.type == 2) productStatus.html('Новый товар').addClass('green');
                if (product.type == 3) productStatus.html('Выгодное предложение').addClass('wide');
                if (product.type == 4) productStatus.html('ХИТ продаж').addClass('green');
                if (product.type == 5) productStatus.html('Распродажа').addClass('blue');
                if (product.type == 6) productStatus.html('+ подарок!').addClass('wide');

                var path = data.data.path;
                for (var i in path) {
                    var item = path[i];
                    $('#breadcrumb').append('<li><a href = "/category/show/' + item.id + '">' + item.title + '</a></li>');
                }
                $('#breadcrumb').append('<li class = "active">' + product.name + '</li>');
            }

        },
        error: function() {
            alert(error);
        }
    });

}
