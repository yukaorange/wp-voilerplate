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
  <meta name="theme-color" content="#FFFFFF">
  <?php wp_head(); ?>

  <!-- <link rel="preload" as="font" href="<?php echo get_template_directory_uri(); ?>/dist/fonts/NotoSerifJP-Regular.woff" crossorigin /> -->

</head>

<body class="body" data-barba="wrapper">
  <?php wp_body_open(); ?>

  <?php get_template_part("template-part/common/common-preloader"); ?>

  <header class="header" id="header" data-ui="header">
    <div class="header__inner">
      <div class="header__logo" data-ui="header-logo">
        <a href="<?php echo esc_url(home_url()); ?>">
          <img src="<?php echo get_template_directory_uri(); ?>/dist/images/logo/logo.jpg" alt="logo">
        </a>
      </div>
      <div class="header__nav">
        <?php
        get_template_part("template-part/component/global-nav");
        ?>
        <?php
        get_template_part("template-part/component/drawer-button");
        ?>
      </div>
    </div>

  </header>

  <?php
  get_template_part("template-part//component/drawer-nav");
  ?>