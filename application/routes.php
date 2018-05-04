<?php

    Route::set('Home', 'home/index')
  ->defaults(array(
    'controller' => 'Home',
    'action' => 'index',
  ));
    Route::set('Payment', 'paymentraw(/<action>(/<id>))')
  ->defaults(array(
    'controller' => 'Payment',
    'action' => 'index',
  ));

    Route::set('Sitemap', 'static/sitemap')
  ->defaults(array(
    'controller' => 'Static',
    'action' => 'sitemap',
  ));

    Route::set('Navigation', '<query>', array('query' => '.*'))
  ->defaults(array(
    'controller' => 'Navigation',
    'action' => 'index',
  ));

//Route::set('default', '(<controller>(/<action>(/<id>(/<id1>))))')->defaults(array(
//    'controller' => 'Home',
//    'action' => 'index',
//));
