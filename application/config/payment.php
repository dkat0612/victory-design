<?php defined('SYSPATH') OR die('No direct access allowed.');
      return array(
          'test' => array(
              'MERCHANT_CERTIFICATE_ID' => "00C182B189",
              'MERCHANT_NAME' => "Test shop",			                        // �������� �������� (��������) Shop/merchant Name
              'PRIVATE_KEY_FN' => DOCROOT."/paysys/test_prv.pem",	                    // ���� � ��������� ����� Private cert path
              'PRIVATE_KEY_PASS' => "nissan",			                        // ������ � ��������� ����� Private cert password
              'XML_TEMPLATE_FN' => DOCROOT."/paysys/template.xml",                    // ���� � XML ������� XML template path
              'XML_COMMAND_TEMPLATE_FN' => DOCROOT."/paysys/command_template.xml",    // ���� � XML ������� ��� ������ (�������/�������������)
              'PUBLIC_KEY_FN' => DOCROOT."/paysys/kkbca.pem",                       // ���� � ��������� ����� Public cert path
              'MERCHANT_ID' => "92061101"
          ),
          'real' => array(
              'MERCHANT_CERTIFICATE_ID' => "c183df51",//"00C182B189",
              'MERCHANT_NAME' => "VICTORY COMPUTERS", //"Test shop",			                        // �������� �������� (��������) Shop/merchant Name
              'PRIVATE_KEY_FN' => DOCROOT.'certs/cert.prv',//DOCROOT."/paysys/test_prv.pem",	                    // ���� � ��������� ����� Private cert path
              'PRIVATE_KEY_PASS' => "WDfUveEf9i3",//"nissan",			                        // ������ � ��������� ����� Private cert password
              'XML_TEMPLATE_FN' => DOCROOT."/paysys/template.xml",                    // ���� � XML ������� XML template path
              'XML_COMMAND_TEMPLATE_FN' => DOCROOT."/paysys/command_template.xml",    // ���� � XML ������� ��� ������ (�������/�������������)
              'PUBLIC_KEY_FN' => DOCROOT.'/certs/kkbca.pem',//"/paysys/kkbca.pem",                       // ���� � ��������� ����� Public cert path
              'MERCHANT_ID' => "92591431",//"92061101"
          )
      );