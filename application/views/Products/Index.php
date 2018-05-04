<link rel="stylesheet" href="/public/css/pages/products/index.min.css?<?=time()?>">
<vc-product-list></vc-product-list>

<?=View::factory('Templates/TDKscript') -> set('title', $page_title) -> set('description', $page_description) -> set('keywords', $page_keywords); ?>
