<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Products extends Controller {
    
    public function action_solution() {
        HTTP::redirect('/solution'.URL::query(null, true));
    }
}
?>
