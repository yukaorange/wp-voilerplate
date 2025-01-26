<?php
// 各ページタイトル表示
function page_title()
{
  if (is_home()) {
  } elseif (is_page()) {
    echo get_the_title();
  } elseif (is_single()) {
  }
}
