<link rel="stylesheet" href="/public/css/pages/products/show.min.css?<?=time(0)?>">
<div class="main-content">

    <div class="preloader">
        <i class="fa fa-spin fa-spinner fa-fw"></i>
    </div>
    <div class="product hidden">
        <ol class="breadcrumb" id = "breadcrumb">
        </ol>

        <div class="product-title">
            <h1></h1>
        </div>
        <div class="product-info">
            <div class="info">
                <div class="image">
                    <img class = "product-photo" alt="">
                    <span class="status"></span>
                    <div class="more-photos">
                        <span class="glyphicon glyphicon-camera"></span>
                        <span class="photo-count"></span>
                    </div>
                </div>


            </div>



        </div><div class="small-description">

            <div class="card">

            </div>

        </div>
        <div class="product-actions">
            <div class="price">
                Цена:
            </div>
            <div class="actions">
<!--
                <label for="product-count" class="special-input">
                    <input type="text" required id = "product-count">
                    <span>Кол-во</span>
                </label>
-->
                <button class="btn button-success" onclick="<?=(substr_count($product, 'W') == 0)?'AddToCart('.$product.', $(\'#product-count\').val())':'window.location.assign($(\'#cartLink\').attr(\'href\'))'?>">
                    <i class="fa fa-shopping-cart fa-fw"></i> В корзину
                </button>
            </div>
        </div>

        <div class = "description">
            <div class="warning">
                Информация о товарах, их характеристиках и комплектации может содержать ошибки. Также может быть изменена производителем без предварительного уведомления. Пожалуйста, уточняйте существенные для Вас характеристики и компоненты комплектации товаров при покупке. Не соответствие товара по описанию не может быть основанием для предъявления каких-либо претензий.
            </div>
        </div>
    </div>
<div class="more-photos-content hidden fadeOut animated" id = "more-photos">
    <div class="more-photos-overlay">
        <a class="more-photos-close"><i class="fa fa-times fa-fw"></i></a>
        <div class="photos">
            <div id="more-photos-carousel" class="carousel slide" data-ride="carousel" data-interval = "false">
                <ol class="carousel-indicators">
                </ol>

                <div class="carousel-inner" role="listbox">
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
    <?php if (isset($async)) { ?>window.asyncRequests = false;<?php } ?>
    $(document).ready(function() {
        LoadProduct('<?=$product?>');
    });
</script>
<?=View::factory('Templates/TDKscript') -> set('title', $page_title) -> set('description', $page_description) -> set('keywords', $page_keywords); ?>
