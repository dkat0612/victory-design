<?php defined('SYSPATH') OR die('No direct access allowed.');
      return array(
          'test' => array(
              'MERCHANT_CERTIFICATE_ID' => "00C182B189",
              'MERCHANT_NAME' => "Test shop",			                        // Название магазина (продавца) Shop/merchant Name
              'PRIVATE_KEY_FN' => DOCROOT."/paysys/test_prv.pem",	                    // Путь к закрытому ключу Private cert path
              'PRIVATE_KEY_PASS' => "nissan",			                        // Пароль к закрытому ключу Private cert password
              'XML_TEMPLATE_FN' => DOCROOT."/paysys/template.xml",                    // Путь к XML шаблону XML template path
              'XML_COMMAND_TEMPLATE_FN' => DOCROOT."/paysys/command_template.xml",    // Путь к XML шаблону для команд (возврат/подтверждение)
              'PUBLIC_KEY_FN' => DOCROOT."/paysys/kkbca.pem",                       // Путь к открытому ключу Public cert path
              'MERCHANT_ID' => "92061101"
          ),
          'real' => array(
              'MERCHANT_CERTIFICATE_ID' => "c183df51",//"00C182B189",
              'MERCHANT_NAME' => "VICTORY COMPUTERS", //"Test shop",			                        // Название магазина (продавца) Shop/merchant Name
              'PRIVATE_KEY_FN' => DOCROOT.'certs/cert.prv',//DOCROOT."/paysys/test_prv.pem",	                    // Путь к закрытому ключу Private cert path
              'PRIVATE_KEY_PASS' => "WDfUveEf9i3",//"nissan",			                        // Пароль к закрытому ключу Private cert password
              'XML_TEMPLATE_FN' => DOCROOT."/paysys/template.xml",                    // Путь к XML шаблону XML template path
              'XML_COMMAND_TEMPLATE_FN' => DOCROOT."/paysys/command_template.xml",    // Путь к XML шаблону для команд (возврат/подтверждение)
              'PUBLIC_KEY_FN' => DOCROOT.'/certs/kkbca.pem',//"/paysys/kkbca.pem",                       // Путь к открытому ключу Public cert path
              'MERCHANT_ID' => "92591431",//"92061101"
          )
      );