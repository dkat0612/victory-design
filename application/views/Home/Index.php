<link rel="stylesheet" href="/public/css/pages/info/index.min.css">
<link rel="stylesheet" href="/public/css/pages/products/show.min.css?<?=time(0)?>">
<div class="main-content">
    <div style="margin-bottom: 15px;">
        <?php echo View::factory('Helpers/Slider');?>
    </div>
    <div class="info">
        <div id="container">
            <div><a ui-sref="products"><img class="container_image" src="/uploads/images/Все_товары.jpg"></a><br><a class="btext" ui-sref="products">Все товары</a></div>
            <div>
                <a ui-sref="category.show.param({id:33})"><img class="container_image" src="/uploads/images/Готовые_решения.jpg"></a><br>
                <a class="btext" ui-sref="category.show.param({id:33})">Готовые решения</a>
            </div>
            <div>
                <a ui-sref="category.show.param({id:27})"><img class="container_image" src="/uploads/images/Периферия.jpg"></a><br>
                <a class="btext" ui-sref="category.show.param({id:27})">Периферия</a>
            </div>
            <div>
                <a ui-sref="category.show.param({id:14})"><img class="container_image" src="/uploads/images/Модемы.jpg"></a><br>
                <a class="btext" ui-sref="category.show.param({id:14})">Модемы</a>
            </div>
        </div>
        <div id="container">
            <div>
                <a ui-sref="category.show.param({id:3})"><img class="container_image" src="/uploads/images/Процессоры.jpg"></a><br>
                <a class="btext" ui-sref="category.show.param({id:3})">Процессоры</a>
            </div>
            <div>
                <a ui-sref="category.show.param({id:4})"><img class="container_image" src="/uploads/images/Видеокарты.jpg"></a><br>
                <a class="btext" ui-sref="category.show.param({id:4})">Видеокарты</a>
            </div>
            <div>
                <a ui-sref="category.show.param({id:2})"><img class="container_image" src="/uploads/images/Системные_платы.jpg"></a><br>
                <a class="btext" ui-sref="category.show.param({id:2})">Системные платы</a>
            </div>
            <div>
                <a ui-sref="category.show.param({id:6})"><img class="container_image" src="/uploads/images/HDD_SSD.jpg"></a><br>
                <a class="btext" ui-sref="category.show.param({id:6})">HDD / SSD</a>
            </div>
        </div>
        <div id="container">
            <div>
                <a ui-sref="category.show.param({id:5})"><img class="container_image" src="/uploads/images/ОЗУ.jpg"></a><br>
                <a class="btext" ui-sref="category.show.param({id:5})">ОЗУ</a>
            </div>
            <div>
                <a ui-sref="category.show.param({id:24})"><img class="container_image" src="/uploads/images/Блоки_питания.jpg"></a><br>
                <a class="btext" ui-sref="category.show.param({id:24})">Блоки питания</a>
            </div>
            <div>
                <a ui-sref="category.show.param({id:1})"><img class="container_image" src="/uploads/images/Корпуса.jpg"></a><br>
                <a class="btext" ui-sref="category.show.param({id:1})">Корпуса</a>
            </div>
            <div>
                <a ui-sref="category.show.param({id:10})"><img class="container_image" src="/uploads/images/Мониторы.jpg"></a><br>
                <a class="btext" ui-sref="category.show.param({id:10})">Мониторы</a>
            </div>
        </div>
        <h1>Хит продаж:</h1><br>
        <?php
        $product_1 = Model::factory('Products') -> get_product(28208); $product_1_name = "Fan Intel AFOX";
        $product_2 = Model::factory('Products') -> get_product(28097); $product_2_name = "H110 DDR4 AFOX";
        $product_3 = Model::factory('Products') -> get_product(28098); $product_3_name = "1GB GT210 AFOX";
        $product_4 = Model::factory('Products') -> get_product(27906); $product_4_name = "Мышь Crown CMM-100";
        $product_5 = Model::factory('Products') -> get_product(27588); $product_5_name = "HDD 500GB NEW";
        $product_6 = Model::factory('Products') -> get_product(27800); $product_6_name = "G4560 oem";
        $product_7 = Model::factory('Products') -> get_product(28109); $product_7_name = "i3-8100 oem";
        $product_8 = Model::factory('Products') -> get_product(27777); $product_8_name = "i7-7700K oem";
        ?>
        <div id="container_product">
            <div>
                <a ui-sref="products.show({id:'<?=$product_1['id']?>'})">
                    <img class="container_p_image" src="/public/img/products/<?=$product_1['id']?>.jpg" />
                </a><br>
                <?=$product_1_name?><br>
                Цена: <?=$product_1['price']?> тг.<br>
                <?=($product_1['amount'] <= 0)? 'Ожидаем': '<text style="color: #61cf80;">В наличии</text>';?><br>
                <a ui-sref="products.show({id:'<?=$product_1['id']?>'})" class="btn button-primary">Подробней</a>
            </div>
            <div>
                <a ui-sref="products.show({id:'<?=$product_2['id']?>'})">
                    <img class="container_p_image" src="/public/img/products/<?=$product_2['id']?>.jpg" />
                </a><br>
                <?=$product_2_name?><br>
                Цена: <?=$product_2['price']?> тг.<br>
                <?=($product_2['amount'] <= 0)? 'Ожидаем': '<text style="color: #61cf80;">В наличии</text>';?><br>
                <a ui-sref="products.show({id:'<?=$product_2['id']?>'})" class="btn button-primary">Подробней</a>
            </div>
            <div>
                <a ui-sref="products.show({id:'<?=$product_3['id']?>'})">
                    <img class="container_p_image" src="/public/img/products/<?=$product_3['id']?>.jpg" />
                </a><br>
                <?=$product_3_name?><br>
                Цена: <?=$product_3['price']?> тг.<br>
                <?=($product_3['amount'] <= 0)? 'Ожидаем': '<text style="color: #61cf80;">В наличии</text>';?><br>
                <a ui-sref="products.show({id:'<?=$product_3['id']?>'})" class="btn button-primary">Подробней</a>
            </div>
            <div>
                <a ui-sref="products.show({id:'<?=$product_4['id']?>'})">
                    <img class="container_p_image" src="/public/img/products/<?=$product_4['id']?>.jpg" />
                </a><br>
                <?=$product_4_name?><br>
                Цена: <?=$product_4['price']?> тг.<br>
                <?=($product_4['amount'] <= 0)? 'Ожидаем': '<text style="color: #61cf80;">В наличии</text>';?><br>
                <a ui-sref="products.show({id:'<?=$product_4['id']?>'})" class="btn button-primary">Подробней</a>
            </div>
        </div>
        <div id="container_product">
            <div>
                <a ui-sref="products.show({id:'<?=$product_5['id']?>'})">
                    <img class="container_p_image" src="/public/img/products/<?=$product_5['id']?>.jpg" />
                </a><br>
                <?=$product_5_name?><br>
                Цена: <?=$product_5['price']?> тг.<br>
                <?=($product_5['amount'] <= 0)? 'Ожидаем': '<text style="color: #61cf80;">В наличии</text>';?><br>
                <a ui-sref="products.show({id:'<?=$product_5['id']?>'})" class="btn button-primary">Подробней</a>
            </div>
            <div>
                <a ui-sref="products.show({id:'<?=$product_6['id']?>'})">
                    <img class="container_p_image" src="/public/img/products/<?=$product_6['id']?>.jpg" />
                </a><br>
                <?=$product_6_name?><br>
                Цена: <?=$product_6['price']?> тг.<br>
                <?=($product_6['amount'] <= 0)? 'Ожидаем': '<text style="color: #61cf80;">В наличии</text>';?><br>
                <a ui-sref="products.show({id:'<?=$product_6['id']?>'})" class="btn button-primary">Подробней</a>
            </div>
            <div>
                <a ui-sref="products.show({id:'<?=$product_7['id']?>'})">
                    <img class="container_p_image" src="/public/img/products/<?=$product_7['id']?>.jpg" />
                </a><br>
                <?=$product_7_name?><br>
                Цена: <?=$product_7['price']?> тг.<br>
                <?=($product_7['amount'] <= 0)? 'Ожидаем': '<text style="color: #61cf80;">В наличии</text>';?><br>
                <a ui-sref="products.show({id:'<?=$product_7['id']?>'})" class="btn button-primary">Подробней</a>
            </div>
            <div>
                <a ui-sref="products.show({id:'<?=$product_8['id']?>'})">
                    <img class="container_p_image" src="/public/img/products/<?=$product_8['id']?>.jpg" />
                </a><br>
                <?=$product_8_name?><br>
                Цена: <?=$product_8['price']?> тг.<br>
                <?=($product_8['amount'] <= 0)? 'Ожидаем': '<text style="color: #61cf80;">В наличии</text>';?><br>
                <a ui-sref="products.show({id:'<?=$product_8['id']?>'})" class="btn button-primary">Подробней</a>
            </div>
        </div>
    </div>
</div>
<script>
    window.slider.show();
</script>
<?=View::factory('Templates/TDKscript') -> set('title', $page_title) -> set('description', $page_description) -> set('keywords', $page_keywords); ?>
