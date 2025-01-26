<?php

//コメントを非表示
function remove_menus()
{
  remove_menu_page('edit-comments.php'); //コメントメニュー
}
add_action('admin_menu', 'remove_menus');

if (defined('IS_VITE_DEVELOPMENT') && IS_VITE_DEVELOPMENT === true) {
  //develop mode
  function cors_http_header()
  {
    header("Access-Control-Allow-Origin: *");
  }
  add_action('send_headers', 'cors_http_header');
}


// テキストエディタの自動整形を無効化
add_filter('run_wptexturize', '__return_false');
