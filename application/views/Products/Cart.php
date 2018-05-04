<?php if (count($products) == 0) {?>
    <script>
        window.location.replace('/products');
    </script>
<?php } ?>
<link rel="stylesheet" href="/public/css/pages/products/cart.min.css?<?=time(0)?>">


<div class="main-content">
    <?php $price = 0; foreach ($products as $product) {  if (isset($product['info'])) $price += $product['info']['price'] * $product['amount']; ?>
        <?php if (isset($product['info'])) { ?>
        <div class="product" id = "product-<?=$product['id']?>">
            <div class="image">
                <a href="/products/show/<?=$product['id']?>"><img src="/public/img/products/<?=$product['info']['thumbnail']?>.jpg" alt=""></a>
            </div>
            <div class="info">
                <h4><a href="/products/show/<?=$product['id']?>"><?=$product['info']['name']?></a><span>Код товара: <?=$product['id']?></span>
                <?php
    if ($product['info']['status'] == 2) {$AmountStatus="Товар удалён"; $AmountStyle="del";}
    else if ($product['info']['place'] == 2) {$AmountStatus="Товар на уд. складе, 100% оплата, +1 день к доставке"; $AmountStyle="exist";}
    else if ($product['info']['amount']>10) {$AmountStatus="В наличии много"; $AmountStyle="exist";}
    else if ($product['info']['amount']>0) {$AmountStatus="В наличии";  $AmountStyle="exist";}
    else {$AmountStatus="Данный товар полностью зарезервирован под клиентов, пожалуйста, ожидайте наличия, снятия резерва, поступления или замените его на другой. Мы не выставим Вам счёь на этот заказ."; $AmountStyle="";}
                    ?>
                <span class="amount-status <?=$AmountStyle?>"><?=$AmountStatus?></span>

                </h4>
                <label for="product-amount-<?=$product['id']?>" class="special-input large">
                    <input type="number" min="0" required id = "product-amount-<?=$product['id']?>" value="<?=$product['amount']?>" onkeyup="changeAmount(<?=$product['id']?>, this.value)" onchange="changeAmount(<?=$product['id']?>, this.value, true)">
                    <span>Кол-во</span>
                </label>
                <i class="fa fa-times"></i>
               <span class="product-price" id = "product-price-<?=$product['id']?>">
                    <span><?=$product['info']['price']?></span> тг
               </span>

                <i class = "fa fa-long-arrow-right"></i>
                <span class="product-price product-all-price" id = "product-all-price-<?=$product['id']?>">
                    <span><?=$product['info']['price'] * $product['amount']?></span> тг
                </span>
                <div>
                <a href="#" class ="btn button-danger" onclick="RemoveFromCart('<?=$product['id']?>', true); return false;"> Удалить из корзины</a>
                <a class="btn button-primary" onclick = "BestOffer()" style="margin-left:20px">Нашли дешевле?</a>
                </div>
            </div>

        </div>
        <?php } else { ?>
            <div class="product" id = "product-<?=$product['id']?>">
                <b>Внимание!</b><br>
                <a href="/products/show/<?=$product['id']?>">Этот товар не найден в базе 1С</a><br>
                Замените его, Корзина не будет отправлена в обработку с таким товаром.<br>
                Товар устарел, снят c продаж или мы его не ожидаем в ближайшее время.<br>
                Пожалуйста не продолжайте заказ с таким товаром, замените или удалите его. <br>
                Такой заказ не будут отправлен в 1С на обработку, Вам будет выдана ошибка при оформлении. <br>
                <button class = "btn button-danger" onclick="RemoveFromCart(<?=$product['id']?>, true); return false;"><i class="fa fa-times"></i> Удалить из корзины</button>
            </div>
        <?php } ?>
    <?php } ?>

       <div class="preOrderInfo">
            <div class="info">
            Оформи заказ через сайт! <br>
            Главные преимущества:
            <ul>
            <li>1. Товар резервируется под Вас</li>
            <li>2. Цена сохраняется (Мы продадим по цене с сайта!)</li>
            <li>3. Мы Вам позвоним</li>
            </ul>
            </div>

        </div>
    <div class="order">
        <div class="customer-info fadeIn animated">
            <div class="price">
                Общая цена: <span><?=$price; ?></span> тг.
            </div>
            <label for="customer-name" class="special-input">
                <input type="text" required id = "customer-name">
                <span>Укажите в это поле: Имя и (опционально город, адрес)</span>
            </label>
            <label for="customer-email" class="special-input">
                <input type="text" required id = "customer-email">
                <span>Укажите в это поле: E-mail</span>
            </label>
            <label for="customer-phone" class="special-input">
                <input type="text" required id = "customer-phone">
                <span>Укажите в это поле: телефон</span>
            </label>
            <br><br>
            Зачем нам нужны данные: <a onclick = "inputName()">Имя</a>, <a onclick = "inputEmail()">E-mail</a>, <a onclick = "inputPhone()">Телефон</a><br><br>
            <button class="btn button-success" onclick = "CheckOrderInfo()"><i class="fa fa-money"></i> Оформить заказ</button>
            <button class="btn button-warning" onclick = "SaveLink()"><i class="fa fa-save"></i> Получить ссылку на корзину</button>
            <br><br>
            <!--<div style="text-align:left;">После оформления заказа, с Вами свяжется менеджер по указанному Вами телефону или E-mail, для уточнения способа оплаты и доставки товара.</div>-->
        </div>
        <div class="preloader fadeOut animated">
            <i class="fa fa-circle-o-notch fa-spin fa-fw"></i>
        </div>
        <div class="order-info fadeOut animated">
            <div class="price">
            Общая цена: <text class="price_amount"><?=$price; ?></text> тг.
            </div>

            Заказ отправлен, номер заказа: <span></span><br>
            <!--<div class="help-text">
                Запишите или запомните номер заказа, чтобы вы могли отследить статус и получить товар.
            </div> -->
            <div style="text-align: left">
            <p>Если Вы <b id = "customer-name-info"></b> разместили заказ в <b>рабочее время</b>, то в ближайшее время менеджер свяжется с Вами по номеру: <b id = "customer-phone-info"></b><br>
            Пожалуйста, не выключайте телефон и будьте на связи.<br>
            <b>Время работы:</b> Понедельник - Пятница, с 8:30 до 17:30 (Без перерыва)<br>
            Суббота, Воскресенье - Выходной<br>
            <b>Внимание:</b> Если Вы оставили заявку в не рабочее время.<br>
            Заявка будет обработана на следующий рабочий день.
            </div>
            <a href="#" onclick="ClearCart(true); return false" class="btn button-success">Продолжить</a>
        </div>
</div>

<script src="/public/js/pages/products/cart.js?<?=time()?>"></script>
