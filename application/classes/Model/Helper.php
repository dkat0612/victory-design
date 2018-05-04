<?php defined('SYSPATH') or die('No direct script access.');

class Model_Helper extends Model {

    public function get_data($url, $post) {


        $postdata = http_build_query($post);

        $opts = array('http' =>
            array(
                'method'  => 'POST',
                'header'  => 'Content-type: application/x-www-form-urlencoded',
                'content' => $postdata
            )
        );

        $context  = stream_context_create($opts);

        $result = file_get_contents($url, false, $context);

        return $result;
    }


	public static function formatPrice($str) {
		$str .= "";
		$result = "";
		$cnt = -1;
		for ($i = strlen($str) - 1; $i >= 0; $i --) {
			$cnt ++;
			if ($cnt == 3) $result = " ".$result;
			$cnt = $cnt % 3;
			$result = $str[$i].$result;
		}
		return $result;
	}

    public function save_image($image, $dir = "")
    {
        if (
            ! Upload::valid($image) OR
            ! Upload::not_empty($image) OR
            ! Upload::type($image, array('jpg', 'jpeg', 'png', 'gif')))
        {
            return FALSE;
        }

        $directory = '';
        if ($dir != '') $directory = DOCROOT.$dir; else $directory = DOCROOT.'uploads/images/avatar/';

        if ($file = Upload::save($image, NULL, $directory))
        {
            $filename = md5(date("").Text::random('alnum', 30));

            $img = Image::factory($file);
            $height = $img ->height;
            $width = $img ->width;

            if ($height > $width) {
                $img -> crop($width, $width, 0, 0);
            } else {
                $img -> crop($height, $height, 0, 0);
            }

            $img -> resize(300, 300)
                -> save($directory.$filename.'.jpg');
            unlink($file);

            return $filename;
        }

        return FALSE;
    }

    public function gen_site_map() {
        $urls = array();
        // static urls
        $urls[] = array('url' => SITE_URL.'/', 'priority' => 1.0);
        $urls[] = array('url' => SITE_URL.'/static/contacts', 'priority' => 0.8);
        $urls[] = array('url' => SITE_URL.'/static/help', 'priority' => 0.8);
        $urls[] = array('url' => SITE_URL.'/static/about', 'priority' => 0.8);
        $urls[] = array('url' => SITE_URL.'/static/warranty', 'priority' => 0.8);
        $urls[] = array('url' => SITE_URL.'/static/buildpc', 'priority' => 0.8);
        //$urls[] = array('url' => SITE_URL.'/public/files/retail_price.xlsx', 'priority' => 0.8);
        //$urls[] = array('url' => SITE_URL.'/public/files/Готовые компьютеры.pdf', 'priority' => 0.8);

        $q = "SELECT * FROM categories WHERE deleted = 0";
        $categories = DB::query(Database::SELECT, $q) -> execute() -> as_array();
        foreach($categories as $category) {
            $cid = $category['id'];
            $q = "SELECT * from products WHERE category = $cid and (status = 1 or status = 5)";
            $products = DB::query(Database::SELECT, $q) -> execute() -> as_array();
            foreach($products as $product) {
                $productParams = array('url' => SITE_URL.'/products/show/'.$product['id'], 'priority' => 0.5);
                $pid = $product['id'];
                $q = "SELECT * FROM product_photos WHERE product_id = '$pid'";
                $photos = DB::query(Database::SELECT, $q) -> execute() -> as_array();
                $productParams['photos'][] = array(
                    'filename' => SITE_URL.'/public/img/products/'.$pid.'.jpg',
                    'title' => $product['name'],
                    'caption' => $product['name']
                );
                foreach ($photos as $photo) {
                    $productParams['photos'][] = array(
                        'filename' => SITE_URL.'/public/img/products/'.$photo['photo'].'.jpg',
                        'title' => $product['name'],
                        'caption' => $product['name']
                    );
                }
                $urls[] = $productParams;
            }
        }

        $xml = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" /><!--?xml version="1.0" encoding="UTF-8"?-->');

        foreach ($urls as $url) {
            $urlBlock = $xml -> addChild('url');
            $urlBlock -> addChild('loc', $url['url']);
            $urlBlock -> addChild('lastmod', date('Y-m-d'));
            $urlBlock -> addChild('changefreq', 'daily');
            if (isset($url['priority'])) {
                $urlBlock -> addChild('priority', $url['priority']);
            }
            if (isset($url['photos'])) {
                foreach($url['photos'] as $photo) {
                    $photoBlock = $urlBlock -> addChild('image:image', null, 'http://www.google.com/schemas/sitemap-image/1.1');
                    $photoBlock -> addChild('loc', $photo['filename'], 'http://www.google.com/schemas/sitemap-image/1.1');
                    $photoBlock -> addChild('title', $photo['title'], 'http://www.google.com/schemas/sitemap-image/1.1');
                    $photoBlock -> addChild('caption', $photo['caption'], 'http://www.google.com/schemas/sitemap-image/1.1');
                }
            }
        }

        file_put_contents(DOCROOT.'sitemap.xml', $xml -> asXML());

        /*
        echo "<pre>";
        print_r($urls);
        echo "/<pre>";
        */


    }

}
