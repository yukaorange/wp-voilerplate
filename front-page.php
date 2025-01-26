<?php get_header(); ?>
<div class="content home" data-ui="content" data-barba="container" data-template="home">
  <main class="main">
    <div class="container">
      <h2 data-animation="text">front page</h2>
    </div>

    <?php get_template_part('template-part/common/basic-component'); ?>
    
    <?php get_template_part('template-part/common/develop'); ?>
  </main>
</div>
<?php get_footer(); ?>