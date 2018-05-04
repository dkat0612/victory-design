<?php defined('SYSPATH') or die('No direct script access.');

class Model_Payments extends Model {
    public function getSignedOrder($order_id) {

        $amount = 10;

        $tmp = (1000000 + $order_id);
        $order_id_str = ($tmp < 2000000)? substr($tmp + "", 1) : $tmp;

        $config = Kohana::$config->load('payment') ->as_array();
        $utils = new Payment_Utils();

        $sign = process_request($order_id_str, 398, $amount, $config);
        return $sign;
    }
}
?>
