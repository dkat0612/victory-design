<!DOCTYPE html>
<html lang="ru">
	<head>
        <!--<base href="/navigation/" />-->
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="utf-8">
        <title>Victory Computers</title>
        <meta name="description" content="Нужно обратиться в Google webmasters victory.kz">
        <meta name="keywords" content="Нужно обратиться в Google webmasters victory.kz">
        <meta http-equiv="cache-control" content="max-age=1800" />
        <?php $date = date('r', time() + 1800);?>
        <meta http-equiv="Expires" content="<?=$date?>" />
        <base href="/">

		<!-- =========================
		 FAV AND TOUCH ICONS
		============================== -->
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
        <link rel="icon" href="/favicon.ico" type="image/x-icon">
        <link rel="SHORTCUT ICON" href="/favicon.ico">
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
        <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/manifest.json">
        <meta name="msapplication-TileColor" content="#ffffff">
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
        <meta name="theme-color" content="#ffffff">
		<!-- =========================
			 STYLESHEETS
		============================== -->
		<link rel="stylesheet" href="/public/css/bootstrap.min.css">
		<link rel="stylesheet" href="/public/css/animate.min.css">

		<link rel="stylesheet" href="/public/css/responsive.css">
        <script src="https://use.fontawesome.com/e028c0d776.js"></script>

		<link rel="stylesheet" href="/public/css/alertify.min.css">
		<link rel="stylesheet" href="/public/css/themes/default.css">
		<link rel="stylesheet" href="/public/css/inputs.min.css">

		<link rel="stylesheet" href="/public/css/style.min.css?<?=time()?>">
        <link rel="stylesheet" href="/public/css/rzslider.min.css"/>
        <!--<link rel="stylesheet" href="/public/css/pages/all/cart.min.css?<?=time()?>">-->

		<!--[if lt IE 9]>
            <script src="js/html5shiv.js"></script>
            <script src="js/respond.min.js"></script>
        <![endif]-->

		<script src="/public/js/jquery.min.js"></script>
		<script src="/public/js/jquery-migrate-1.2.1.js"></script>
		<script src="/public/js/jquery.scrollTo.js"></script>
        <link rel="stylesheet" href="/public/app/app.styles.min.css"/>

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
                                "Цены:&nbsp;&nbsp;<span class='on-line'>актуальные</span><br>
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
                <a href="/public/files/retail_price.xlsx" alt="Скачать прайслист" class="pricelist-link" target="_blank"><i class="fa fa-download fa-fw"></i>Скачать прайслист</a>
                <a href="/public/files/Готовые компьютеры.pdf" alt="Готовые компьютеры" target="_blank" class="VC-link"><i class="fa fa-download fa-fw"></i>Готовые компьютеры</a>
            </div>
            <div class="menu">
                <ul class="main-menu" id="nav-units">
                    <li><a href="/" id="nav-unit-0">Новости</a></li>
                    <li><a ui-sref="products" id="nav-unit-1">Товары</a></li>
                    <li><a ui-sref="static({page:'contacts'})" id="nav-unit-2">Контакты</a></li>
                    <li><a ui-sref="static({page:'help'})" id="nav-unit-3">Как купить</a></li>
                    <li><a ui-sref="static({page:'about'})" id="nav-unit-4">О нас</a></li>
                    <li><a ui-sref="static({page:'warranty'})" id="nav-unit-5">Гарантия</a></li>
                    <li><a ui-sref="static({page:'buildpc'})" id="nav-unit-5">Сборка ПК</a></li>
                </ul>
            </div>

            <vc-shopping-cart></vc-shopping-cart>

        </header>

        <div id="content-preloader">
            <i class="fa fa-refresh fa-spin"></i>
        </div>

        <div id="content" ui-view="">

        </div>
        <footer>
            <!-- <div class="footer-section">
                <ul class="footer-menu">
                     <li><a href="/public/files/Acorp_W422G.pdf">Настройка Acorp W422G</a></li>
                </ul>
            </div> -->
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
    <!-- BEGIN JIVOSITE CODE {literal} -->
    <script type='text/javascript'>
        (function () {
            var widget_id = 's8PRM9JuTy';
            var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = '//code.jivosite.com/script/widget/' + widget_id; var ss = document.getElementsByTagName('script')[0]; ss.parentNode.insertBefore(s, ss);
        })();</script>
    <!-- {/literal} END JIVOSITE CODE -->
    <!-- SCRIPTS -->
    <!--<script src="/public/js/jquery.address-1.5.js"></script>-->
    <script src="/public/js/bootstrap.min.js"></script>
    <script src="/public/js/alertify.min.js"></script>
    <script src="/public/js/inputs.js"></script>
    <script src="/public/js/pages/all/cart.js"></script>
    <script src="/public/js/helpers.js"></script>

    <!--<script src="/public/js/navigation.js?<?=time()?>"></script>-->

    <!--	Analytics              -->
    <!--    Google                 -->
    <script>
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date(); a = s.createElement(o),
            m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
        ga('create', 'UA-69733270-1', 'auto');
        ga('send', 'pageview');
    </script>
    <!-- Yandex     -->
    <script type="text/javascript">
        (function (d, w, c) {
            (w[c] = w[c] || []).push(function () {
                try {
                    w.yaCounter34595325 = new Ya.Metrika({
                        id: 34595325,
                        clickmap: true,
                        trackLinks: true,
                        accurateTrackBounce: true
                    });
                } catch (e) { }
            });

            var n = d.getElementsByTagName("script")[0],
                s = d.createElement("script"),
                f = function () { n.parentNode.insertBefore(s, n); };
            s.type = "text/javascript";
            s.async = true;
            s.src = "https://mc.yandex.ru/metrika/watch.js";

            if (w.opera == "[object Opera]") {
                d.addEventListener("DOMContentLoaded", f, false);
            } else { f(); }
        })(document, window, "yandex_metrika_callbacks");
    </script>
    <noscript><div><img src="https://mc.yandex.ru/watch/34595325" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
    <!--    Zero    -->
    <script type="text/javascript">
        var _zero_kz_ = _zero_kz_ || [];
        _zero_kz_.push(["id", 65428]);
        _zero_kz_.push(["type", 1]);

        (function () {
            var a = document.getElementsByTagName("script")[0],
            s = document.createElement("script");
            s.type = "text/javascript";
            s.async = true;
            s.src = (document.location.protocol == "https:" ? "https:" : "http:")
            + "//c.zero.kz/z.js";
            a.parentNode.insertBefore(s, a);
        })();
    </script>
    <!--    Zero    -->
    <!--	</Analytics>              -->
    <script src="/Scripts/angular.min.js"></script>
    <script src="/Scripts/angular-cookies.min.js"></script>
    <script src="/Scripts/angular-resource.min.js"></script>
    <script src="/Scripts/angular-ui-router.min.js"></script>
    <script src="/Scripts/angular-ui/ui-bootstrap.min.js"></script>
    <script src="/Scripts/angular-ui/ui-bootstrap-tpls.min.js"></script>
    <script src="/Scripts/angular-sanitize.min.js"></script>
    <script src="/public/js/rzslider.min.js"></script>
    <script src="/Scripts/jquery.maskedinput.min.js"></script>
    <script src="/Scripts/lodash.min.js"></script>
    <script src="/Scripts/require.js" data-main="/public/app/app"></script>

</body>
</html>
