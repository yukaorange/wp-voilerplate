<?php
function mytheme_setup()
{

  // タイトルタグを出力(各ページでタイトルが自動的に切り替わる)
  add_theme_support('title-tag');

  // ブロックエディターのCSSをフロントで有効化
  // add_theme_support('wp-block-styles');

  // 縦横比を維持したまレスポンシブ有効化
  add_theme_support('responsive-embeds');

  // エディター用のCSSを有効化&エディタに取り込み
  add_theme_support('editor-styles');
  add_editor_style(get_template_directory_uri() . '/css/editor-style.css');

  // link,style,scriptのhtml5対応を有効化
  add_theme_support('html5', array('style', 'script'));

  // 全幅、幅広を有効化
  add_theme_support('align-wide');

  // カスタムメニュー機能を有効化
  // add_theme_support('menus');

  //固定ページで抜粋機能有効化
  add_post_type_support('page', 'excerpt');
}
add_action('after_setup_theme', 'mytheme_setup');
