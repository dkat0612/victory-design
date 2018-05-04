<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Payment extends Controller {
    public function action_index() {
        $model = new Model_Payments();
        $order_id = (int)rand(1, 1000000);
        $order_id = 1;
        echo View::factory('Payment/Form')
            ->set('site', 'dev.victory.kz')
            ->set('order_id', $order_id)
            ->set('signed_order', $model->getSignedOrder($order_id));
    }

    public function action_success() {
        $id = $this->request->param('id', null);
        if ($id == null) {
            $this->response->status(404);
            return;
        }
        $utils = new Payment_Utils();

        $response = Arr::get($_POST, 'response', null);
        if ($response == null) {
            return;
        }

        $post = addslashes($response);
        $q = "INSERT INTO payment_log (order_id, post, status) VALUES ($id, '$post', 'success')";
        DB::query(Database::INSERT, $q) ->execute();

        $config = Kohana::$config->load('payment')->as_array();
        $res = process_response($response, $config['real']);

        $order_id = Arr::get($res, 'ORDER_ORDER_ID', null);
        if ($order_id == null || ($id * 1) != ($order_id * 1)) {
            return;
        }
        $order_id *= 1;

        if (Arr::get($res, 'CHECKRESULT', null) == '[SIGN_GOOD]') {
            $q = "UPDATE product_orders SET payed = 2 WHERE id = $order_id";
            DB::query(Database::UPDATE, $q) ->execute();
        }


    }

    public function action_fail() {
        $id = $this->request->param('id', null);
        if ($id == null) {
            $this->response->status(404);
            return;
        }

        $utils = new Payment_Utils();

        $response = Arr::get($_POST, 'response', null);
        if ($response == null) {
            return;
        }
        $post = addslashes($response);
        $q = "INSERT INTO payment_log (order_id, post, status) VALUES ($id, '$post', 'fail')";
        DB::query(Database::INSERT, $q) ->execute();
        $config = Kohana::$config->load('payment')->as_array();
        $res = process_response($response, $config['real']);

        $order_id = Arr::get($res, 'ORDER_ORDER_ID', null);
        if ($order_id == null || ($id * 1) != ($order_id * 1)) {
            return;
        }
        $order_id *= 1;
    }

}
?>
