<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Navigation extends PageTemplate {


    public function action_index() {

    }

	public function action_navigate() {
		$this->auto_render = false;
		if (!isset($_POST['page'])) {
			echo "FAIL";
			return;
		}
        $page = $_POST['page'];

        if (Cookie::get('logged', FALSE) && (Cookie::get('checked_email', 'no_cookie') == 'no_cookie' || Cookie::get('checked_email', 'no_cookie') == "not_checked")) {
            if ($page != '/profile/settings' && $page != '/navigation/logout') {
                if (Cookie::get('checked_email', 'no_cookie') == 'no_cookie') {
                    Cookie::set('checked_email', Model::factory('Helper') -> check_email(Cookie::get('filial', 'almaty')));
                } else if (Cookie::get('checked_email', 'no_cookie') == 'not_checked') {
                    $this->template->email_checked = FALSE;
                    $page = '/profile/settings';
                } else $this->template->email_checked = TRUE;
            }
        }
        Request::factory($page)->method(Request::POST)->post(array());
        echo Request::factory($page) -> execute();
	}
}
