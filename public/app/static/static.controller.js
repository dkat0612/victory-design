define(["require", "exports", "./../common/ceo.service"], function (require, exports, ceo_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StaticController = (function () {
        function StaticController($stateParams, $ceo) {
            this.$stateParams = $stateParams;
            this.$ceo = $ceo;
        }
        StaticController.prototype.$onInit = function () {
            this.setCeo(this.$stateParams.page);
        };
        StaticController.prototype.setCeo = function (page) {
            page = page.toLowerCase();
            switch (page) {
                case 'contacts':
                    this.$ceo.setTitle('Контакты');
                    this.$ceo.setDescription('Victory Computers - Адрес: Казахстан, г. Алматы, ул. Багратиона, 4, Торговый отдел/Факс: 8 (727) 380-77-89, Сервис центр/Факс: 8 (727) 386-38-76, E-mail: sales@victory.kz');
                    this.$ceo.setKeywords('Victory Computers, контакты, адрес, телефон, торговый, сервис, e-mail, факс, Казахстан, Алматы, интернет-магазин');
                    break;
                case 'about':
                    this.$ceo.setTitle('О нас');
                    this.$ceo.setDescription('Компания Victory Computers была зарегистрирована в 1992 году. Мы это более 22 лет успешной работы на рынке.');
                    this.$ceo.setKeywords('Victory Computers, история, алматы, багратиона, 4, казахстан, электронный, интернет, прайс, комплектующие, Intel, интернет-магазин');
                    break;
                case 'help':
                    this.$ceo.setTitle('Как купить');
                    this.$ceo.setDescription('Victory Computers бесплатная доставка по Алматы, самовывоз. Доставка по всему Казахстану (Караганда, Астана, Алматы, Талдыкурган, Кокшетау, Усть-каменогорск, Шымкент, Актау, Актобе, Кызылорда, Павлодар, Семипалатинск, Петропавловск).');
                    this.$ceo.setKeywords('Victory Computers, доставка, оплата, как купить, самовывоз, бесплатно, Казахстан, Алматы, интернет-магазин');
                    break;
                case 'about':
                    this.$ceo.setTitle('О нас');
                    this.$ceo.setDescription('Компания Victory Computers была зарегистрирована в 1992 году. Мы это более 22 лет успешной работы на рынке.');
                    this.$ceo.setKeywords('Victory Computers, история, алматы, багратиона, 4, казахстан, электронный, интернет, прайс, комплектующие, Intel, интернет-магазин');
                    break;
                case 'warranty':
                    this.$ceo.setTitle('О нас');
                    this.$ceo.setDescription('Собственный сервисный центр. Мы гарантируем работоспособность продукции в течении всего гарантийного срока, указанного в гарантийном талоне.');
                    this.$ceo.setKeywords('Victory Computers, гарантия, сервисный центр, магазин, Казахстан, Алматы, интернет-магазин');
                    break;
                case 'buildpc':
                    this.$ceo.setTitle('О нас');
                    this.$ceo.setDescription('Victory Computers осуществляет бесплатную сборку компьютеров и бесплатную доставку по городу Алматы. Доставка компьютеров по всему Казахстану (Караганда, Астана, Алматы, Талдыкурган, Кокшетау, Усть-каменогорск, Шымкент, Актау, Актобе, Кызылорда, Павлодар, Семипалатинск, Петропавловск).');
                    this.$ceo.setKeywords('Victory Computers, компьютер, комплект, ПК, купить, доставка, бесплатно, Алматы, интернет-магазин');
                    break;
                default:
                    this.$ceo.setTitle('');
                    this.$ceo.setDescription('Victory Computers компьютерный Интернет-Магазин  - ноутбуки, компьютеры, мониторы, комплектующие. Казахстан, Алматы, бесплатная доставка по Алматы.');
                    this.$ceo.setKeywords('Victory Computers, магазин, электронный, интернет, прайс, акции, скидки, ноутбуки, компьютеры, оргтехника, винчестеры, модемы, источники питания, материнская, плата, сетевые, корпуса, техника, коммуникаторы, мониторы, периферия, карты памяти, flash, флэш, КПК, комплектующие, Intel, Казахстан, Алматы, интернет-магазин, доставка, телефон, контакты');
                    break;
            }
        };
        StaticController.prototype.getPage = function () {
            return '/public/app/static/templates/' + this.$stateParams.page + '.html';
        };
        return StaticController;
    }());
    StaticController.$inject = ['$stateParams', ceo_service_1.NAME];
    exports.default = StaticController;
});
//# sourceMappingURL=static.controller.js.map