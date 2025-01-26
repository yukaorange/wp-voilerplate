<?php
/*
Template Name: About
*/
get_header(); ?>
<div class="content about" data-ui="content" data-barba="container" data-template="about">
  <main class="main">
    <div class="container">
      <h2 data-animation="text">about page</h2>
    </div>

    <?php get_template_part('template-part/common/develop-about'); ?>
  </main>
</div>
<?php get_footer(); ?>