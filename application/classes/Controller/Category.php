<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Category extends Controller {

    public function action_show() {
        $category = $this->request->param('id', null);
        $page = $this->request->param('id1', 1);

        if ($category == null) {
            die($category);
            Request::factory('/products')->execute();
        } else {

            $q = "SELECT * FROM categories WHERE id = $category";
            $title = '';
            $res = DB::query(Database::SELECT, $q) -> execute() -> as_array();
            if (count($res) > 0) $title = $res[0]['title'];

            echo View::factory('Products/Index') -> bind('category', $category) -> bind('page', $page)
            -> set('page_title', 'Купить в Victory'.$title.'')
            -> set('page_description', 'Victory продает  по Алматы, Астана, Казахстан, купить '.$title.' в наличии, доставка по Казахстану')
            -> set('page_keywords', 'купить,Алматы,Казахстан,дешего,цена,Victory,Computers,в наличии, продает ,'.$title.'');
        }

    }

}
?>
