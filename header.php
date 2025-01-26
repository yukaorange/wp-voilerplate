<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>

  <script>
    // gtag('config', 'YOUR_GTAG_ID', {
    //   'send_page_view': false
    // });
  </script>

  <meta charset="<?php bloginfo('charset'); ?>">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
  <meta name="theme-color" content="#fafaf2">
  <?php wp_head(); ?>

  <!-- <link rel="preload" as="font" href="<?php echo get_template_directory_uri(); ?>/dist/fonts/NotoSerifJP-Regular.woff" crossorigin /> -->

</head>

<body class="body">
  <?php wp_body_open(); ?>

  <?php
  get_template_part("template-part/common/svg");; ?>

  <?php
  // get_template_part("template-part/common/common-preloader");
  ?>


  <header class="header" id="header" data-ui="header">
    <div class="header__inner">
      <h1 class="header__logo" data-ui="header-logo">
        <a class="header__title _en" href="<?php echo esc_url(home_url()); ?>">
          <span>
            Learning
          </span>
          <span>
            <span class="header__title__char _silkskreen ">R</span>esources
          </span>
        </a>
      </h1>
      <nav class="nav-desktop">
        <div class="nav-desktop__inner">
          <ul class="list-nav">
            <li data-ui="filter" data-filter="format" class="item-nav" data-term="">
              <a href="<?php
                        // formatパラメータを空にし、現在のtechは維持
                        echo add_query_arg([
                          'tech' => isset($_GET['tech']) ? $_GET['tech'] : '',
                          'format' => ''
                        ]); ?>">
                全て
              </a>
            </li>
            <?php
            $formats = get_terms([
              'taxonomy' => 'resource_format',
              'hide_empty' => false, // 投稿が紐付いていないタームも含めて全て取得
            ]);

            if ($formats) :
              foreach ($formats as $format) : ?>
                <li data-ui="filter" data-filter="format" class="item-nav" data-term="<?php echo esc_attr($format->slug); ?>">
                  <a href="<?php
                            // 現在選択中のtech（もしあれば）を維持しながら、formatパラメータを更新
                            echo add_query_arg([
                              'tech' => isset($_GET['tech']) ? $_GET['tech'] : '',
                              'format' => $format->slug
                            ]); ?>">
                    <?php echo esc_html($format->name); ?>
                  </a>
                </li>
            <?php endforeach;
            endif; ?>
            <li class="item-nav _en">
              <a href="https://portfolio-2024-takaoka.vercel.app/" target="_blank" class="item-nav__link _en">
                My<span class="_silkskreen">p</span>ortfolio
                <div class="item-nav__icon">
                  <svg width="100%" height="100%">
                    <use href="#external-link-icon" />
                  </svg>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <?php
      get_template_part("template-part/component/button-drawer");
      ?>
    </div>
  </header>

  <?php
  get_template_part("template-part/common/nav-drawer");
  ?>