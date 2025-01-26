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
  <meta name="theme-color" content="#000000">
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
        template for wp
      </h1>
      <nav class="nav-desktop">
        <div class="nav-desktop__inner">
          desktop nav
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