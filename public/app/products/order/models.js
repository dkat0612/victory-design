define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ALMATY_CODE = 4;
    exports.PAYMENTS_BY_DATA = {
        1: {
            1: [1, 3, 4, 5],
            2: [2, 3, 5],
            3: [3, 5]
        },
        2: {
            1: [1, 3, 4, 5],
            2: [2, 3, 5],
            3: [5, 6, 7]
        }
    };
    var Payment = (function () {
        function Payment(json) {
            _(this).extendWith(json).commit();
            this.online = json.online || false;
        }
        Payment.prototype.getCommission = function (price) {
            return price * this.commission;
        };
        return Payment;
    }());
    exports.Payment = Payment;
    exports.PAYMENTS = [
        new Payment({
            id: 1,
            title: 'Оплата наличными в офисе',
            commission: 0
        }),
        new Payment({
            id: 2,
            title: 'Оплата наличными курьеру',
            commission: 0
        }),
        new Payment({
            id: 3,
            title: 'Оплата  с Карты/Банка/Банкомата на Карту/Счёт',
            commission: 0
        }),
        new Payment({
            id: 4,
            title: 'Оплата с Карты в офисе + 4% комиссия',
            commission: 0.04
        }),
        new Payment({
            id: 5,
            title: 'Оплата с Карты (Visa, MasterCard, American Express) на карту онлайн-платеж + 4% комиссия c транзакции',
            commission: 0.04,
            online: true
        }),
        new Payment({
            id: 6,
            title: 'Оплата с Карты (Visa, MasterCard, American Express) а также Банка/Банкомата на карту оффлайн-платеж 0% комиссия с транзакции',
            commission: 0
        }),
        new Payment({
            id: 7,
            title: 'Оплата QIWI + 4% комиссия',
            commission: 0.04
        })
    ];
    var Delivery = (function () {
        function Delivery(json) {
            _(this).extendWith(json).commit();
        }
        Delivery.prototype.isShown = function (townId) {
            if (townId == exports.ALMATY_CODE && this.isAlmaty)
                return true;
            if (townId != exports.ALMATY_CODE && !this.isAlmaty)
                return true;
            return false;
        };
        return Delivery;
    }());
    exports.Delivery = Delivery;
    exports.DELIVERIES = [
        new Delivery({
            id: 1,
            title: 'Самовывоз',
            isAlmaty: true,
            type: 'self',
            info: 'Адрес: г. Алматы, ул. Багратиона, 4'
        }),
        new Delivery({
            id: 2,
            title: 'Доставка Алматы',
            isAlmaty: true,
            type: 'adress',
            info: "<b>Квадрат доставки:</b>\n<div class=\"flex\">Аль-Фараби - Саина - Северное кольцо - Бекмаханова - Майлина - Рыскулова - Восточная Объездная Дорога</div>\n<div class=\"flex\"><b class=\"inline\">Заказ на сумму более 100 000 тенге</b> - перевозка не требует оплаты.</div>\n<div class=\"flex\"><b class=\"inline\"> При покупке стоимостью менее 100 000 тенге</b> - 1000 тенге доставка.</div>\n<div class=\"flex\">Товар будет доставлен к Вашему подъезду!</div>\n<div class=\"flex\">Водитель машину <b class=\"inline\">не покидает</b>!</div>\n<div class=\"flex\">Стоимость и сроки доставки за пределами квадрата, оговариваются с менеджерами.</div>\n<div class=\"flex\">Мы не можем гарантировать доставку товара день в день и не можем гарантировать доставку в труднодоступные места. Мы оставляем за собой права отказать в доставке без объяснения причины, но уведомив клиента. После оформления заказа, Вам обязательно позвонят в рабочее время для согласования доставки.</div>"
        }),
        new Delivery({
            id: 3,
            title: 'Доставка Exline',
            isAlmaty: false,
            type: 'exline'
        })
    ];
    var Person = (function () {
        function Person(json) {
            _(this).extendWith(json).commit();
        }
        return Person;
    }());
    exports.Person = Person;
    exports.PERSONS = [
        new Person({
            id: 1,
            title: 'Юридическое лицо (ТОО / ИП) без НДС'
        }),
        new Person({
            id: 2,
            title: 'Физическое лицо'
        })
    ];
});
//# sourceMappingURL=models.js.map
