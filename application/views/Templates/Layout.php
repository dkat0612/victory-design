<!DOCTYPE html>
<html lang="ru">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="utf-8">
        <title><?=(isset($pageTitle)?$pageTitle:'Victory')?></title>
        <meta name="description" content="<?=(isset($pageDescription))?$pageDescription:'Нужно обратиться в Google webmasters victory.kz'?>">
        <meta name="keywords" content="<?=(isset($pageKeywords))?$pageKeywords:'Нужно обратиться в Google webmasters victory.kz'?>">
        <?=View::factory('Templates/Head');?>
	</head>
	<body>
        <div class="container">
            <header>
                <div class="logo">
                   <a href="/" style="text-decoration: none; display: inline-block;">
                        <div class="image">
                            <img src="/public/img/logo.png" alt="" style="z-index: 1;">
                        </div>
                        <div class="logo-text">
                            <span class="style-1">VICTORY&nbsp;</span><br>
                            <span class="style-2">COMPUTERS</span>
                        </div>
                    </a>
                    <div class="site-time">
                    <?
                        //date_default_timezone_set('Asia/Almaty');
                        //$date = date('m/d/Y h:i:s a', time());
                        //$WorkDate = strtotime(date("H:i:s"));
                        //$DateBegin = strtotime("08:30:00");
                       //$DateEnd = strtotime("17:30:00");

                        //$CurrentDay = date('j');
                        //$WorkingDays = array(30 => false, 1 => false, 2 => false, 7 => false, 8 => false, 9 => false, 10 => false, 14 => false, 15 => false, 21 => false, 22 => false, 28 => false);

                        //if($WorkDate > $DateBegin && $WorkDate < $DateEnd && Arr::get($WorkingDays, $CurrentDay, true)) {
                          // echo
                                "Цены:&nbsp;&nbsp;<span class='on-line'>Актуальные</span><br>
                                Товар: <span class='on-line'>В наличии</span><br>
                                Интернет-магазин: <span class='on-line'>работает</span><br>
                                Менеджеры: <span class='on-line'>online</span><br>
                                Сегодня мы работаем с 8:30 до <b>17:30</b> <span class='online'>(Без перерыва)</span><br>";
                        //}
                        //else {
                            echo
                                "Не рабочие дни: <a target='_blank' href='http://egov.kz/cms/ru/articles/employment/holidays_calend'>Согласно egov.kz</a><br>
                                Цены на сайте: <span class='on-line'>Актуальные</span><br>
                                Интернет-магазин: <span class='on-line'>Принимает заказы</span><br>
                                Все заявки обрабатываются в <a href='static/contacts'>рабочее время</a>.<br>
                                <b>+7 (727) 380-77-89</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='http://go.2gis.com/iwoqe' target='_blank'>Мы в 2gis</a><br>
                                E-mail: <a href='mailto:sales@victory.kz'>sales@victory.kz</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='https://yandex.ru/maps/-/CVXonDM8' target='_blank'>Мы в yandex maps</a>";
                        //}
                    ?>
                    </div>
                    <a href="/public/files/retail_price.xlsx" alt="Скачать прайслист" class = "pricelist-link"><i class="fa fa-download fa-fw"></i>Скачать прайслист</a>
                    <a href="/public/files/Готовые компьютеры.pdf" alt="Готовые компьютеры" target="_blank" class="VC-link"><i class="fa fa-download fa-fw"></i>Готовые компьютеры</a>
                </div>
                <div class="menu">
                    <ul class="main-menu" id = "nav-units">
                        <li><a href="/" id = "nav-unit-0">Новости</a></li>
                        <li><a href="/products" id = "nav-unit-1">Товары</a></li>
                        <li><a href="/contacts" id = "nav-unit-2">Контакты</a></li>
                        <li><a href="/help" id = "nav-unit-3">Как купить</a></li>
                        <li><a href="/about" id = "nav-unit-4">О нас</a></li>
                        <li><a href="/warranty" id = "nav-unit-5">Гарантия</a></li>
                        <li><a href="/buildpc" id = "nav-unit-5">Сборка ПК</a></li>
                    </ul>
                </div>
                <?php $cart = json_decode(Cookie::get('shopping_cart', '[]'), TRUE);?>
                <div class="cart <?php if (count($cart) == 0) { ?>hidden<?php } ?>">
                    <div class="shopping-cart" data-spy = "affix" data-offset-top = "210">
                        <div class="info">
                            У вас в корзине <span><?=count($cart);?></span>
                            <?php
                                if (count($cart) < 10 || count($cart) % 100 > 20) {
                                    switch(count($cart) % 10) {
                                        case 1: echo "товар"; break;
                                        case 2: echo "товара"; break;
                                        case 3: echo "товара"; break;
                                        case 4: echo "товара"; break;
                                        case 5: echo "товара"; break;
                                        case 6: echo "товаров"; break;
                                        default: echo "товаров"; break;
                                    }
                                } else echo "товаров";
                            ?>
                        </div><div class="actions">

                            <a href="/products/cart" class="btn button-success">
                                <i class="fa fa-shopping-cart fa-fw"></i>
                                Посмотреть заказ
                            </a>
                            <button class="btn button-danger" onclick="ClearCart()">
                                <i class="fa fa-times fa-fw"></i>
                                Очистить корзину
                            </button>
                        </div>
                    </div>
                </div>


            </header>
            <div>
                <?=(isset($content))?$content:''?>
            </div>
            <footer>
                <!--<div class="footer-section">
                    <ul class="footer-menu">
                         <li><a href="/public/files/Acorp_W422G.pdf">Настройка Acorp W422G</a></li>
                    </ul>
                </div>-->
                <div class="copyright_block">
                   <div class="copyright">
                    <i class="fa fa-copyright fa-fw"></i><b>Victory Computers</b> 1992-<?=date('Y') + 1?>
                    </div>
                    <div class="zero">
                        <!-- ZERO.kz -->
                        <span id="_zero_65428" class="zero">
                            <noscript>
                            <a href="http://zero.kz/?s=65428" target="_blank">
                                <img src="http://c.zero.kz/z.png?u=65428" width="88" height="31" alt="ZERO.kz" />
                            </a>
                            </noscript>
                        </span>
                        <!-- End ZERO.kz -->
                    </div>
                </div>
            </footer>
        </div>
        <?=View::factory('/Templates/Scripts')?>
	</body>
</html>
