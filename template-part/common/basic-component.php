<div class="container">
  <!-- <picture>
    <source srcset='<?php echo esc_url(get_template_directory_uri()); ?>/dist/images/' media='(max-width: 868px)' />
    <img width="640" height="440" src="<?php echo esc_url(get_template_directory_uri()); ?>/dist/images/" alt="">
  </picture> -->
  <!-- <div style="width:1000px; height:1000px; background-image: url('<?php echo get_template_directory_uri(); ?>/dist/images/');"></div> -->
</div>
<div class="container">

  <div class="breakpoints-indicator" data-ui="indicator"></div>

  <h3 data-animation="text">swiper</h3>
  <div class="swiper" data-ui="swiper-1">
    <div class="swiper-wrapper" data-ui="swiper-wrapper">
      <div class="swiper-slide" data-ui="swiper-slide">
        <picture>
          <source srcset='<?php echo esc_url(get_template_directory_uri()); ?>/dist/images/dummy/43.png' media='(max-width: 868px)' />
          <img width="640" height="440" src="<?php echo esc_url(get_template_directory_uri()); ?>/dist/images/dummy/43.png" alt="">
        </picture>
      </div>
      <div class="swiper-slide" data-ui="swiper-slide">
        <picture>
          <source srcset='<?php echo esc_url(get_template_directory_uri()); ?>/dist/images/dummy/42.png' media='(max-width: 868px)' />
          <img width="640" height="440" src="<?php echo esc_url(get_template_directory_uri()); ?>/dist/images/dummy/42.png" alt="">
        </picture>
      </div>
      <div class="swiper-slide" data-ui="swiper-slide">
        <picture>
          <source srcset='<?php echo esc_url(get_template_directory_uri()); ?>/dist/images/dummy/44.png' media='(max-width: 868px)' />
          <img width="640" height="440" src="<?php echo esc_url(get_template_directory_uri()); ?>/dist/images/dummy/44.png" alt="">
        </picture>
      </div>
    </div>

    <div class="swiper-indicator" data-ui="swiper-indicator"></div>

    <div class="swiper__controls" data-ui="swiper-controls">
      <button class="swiper-button swiper-button--prev swiper__controls__button" data-ui="swiper-button-prev">
        前へ
      </button>
      <button class="swiper-button swiper-button--next swiper__controls__button" data-ui="swiper-button-next">
        次へ
      </button>
    </div>
  </div>

  <div class="spacer"></div>

  <h3 data-animation="text">accordion</h3>
  <div class="accordion" data-ui="accordion-1">
    <button class="accordion-item__button" data-ui="accordion-button">
      toggle button
    </button>
    <div class="accordion__content" data-ui="accordion-content">
      <div class="accordion__content__inner">
        content
      </div>
    </div>
  </div>



  <div class="spacer"></div>

  <h3 data-animation="text">tab changer</h3>
  <div class="tab-basic" data-ui="tab-changer-1">
    <div class="tab-basic__toggle">
      <button class="tab-basic__button active-tab" data-tab-target="tab-1">
        tab_text_1
      </button>
      <button class="tab-basic__button" data-tab-target="tab-2">
        tab_text_2
      </button>
    </div>
    <div class="tab-basic__contents">
      <div class="tab-basic__content active-content" data-tab-content="tab-1">content-1...</div>
      <div class="tab-basic__content" data-tab-content="tab-2">content-2...</div>
    </div>
  </div>
  <div class="spacer"></div>
  <div class="spacer"></div>
  <div class="spacer"></div>
  <div class="spacer"></div>


  <!-- <ul class="archive">
    <?php
    if (wp_is_mobile()) {
      $num = 3; // スマホの表示数(全件は-1)
    } else {
      $num = 3; // PCの表示数(全件は-1)
    }
    // $paged = get_query_var('paged') ? get_query_var('paged') : 1;
    $args = [
      'post_type' => 'post', // 投稿タイプのスラッグ(通常投稿なので'post')
      // 'paged' => $paged, // ページネーションがある場合に必要
      'posts_per_page' => $num, // 表示件数
    ];
    $wp_query = new WP_Query($args);
    if (have_posts()) : while (have_posts()) : the_post();
    ?>
        <li class="archive-item">
          <a href="<?php the_permalink(); ?>" class="archive-item__link">
            <div class="archive-item__meta">
              <time class="archive-item__date" datetime="<?php the_time('Y.m.d'); ?>"><?php the_time('Y.m.d'); ?></time>
            </div>
            <div class="archive-item__body">
              <p class="archive-item__text"><?php the_title(); ?></p>
            </div>
          </a>
        </li>
      <?php endwhile;
    else : ?>
      <p>まだ記事がありません</p>
    <?php endif ?>
    <?php wp_reset_postdata(); ?>
  </ul> -->


  <!-- <div class="guide">
    <?php
    if (wp_is_mobile()) {
      $num = 14; // スマホの表示数(全件は-1)
    } else {
      $num = 28; // PCの表示数(全件は-1)
    }
    for ($i = 1; $i <= $num; $i++) :
    ?>
      <div class="guide__line">
      </div>
    <?php endfor; ?>
    <?php
    if (wp_is_mobile()) {
      $num = 14; // スマホの表示数(全件は-1)
    } else {
      $num = 28; // PCの表示数(全件は-1)
    }
    for ($i = 1; $i <= $num; $i++) :
    ?>
      <div class="guide__row"></div>
    <?php endfor; ?>

  </div> -->
</div>