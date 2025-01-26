<?php

function mytheme_enqueue()
{
  // // google-fonts読み込み（一つずつ読み込む必要あり）
  // wp_enqueue_style('google-fonts-notosansJP', 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&display=swap rel="stylesheet"', false);
  // wp_enqueue_style('google-fonts-notoserifJP', 'https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500;600&display=swap" rel="stylesheet"', false);
  // wp_enqueue_style('google-fonts-jost', 'https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&display=swap" rel="stylesheet"', false);

  //ブロックエディターのCSS無効
  // wp_dequeue_style('global-styles');

  //ブロックエディターボタンのCSS無効
  // wp_dequeue_style('classic-theme-styles');

  // ダッシュアイコン有効化
  // wp_enqueue_style('dashicons');




  if (defined('IS_VITE_DEVELOPMENT') && IS_VITE_DEVELOPMENT === true) {
    //develop mode
    function vite_head_module_hook()
    {
      echo '<script type="module" crossorigin src="' . VITE_SERVER . VITE_ENTRY_POINT . '"></script>';
    }
    add_action('wp_footer', 'vite_head_module_hook');
  } else {
    //本番環境時

    // buildしたCSSをフロントに組み込み
    wp_enqueue_style('mytheme-style', get_template_directory_uri() . '/dist/assets/style.css', array(), filemtime(get_theme_file_path('style.css')), false);

    // buildしたbundle.js読み込み
    wp_enqueue_script('mainJs', get_template_directory_uri() . '/dist/js/main.js', "", "1.0.0", true);
  }
}
add_action('wp_enqueue_scripts', 'mytheme_enqueue');


function exclude_styles()
{
  wp_dequeue_style('wp-block-library');
}
add_action('wp_print_styles', 'exclude_styles', 100);



function stop_emojis()
{
  remove_action('wp_head', 'print_emoji_detection_script', 7);
  remove_action('admin_print_scripts', 'print_emoji_detection_script');
  remove_action('wp_print_styles', 'print_emoji_styles');
  remove_filter('the_content_feed', 'wp_staticize_emoji');
  remove_action('admin_print_styles', 'print_emoji_styles');
  remove_filter('comment_text_rss', 'wp_staticize_emoji');
  remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
}
add_action('init', 'stop_emojis');


add_action('wp_enqueue_scripts', function () {
});
