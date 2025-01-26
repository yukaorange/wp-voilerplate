<?php get_header(); ?>
<div class="content home" data-ui="content" data-template="top">
  <main>
    <!-- <h2 data-animation="text" class="_en">front page</h2> -->
    <div class="layout layout--top">
      <!-- タイトル -->
      <section class=" top-title">
        <div class="top-title__header">
          <div class="top-title__sub-heading">
            About this <span class="_silkskreen">W</span>ebsite
          </div>
          <h2 class="top-title__heading" data-animation="text">
            <span class="top-title__heading__row">フロントエンドエンジニアの</span><span class="top-title__heading__row">学習に使用したリソースを紹介している<br data-device="sp">ウェブサイトです。</span>
          </h2>
        </div>
      </section>
      <!-- ギャラリー -->
      <section class="top-gallery" data-ui="gallery">

        <div class="top-gallery__inner">
          <div class="top-gallery__col top-gallery__col--aside">
            <aside class="nav-aside" data-ui="nav-aside">
              <div class="nav-aside__filter">
                <h2 class="nav-aside__title">技術カテゴリー</h2>
                <div class="nav-aside__list">
                  <ul class="list-aside">
                    <li data-ui="filter" data-filter="tech" class="item-aside _en" data-term="all">
                      <a href="<?php
                                // techパラメータを空にし、現在のformatは維持
                                echo add_query_arg([
                                  'tech' => '',
                                  'format' => isset($_GET['format']) ? $_GET['format'] : ''
                                ]); ?>">
                        All
                      </a>
                    </li>
                    <?php
                    // 親カテゴリーを特定
                    $parent_categories = get_terms(
                      [
                        'taxonomy' => 'tech_category',
                        'parent' => 0, //これ以上親が無いものを取得
                        'hide_empty' => true //投稿の無いものは取得しない
                      ]
                    );
                    // 各親カテゴリーに対して、その子カテゴリーを取得
                    if ($parent_categories):
                      foreach ($parent_categories as $parent):
                        $child_terms = get_terms([
                          'taxonomy' => 'tech_category',
                          'parent' => $parent->term_id,
                          'hide_empty' => true
                        ]);
                    ?>
                        <?php foreach ($child_terms as $term): ?>
                          <li data-ui="filter" data-filter="tech" class="item-aside _en" data-term="<?php echo esc_attr($term->slug); ?>">
                            <a href="<?php
                                      // add_query_arg: URLにクエリパラメータを追加するWPの関数
                                      // 現在表示中のformat（もしあれば）を維持しながら、techパラメータを更新
                                      echo add_query_arg([
                                        'tech' => $term->slug,
                                        'format' => isset($_GET['format']) ? $_GET['format'] : ''
                                      ]); ?>">
                              <?php echo esc_html($term->name); ?>
                            </a>
                          </li>
                        <?php endforeach; ?>
                    <?php
                      endforeach;
                    endif; ?>
                  </ul>
                </div>
              </div>
              <div class="nav-aside__filter">
                <h2 class="nav-aside__title">形式</h2>
                <div class="nav-aside__list">
                  <ul class="list-aside list-aside--fit">
                    <li data-ui="filter" data-filter="format" class="item-aside" data-term="">
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
                        <li data-ui="filter" data-filter="format" class="item-aside" data-term="<?php echo esc_attr($format->slug); ?>">
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
                  </ul>
                </div>
              </div>
            </aside>

          </div>
          <div class="top-gallery__col">
            <!-- loading -->
            <div class="resource-loading" style="display:none" data-ui="resource-loading">
              <div class="resource-loading__indicator">
                Loading...
              </div>
            </div>
            <!-- resources -->
            <div class="resource-grid" data-ui="resource-grid">
              <?php
              // リソースの取得
              $args = array(
                'post_type' => 'learning_resource', // カスタム投稿タイプ
                'posts_per_page' => 10, // 1ページあたりの表示件数
                'meta_key' => 'period', // ソートに使用するカスタムフィールド
                'orderby' => 'meta_value', // metaフィールドでソート
                'order' => 'DESC', // 降順（新しい年から）
                'meta_type' => 'DATE' // 日付としてソート
              );

              if (!empty($_GET['tech']) || !empty($_GET['format'])) {
                $args['tax_query'] = ['relation' => 'AND'];

                if (!empty($_GET['tech'])) {
                  $args['tax_query'][] = [
                    'taxonomy' => 'tech_category',
                    'field' => 'slug',
                    'terms' => sanitize_text_field($_GET['tech']) // 入力値のサニタイズ
                  ];
                }

                if (!empty($_GET['format'])) {
                  $args['tax_query'][] = [
                    'taxonomy' => 'resource_format',
                    'field' => 'slug',
                    'terms' => sanitize_text_field($_GET['format']) // 入力値のサニタイズ
                  ];
                }
              }

              //クエリを実行し、コンテンツを取得
              $query = new WP_Query($args);

              //出力ループ
              if ($query->have_posts()) :
                while ($query->have_posts()) : $query->the_post();
              ?>
                  <?php get_template_part("template-part/component/content-resource"); ?>
                <?php
                endwhile;
                wp_reset_postdata();  // グローバル投稿データのリセット
              else: ?>
                <div class="resource-empty">
                  <p class="resource-empty__message">
                    該当する記事が見つかりませんでした。
                  </p>
                </div>
              <?php
              endif;
              ?>
            </div>
            <?php
            // 総ページ数が1より大きい場合のみ表示
            if ($query->max_num_pages > 1) : ?>
              <button class="resource-load-more" data-ui="load-more">
                さらに読み込む
              </button>
            <?php endif; ?>
          </div>
        </div>
    </div>
    </section>




</div>
</main>
</div>
<?php get_footer(); ?>