<?php
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
$script_name = rtrim(dirname($_SERVER['SCRIPT_NAME']), '\\');

//define domain
define("DOMAIN", $protocol . $_SERVER['HTTP_HOST'] . $script_name . '/');

//define root directory
define("ROOT", dirname(dirname(__FILE__)));