<link rel="stylesheet" href="/public/css/pages/products/show.min.css?<?=time(0)?>">
<div class="main-content">
    <div class="product">
        <ol class="breadcrumb" id="breadcrumb">
            <?php foreach($path as $item) { ?>
            <li><a href="/category/show/<?=$item['id']?>"><?=$item['title']?></a></li>
            <?php } ?>
            <li><?=$product['name']?></li>
        </ol>
        <div class="product-title">
            <h1><?=$product['name']?></h1>
            <h3>
                <?php if (($product['amount'] <= 0)? ($x='':$x='exist')?>
                <?php if (($product['amount'] <= 0)? (($product['status'] == 3)?$z='Удалён':$z='Резерв'):$z='В наличии')?>
                <?php
                $productAmount;
                if ($product['status'] == 5) $productAmount = "| * |";
                else if ($product['amount'] <= 0) $productAmount = "";
                else if ($product['amount'] > 0 && $product['amount'] <= 5) $productAmount = "| * |";
                else if ($product['amount'] > 5 && $product['amount'] <= 15) $productAmount = "| ** |";
                else if ($product['amount'] > 15) $productAmount = "| *** |";
                else $productAmount = "| Что-то не так |";
                ?>
                <span>Код товара: <?=$product['id']?></span>
                <span class="amount-status <?=$x?>"><?=$z?></span>
                <span><?=$productAmount?></span>
                <?php
                $Wperiod = $product['warranty_period'];
                $W = $product['warranty'];
                if ($product['warranty'] == 0) $productWarranty = "";
                else if ($product['warranty'] == 2 && $product['warranty_period'] == "Месяц") $productWarranty = "Гарантия: 2 Месяца";
                else if ($product['warranty'] == 2 && $product['warranty_period'] == "Год") $productWarranty = "Гарантия: 2 Года";
                else if ($product['warranty'] == 3 && $product['warranty_period'] == "Месяц") $productWarranty = "Гарантия: 3 Месяца";
                else if ($product['warranty'] == 3 && $product['warranty_period'] == "Год") $productWarranty = "Гарантия: 3 Года";
                else if ($product['warranty'] == 4 && $product['warranty_period'] == "Месяц") $productWarranty = "Гарантия: 4 Месяца";
                else if ($product['warranty'] == 4 && $product['warranty_period'] == "Год") $productWarranty = "Гарантия: 4 Года";
                else if ($product['warranty'] == 5 && $product['warranty_period'] == "Месяц") $productWarranty = "Гарантия: 5 Месяцев";
                else if ($product['warranty'] == 5 && $product['warranty_period'] == "Год") $productWarranty = "Гарантия: 5 Лет";
                else if ($product['warranty'] == 6 && $product['warranty_period'] == "Месяц") $productWarranty = "Гарантия: 6 Месяцев";
                else if ($product['warranty'] == 6 && $product['warranty_period'] == "Год") $productWarranty = "Гарантия: 6 Лет";
                else if ($product['warranty'] == 7 && $product['warranty_period'] == "Месяц") $productWarranty = "Гарантия: 7 Месяцев";
                else if ($product['warranty'] == 7 && $product['warranty_period'] == "Год") $productWarranty = "Гарантия: 7 Лет";
                else if ($product['warranty'] == 10 && $product['warranty_period'] == "Год") $productWarranty = "Гарантия: 10 Лет";
                else if ($product['warranty'] == 11 && $product['warranty_period'] == "Год") $productWarranty = "Гарантия: 11 Лет";
                else $productWarranty = "Гарантия: $W $Wperiod";
                ?>
                <span><?=$productWarranty?></span>
            </h3>
        </div>
        <div class="product-info">
            <div class="info">
                <div class="image">
                    <img class="product-photo" alt="<?=$product['price_name']?>" src="http://victory.kz/public/img/products/<?=$product['id'];?>.jpg">
                    <?php
                $productStatus = "";
                if ($product['type'] == 0) $productStatusClass = "hidden";
                if ($product['type'] == 1) { $productStatusClass = "green"; $productStatus = "Снижение Цены"; }
                if ($product['type'] == 2) { $productStatusClass = "green"; $productStatus = "Новый товар"; }
                if ($product['type'] == 3) { $productStatusClass = "wide"; $productStatus = "Выгодное предложение"; }
                if ($product['type'] == 4) { $productStatusClass = "green"; $productStatus = "Хит продаж"; }
                if ($product['type'] == 5) { $productStatusClass = "blue"; $productStatus = "Распродажа"; }
                if ($product['type'] == 6) { $productStatusClass = "wide"; $productStatus = "+ подарок!"; }
                    ?>
                    <span class="status <?=$productStatusClass?>">


                        <?=$productStatus?>


                    </span>
                    <div class="more-photos <?=(count($product['photos']) > 0)?'has-photos':''?>">
                        <span class="glyphicon glyphicon-camera"></span>
                        <span class="photo-count"><?=count($product['photos']) + 1; ?></span>
                    </div>
                </div>
            </div>



        </div><div class="small-description">
            <div class="card">
                <?=$product['small_description']?>
            </div>

        </div>
        <div class="product-actions">
            <div class="price">
                Цена: <?=$product['price'];?>
            </div>
            <div class="actions">
                <button class="btn button-success" onclick="<?=(substr_count($product['id'], 'W') == 0)?'AddToCart('.$product['id'].', $(\'#product-count\').val())':'window.location.assign($(\'#cartLink\').attr(\'href\'))'?>">
                    <i class="fa fa-shopping-cart fa-fw"></i> В корзину
                </button>
            </div>
        </div>

        <div class="description">
           <?= $WorkingSmall_description = ""; if (!empty($product['vendor_code'])) { $WorkingSmall_description = "Код и ссылка на сайт производителя:<h2><b><a target='_blank' href='".$product['link']."'>".$product['vendor_code']."</a></b></h2>"; } else $WorkingSmall_description = ""; ?>
            <?=$WorkingSmall_description?>
            Название:
            <h2><b><?=$product['price_name']?></b></h2>
            Описание:
            <p>
                <?=$product['description']?>
            </p>
            <div class="warning">
                Информация о товарах, их характеристиках и комплектации может содержать ошибки. Также может быть изменена производителем без предварительного уведомления. Пожалуйста, уточняйте существенные для Вас характеристики и компоненты комплектации товаров при покупке. Не соответствие товара по описанию не может быть основанием для предъявления каких-либо претензий.
            </div>
        </div>
    </div>
    <div class="more-photos-content hidden fadeOut animated" id="more-photos">
        <div class="more-photos-overlay">
            <a class="more-photos-close"><i class="fa fa-times fa-fw"></i></a>
            <div class="photos">
                <div id="more-photos-carousel" class="carousel slide" data-ride="carousel" data-interval="false">
                    <ol class="carousel-indicators">
                        <li class="active" data-target="#more-photos-carousel" data-slide-to="0"></li>
                        <?php foreach($product['photos'] as $key => $photo) { ?>
                        <li data-target="#more-photos-carousel" data-slide-to="<?=$key + 1; ?>"></li>
                        <?php } ?>

                    </ol>

                    <div class="carousel-inner" role="listbox">
                        <div class="item active">
                            <img src="/public/img/products/<?=$product['id'];?>.jpg">
                        </div>
                        <?php foreach($product['photos'] as $photo) { ?>
                        <div class="item">
                            <img src="/public/img/products/<?=$photo['photo'];?>.jpg">
                        </div>
                        <?php } ?>
                    </div>
                    <a class="left carousel-control" href="#more-photos-carousel" role="button" data-slide="prev">
                        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="right carousel-control" href="#more-photos-carousel" role="button" data-slide="next">
                        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="/public/js/pages/products/show.js"></script>
<script>
    $('.more-photos').click(function () {
        $('#more-photos').removeClass('hidden');
        $('#more-photos').removeClass('fadeOut animated');
        $('#more-photos').addClass('fadeIn animated');
    });

    $('#more-photos').find('.more-photos-close').click(function (e) {
        $('#more-photos').removeClass('fadeIn animated');
        $('#more-photos').addClass('fadeOut animated');
        setTimeout(function () {
            $('#more-photos').addClass('hidden');
        }, 500);
    });
    $('body').unbind('keyup');
    $('body').keyup(function (e) {
        if (e.keyCode == 27) {
            $('#more-photos').removeClass('fadeIn animated');
            $('#more-photos').addClass('fadeOut animated');
            setTimeout(function () {
                $('#more-photos').addClass('hidden');
            }, 500);
        } else if (e.keyCode == 37) {
            $('a.left[href="#more-photos-carousel"]').trigger('click');
        } else if (e.keyCode == 39) {
            $('a.right[href="#more-photos-carousel"]').trigger('click');
        }
    });
    $('.description').find('td').each(function () {
        $(this).removeAttr('width');
        $(this).removeAttr('height');
        $(this).removeAttr('style');
    });
    $('.description').find('tr').each(function () {
        $(this).removeAttr('width');
        $(this).removeAttr('height');
        $(this).removeAttr('style');
    });
    $('.description').find('table').each(function () {
        $(this).removeAttr('style');
        $(this).addClass('product-description-table table table-bordered table-stripped');
    });
    $('.product-info .image img').click(function () {
        $('.more-photos').trigger('click');
    });
</script>
