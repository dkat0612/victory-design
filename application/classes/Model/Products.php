<?php defined('SYSPATH') or die('No direct script access.');

class Model_Products extends Model {

    public function get_products_from_cart() {
        $products = json_decode(Cookie::get('shopping_cart', '[]'), TRUE);
        if (count($products) == 0) return $products;

        $ids = array();
        foreach($products as $product) {
            $ids[] = $product['id'];
        }

        $ids = "'".implode('\',\'', $ids)."'";

        $q = "SELECT * FROM products WHERE id in ($ids) AND (status = 1 or status = 5)";
        $res = DB::query(Database::SELECT, $q) -> execute() -> as_array();

        foreach ($res as $product) {
            $products[$product['id']]['info'] = $product;
        }

        return $products;
    }

    public function get_product($id) {
        $q = "SELECT * FROM products WHERE id = '$id'";
        $product = DB::query(Database::SELECT, $q) -> execute() -> as_array();
        if (count($product) == 0) return NULL; else {
            $product[0]['description'] = stripslashes($product[0]['description']);
            $product[0]['vendor_code'] = stripslashes($product[0]['vendor_code']);
            $product[0]['place'] = stripslashes($product[0]['place']);
            $product[0]['name'] = stripslashes($product[0]['name']);
            $product[0]['price_name'] = stripslashes($product[0]['price_name']);
            $product[0]['price_offer'] = stripslashes($product[0]['price_offer']);
            $q = "SELECT * FROM product_photos WHERE product_id = '$id'";
            $product[0]['photos'] = DB::query(Database::SELECT, $q) -> execute() -> as_array();
            return $product[0];
        }
    }

}
?>
