<?php

get_header();
?>
<div class="content news" data-barba="container" data-template="news">
  <main class="main-layout">
    <?php
    // get_template_part('template-part/common/common-pagemv');
    ?>

    <section class="news-archive">
      <ul class="list-archive">
        <?php
        if (wp_is_mobile()) {
          $num = 10; // スマホの表示数(全件は-1)
        } else {
          $num = 10; // PCの表示数(全件は-1)
        }
        $paged = get_query_var('paged') ? get_query_var('paged') : 1;
        $args = [
          'post_type' => 'post', // 投稿タイプのスラッグ(通常投稿なので'post')
          'paged' => $paged, // ページネーションがある場合に必要
          'posts_per_page' => $num, // 表示件数
        ];
        $wp_query = new WP_Query($args);
        if (have_posts()) : while (have_posts()) : the_post();
        ?>
            <li class="item-archive">
              <a href="<?php the_permalink(); ?>" class="item-archive__link">
                <div class="item-archive__meta">
                  <time class="item-archive__meta__date" datetime="<?php the_time('Y.m.d'); ?>">
                    <?php the_time('Y.m.d'); ?>
                  </time>
                </div>
                <div class="item-archive__body">
                  <p class="item-archive__text">
                    <?php the_title(); ?>
                  </p>
                </div>
              </a>
            </li>
          <?php endwhile;
        else : ?>
          <p>まだ記事がありません</p>
        <?php endif ?>
        <?php wp_reset_postdata(); ?>
      </ul>
      <div class="pagination-basic barba-prevent">
        <?php
        the_posts_pagination(array(
          'mid_size' => 4,
          'prev_text' => '&lt',
          'next_text' => '&gt'
        ));
        ?>
      </div>
    </section>

  </main>

  <?php get_footer(); ?>