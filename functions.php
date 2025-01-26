<?php

/**
 *route
 **/
define('THEME_PATH', get_template_directory());

//define

//開発時はtrue、本番環境ではfalse

define("IS_VITE_DEVELOPMENT", true);

define('DIST_DEF', 'dist');

define('DIST_URI',  get_template_directory_uri() . '/' . DIST_DEF);

define('DIST_PATH', get_template_directory()     . '/' . DIST_DEF);

define('JS_DEPENDENCY', array()); // array( 'jquery' ) as example

define('JS_LOAD_IN_FOOTER', true); // load scripts in footer?

define('VITE_SERVER', 'http://localhost:3000');

define('VITE_ENTRY_POINT', '/main.js');


require(THEME_PATH . '/functions/my-setup.php'); //テーマサポート機能
require(THEME_PATH . '/functions/my-config.php'); //出力設定
require(THEME_PATH . '/functions/my-function.php'); //独自関数定義
require(THEME_PATH . '/functions/my-enqueue.php');//css,script
