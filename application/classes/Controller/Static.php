<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Static extends Controller {

    public function action_coin() {
        if (Arr::get($_GET, 'snapshoot', 'false') == 'true' || Arr::get($_GET, FRAGMENT, 'false') != 'false') {
            $this->template->content = View::factory('Static/Coin');
        } else {
            $this->auto_render = false;
            echo View::factory('Static/Coin');
        }
    }


        public function action_index() {
        $this->auto_render = false;
        echo View::factory('Home/Index')
        -> set('page_title', 'Victory - комплектующие, компьютеры, периферия')
        -> set('page_description', 'Компьютерный Интернет-Магазин Victory Computers - ноутбуки, компьютеры, мониторы, комплектующие. Казахстан, Алматы, бесплатная доставка по Алматы.')
        -> set('page_keywords', 'Victory Computers, магазин, электронный, интернет, прайс, акции, скидки, ноутбуки, компьютеры, оргтехника, винчестеры, модемы, источники питания, материнская, плата, сетевые, корпуса, техника, коммуникаторы, мониторы, периферия, карты памяти, flash, флэш, КПК, комплектующие, Intel, Казахстан, Алматы, интернет-магазин, доставка, телефон, контакты');
    }

    public function action_about() {
        $this->auto_render = false;
        echo View::factory('Static/About')
        -> set('page_title', 'О компании - Victory Computers')
        -> set('page_description', 'Компания Victory Computers была зарегистрирована в 1992 году. Мы это более 22 лет успешной работы на рынке.')
        -> set('page_keywords', 'Victory Computers, история, алматы, багратиона, 4, казахстан, электронный, интернет, прайс, комплектующие, Intel, интернет-магазин');
    }

    public function action_contacts() {
        $this->auto_render = false;
        echo View::factory('Static/Contacts')
        -> set('page_title', 'Контакты - Victory Computers')
        -> set('page_description', 'Victory Computers - Адрес: Казахстан, г. Алматы, ул. Багратиона, 4, Торговый отдел/Факс: 8 (727) 380-77-89, Сервис центр/Факс: 8 (727) 386-38-76, E-mail: sales@victory.kz')
        -> set('page_keywords', 'Victory Computers, контакты, адрес, телефон, торговый, сервис, e-mail, факс, Казахстан, Алматы, интернет-магазин');
    }

    public function action_help() {
        $this->auto_render = false;
        echo View::factory('Static/Help')
        -> set('page_title', 'Как купить? Оплата и Доставка - Victory Computers')
        -> set('page_description', 'Victory Computers бесплатная доставка по Алматы, самовывоз. Доставка по всему Казахстану (Караганда, Астана, Алматы, Талдыкурган, Кокшетау, Усть-каменогорск, Шымкент, Актау, Актобе, Кызылорда, Павлодар, Семипалатинск, Петропавловск).')
        -> set('page_keywords', 'Victory Computers, доставка, оплата, как купить, самовывоз, бесплатно, Казахстан, Алматы, интернет-магазин');
    }

    public function action_BuildPC() {
        $this->auto_render = false;
        echo View::factory('Static/BuildPC')
        -> set('page_title', 'Сборка компьютеров - Victory Computers')
        -> set('page_description', 'Victory Computers осуществляет бесплатную сборку компьютеров и бесплатную доставку по городу Алматы. Доставка компьютеров по всему Казахстану (Караганда, Астана, Алматы, Талдыкурган, Кокшетау, Усть-каменогорск, Шымкент, Актау, Актобе, Кызылорда, Павлодар, Семипалатинск, Петропавловск).')
        -> set('page_keywords', 'Victory Computers, компьютер, комплект, ПК, купить, доставка, бесплатно, Алматы, интернет-магазин');
    }

        public function action_warranty() {
        $this->auto_render = false;
        echo View::factory('Static/Warranty')
        -> set('page_title', 'Гарантия - Victory Computers')
        -> set('page_description', 'Собственный сервисный центр. Мы гарантируем работоспособность продукции в течении всего гарантийного срока, указанного в гарантийном талоне.')
        -> set('page_keywords', 'Victory Computers, гарантия, сервисный центр, магазин, Казахстан, Алматы, интернет-магазин');
    }

    public function action_partners() {
        if (Arr::get($_GET, 'snapshoot', 'false') == 'true' || Arr::get($_GET, FRAGMENT, 'false') != 'false') {
            $this->template->content = View::factory('Static/Partners');
            $this -> template -> title = 'Victory Computers';
            $this -> template -> page_description = '';
            $this -> template -> page_keywords = '';
        } else {
            $this->auto_render = false;
            echo View::factory('Static/Partners');
        }
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
