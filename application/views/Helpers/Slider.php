<div class="slider-banner" id = "main-slider">

<div id="carousel-example-generic" class="carousel slide" data-ride="carousel" data-interval="5000" data-pause="hover">
    <ol class="carousel-indicators">
        <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
        <li data-target="#carousel-example-generic" data-slide-to="1"></li>
        <li data-target="#carousel-example-generic" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner" role="listbox">

<div class="item active">
    <div class="carousel-caption-no-image">
        <h3>Мы это 26 лет успешной работы на рынке Казахстана!</h3>
        Мы сегодня:
        <ul>
            <li>Официальный дистрибьютор продукции SAPPHIRE, Inno3D, MSI, Apacer, AFOX, Leven, J&A, в Казахстане.</li>
            <li>Прямой поставщик продукции Intel, PALIT, GAMEMAX, Kingston, Transcend,  Seagate, Toshiba, Zeppelin на территорию Казахстана.</li>
            <li>Авторизованный ресселер продукции ASUS, ASRock, Gigabyte, SVC, ZyXEL.</li>
            <li>За нами закреплено прямое дистрибьюторство на: ASUS, Dintek, KMEX, Acorp</li>
        </ul>
        <ul>
            <li class = "button">
                <a ui-sref="products" class = "btn button-success">Перейти к товарам</a>
            </li>
        </ul>
    </div>
</div>

<div class="item">
    <div class="carousel-caption-no-image">
        <h3>Мы это низкие цены на готовые решения!</h3>
        <ul>
            <li>Являясь прямыми поставщиками видеокарт, материнских плат, процессоров и памяти.</li>
            <li>Мы предоставляем готовые решения от начального сегмента до игрового по самым доступным ценам.</li>
            <li>В день мы собираем до 100 компьютеров и осуществляем профессиональную cборку ПК.</li>
            <li>Надёжные поставки во все регионы Казахстана.</li>
        </ul>
            <b>Нашли готовые решения дешевле? Мы дадим цену лучше!</b>
        <ul>
            <li class = "button">
                <a ui-sref="category.show.param({id:33})" class="btn button-success">Готовые решения</a>
            </li>
        </ul>
    </div>
</div>

<div class="item">
    <div class="carousel-caption-no-image">
       <?php
        $product_1 = Model::factory('Products') -> get_product(27794);
        $product_2 = Model::factory('Products') -> get_product(27440);
        $product_3 = Model::factory('Products') -> get_product(27532);
        $product_4 = Model::factory('Products') -> get_product(27368);
        $product_5 = Model::factory('Products') -> get_product(27593);
       ?>
        <h3>Выгодно!</h3>
        <ul>
            <li>
                <a ui-sref="products.show({id:'<?=$product_1['id']?>'})">
                    <?=$product_1['name']?>
                </a>&nbsp;<?=($product_1['amount'] <= 0)? 'Ожидаем': '<text style="color: #61cf80;">В наличии</text>';?> Цена: <?=$product_1['price']?> тг.
            </li>
            <li>
                <a ui-sref="products.show({id:'<?=$product_2['id']?>'})"><?=$product_2['name']?></a>
                &nbsp;<?=($product_2['amount'] <= 0)? 'Ожидаем': '<text style="color: #61cf80;">В наличии</text>';?> Цена: <?=$product_2['price']?> тг.
            </li>
            <li>
                <a ui-sref="products.show({id:'<?=$product_3['id']?>'})">
                    <?=$product_3['name']?>
                </a>
                &nbsp;<?=($product_3['amount'] <= 0)? 'Ожидаем': '<text style="color: #61cf80;">В наличии</text>';?> Цена: <?=$product_3['price']?> тг.
            </li>
            <li>
                <a ui-sref="products.show({id:'<?=$product_4['id']?>'})">
                    <?=$product_4['name']?>
                </a>
                &nbsp;<?=($product_4['amount'] <= 0)? 'Ожидаем': '<text style="color: #61cf80;">В наличии</text>';?> Цена: <?=$product_4['price']?> тг.
            </li>
            <li>
                <a ui-sref="products.show({id:'<?=$product_5['id']?>'})">
                    <?=$product_5['name']?>
                </a>
                &nbsp;<?=($product_5['amount'] <= 0)? 'Ожидаем': '<text style="color: #61cf80;">В наличии</text>';?> Цена: <?=$product_5['price']?> тг.
            </li>
        </ul>
    </div>
</div>

    </div>
</div>
</div>
<script>
    window.slider = {
        el: $('#main-slider'),
        hide: function() {
            this.el.addClass('hidden');
        },
        show: function() {
            this.el.removeClass('hidden');
        }
    }
</script>
