<?php

get_header();
?>
<div class="content single" data-barba="container" data-template="single">
  <main class="main-layout">
    <?php
    // get_template_part('template-part/common/common-pagemv');
    ?>

    <section class="single-post">
      <div class="content-post">

        <h1>
          <?php the_title(); ?>
        </h1>

        <?php the_content(); ?>

      </div>
      <div class="pagination-basic barba-prevent">
        <?php
        the_post_navigation(array(
          'prev_text' => '前の記事へ',
          'next_text' => '次の記事へ',
        ));
        ?>
        <?php
        $h = $_SERVER['HTTP_HOST'];
        if (!empty($_SERVER['HTTP_REFERER']) && (strpos($_SERVER['HTTP_REFERER'], $h) !== false)) {
        ?>
          <a href="<?php echo $_SERVER['HTTP_REFERER']; ?>" class="button-more">
            戻る
            <div class="button-more__arrow">
              <div class="arrow">
                <svg viewBox="0 0 31 31" fill="none">
                  <use href="#arrow"></use>
                </svg>
              </div>
            </div>
          </a>
        <?php } ?>
      </div>

    </section>

  </main>

  <?php get_footer(); ?>