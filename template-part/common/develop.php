<div class="container">
  <!-- <picture>
    <source srcset='<?php echo esc_url(get_template_directory_uri()); ?>/dist/images/' media='(max-width: 868px)' />
    <img width="640" height="440" src="<?php echo esc_url(get_template_directory_uri()); ?>/dist/images/" alt="">
  </picture> -->
  <!-- <div style="width:1000px; height:1000px; background-image: url('<?php echo get_template_directory_uri(); ?>/dist/images/');"></div> -->
</div>
<div class="container">

  <div class="breakpoints-indicator" data-ui="indicator"></div>

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