<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Home extends Layout {

    public function action_index() {
        $this->auto_render = false;
        echo View::factory('Home/Index')
        -> set('page_title', 'Victory - комплектующие, компьютеры, периферия')
        -> set('page_description', 'Victory Computers компьютерный Интернет-Магазин  - ноутбуки, компьютеры, мониторы, комплектующие. Казахстан, Алматы, бесплатная доставка по Алматы.')
        -> set('page_keywords', 'Victory Computers, магазин, электронный, интернет, прайс, акции, скидки, ноутбуки, компьютеры, оргтехника, винчестеры, модемы, источники питания, материнская, плата, сетевые, корпуса, техника, коммуникаторы, мониторы, периферия, карты памяти, flash, флэш, КПК, комплектующие, Intel, Казахстан, Алматы, интернет-магазин, доставка, телефон, контакты');
        $this->template->pageTitle = 'Victory - комплектующие, компьютеры, периферия';
        $this->template->pageDescription ='Компьютерный Интернет-Магазин Victory Computers - ноутбуки, компьютеры, мониторы, комплектующие. Казахстан, Алматы, бесплатная доставка по Алматы.';
        $this->template->pageKeywords ='Victory Computers, магазин, электронный, интернет, прайс, акции, скидки, ноутбуки, компьютеры, оргтехника, винчестеры, модемы, источники питания, материнская, плата, сетевые, корпуса, техника, коммуникаторы, мониторы, периферия, карты памяти, flash, флэш, КПК, комплектующие, Intel, Казахстан, Алматы, интернет-магазин, доставка, телефон, контакты';
    }

    public function action_coin() {
        if (Arr::get($_GET, 'snapshoot', 'false') == 'true' || Arr::get($_GET, FRAGMENT, 'false') != 'false') {
            $this->template->content = View::factory('Static/Coin');
        } else {
            $this->auto_render = false;
            echo View::factory('Static/Coin');
        }
    }

    public function action_about() {
        $this -> template -> content = View::factory('Static/About')
        -> set('page_title', 'Victory - О компании')
        -> set('page_description', 'Компания Victory Computers была зарегистрирована в 1992 году. Мы это более 22 лет успешной работы на рынке.')
        -> set('page_keywords', 'Victory Computers, история, алматы, багратиона, 4, казахстан, электронный, интернет, прайс, комплектующие, Intel, интернет-магазин');
        $this->template->pageTitle = 'О компании - Victory Computers';
        $this->template->pageDescription ='Компания Victory Computers была зарегистрирована в 1992 году. Мы это более 22 лет успешной работы на рынке.';
        $this->template->pageKeywords ='Victory Computers, история, алматы, багратиона, 4, казахстан, электронный, интернет, прайс, комплектующие, Intel, интернет-магази';
    }

    public function action_contacts() {
        $this -> template -> content = View::factory('Static/Contacts')
        -> set('page_title', 'Контакты - Victory Computers')
        -> set('page_description', 'Victory Computers - Адрес: Казахстан, г. Алматы, ул. Багратиона, 4, Торговый отдел/Факс: 8 (727) 380-77-89, Сервис центр/Факс: 8 (727) 386-38-76, E-mail: sales@victory.kz')
        -> set('page_keywords', 'Victory Computers, контакты, адрес, телефон, торговый, сервис, e-mail, факс, Казахстан, Алматы, интернет-магазин');
        $this->template->pageTitle = 'Контакты - Victory Computers';
        $this->template->pageDescription ='Victory Computers - Адрес: Казахстан, г. Алматы, ул. Багратиона, 4, Торговый отдел/Факс: 8 (727) 380-77-89, Сервис центр/Факс: 8 (727) 386-38-76, E-mail: sales@victory.kz';
        $this->template->pageKeywords ='Victory Computers, контакты, адрес, телефон, торговый, сервис, e-mail, факс, Казахстан, Алматы, интернет-магазин';
    }

    public function action_help() {
        $this -> template -> content = View::factory('Static/Help')
        -> set('page_title', 'Victory - Как купить, Оплата и Доставка')
        -> set('page_description', 'Victory Computers бесплатная доставка по Алматы, самовывоз. Доставка по всему Казахстану (Караганда, Астана, Алматы, Талдыкурган, Кокшетау, Усть-каменогорск, Шымкент, Актау, Актобе, Кызылорда, Павлодар, Семипалатинск, Петропавловск).')
        -> set('page_keywords', 'Victory Computers, доставка, оплата, как купить, самовывоз, бесплатно, Казахстан, Алматы, интернет-магазин');
        $this->template->pageTitle = 'Как купить? Оплата и Доставка - Victory Computers';
        $this->template->pageDescription ='Victory Computers бесплатная доставка по Алматы, самовывоз. Доставка по всему Казахстану (Караганда, Астана, Алматы, Талдыкурган, Кокшетау, Усть-каменогорск, Шымкент, Актау, Актобе, Кызылорда, Павлодар, Семипалатинск, Петропавловск).';
        $this->template->pageKeywords ='Victory Computers, доставка, оплата, как купить, самовывоз, бесплатно, Казахстан, Алматы, интернет-магазин';
    }

    public function action_BuildPC() {
        $this -> template -> content = View::factory('Static/BuildPC')
        -> set('page_title', 'Victory - Сборка компьютеров, готовые решения')
        -> set('page_description', 'Victory Computers осуществляет бесплатную сборку компьютеров и бесплатную доставку по городу Алматы. Доставка компьютеров по всему Казахстану (Караганда, Астана, Алматы, Талдыкурган, Кокшетау, Усть-каменогорск, Шымкент, Актау, Актобе, Кызылорда, Павлодар, Семипалатинск, Петропавловск).')
        -> set('page_keywords', 'Victory Computers, компьютер, комплект, ПК, купить, доставка, бесплатно, Алматы, интернет-магазин');
        $this->template->pageTitle = 'Сборка компьютеров - Victory Computers';
        $this->template->pageDescription ='Victory Computers осуществляет бесплатную сборку компьютеров и бесплатную доставку по городу Алматы. Доставка компьютеров по всему Казахстану (Караганда, Астана, Алматы, Талдыкурган, Кокшетау, Усть-каменогорск, Шымкент, Актау, Актобе, Кызылорда, Павлодар, Семипалатинск, Петропавловск).';
        $this->template->pageKeywords ='Victory Computers, компьютер, комплект, ПК, купить, доставка, бесплатно, Алматы, интернет-магазин';
    }

    public function action_warranty() {
        $this -> template -> content = View::factory('Static/Warranty')
        -> set('page_title', 'Victory - Гарантия')
        -> set('page_description', 'Собственный сервисный центр. Мы гарантируем работоспособность продукции в течении всего гарантийного срока, указанного в гарантийном талоне.')
        -> set('page_keywords', 'Victory Computers, гарантия, сервисный центр, магазин, Казахстан, Алматы, интернет-магазин');
        $this->template->pageTitle = 'Гарантия - Victory Computers';
        $this->template->pageDescription ='Собственный сервисный центр. Мы гарантируем работоспособность продукции в течении всего гарантийного срока, указанного в гарантийном талоне.';
        $this->template->pageKeywords ='Victory Computers, гарантия, сервисный центр, магазин, Казахстан, Алматы, интернет-магазин';
    }

    public function action_partners() {
        $this->template->content = View::factory('Static/Partners');
    }



    public function action_sitemap() {
        $this -> auto_render = false;
        Model::factory('Helper') -> gen_site_map();
        $this->response->headers('Content-Type', 'text/xml');
        $this->response->headers('Cache-Control', 'no-cache, must-revalidate');
        $this->response->headers('Cache-Control', 'post-check=0,pre-check=0');
        $this->response->headers('Cache-Control', 'max-age=0');
        $this->response->headers('Pragma', 'no-cache');
        echo file_get_contents(DOCROOT.'/sitemap.xml');
    }

    public function action_prices() {
        $this->auto_render = false;
        echo View::factory('Static/Prices');
    }
}
?>
