<article class="resource" data-ui="resource">
  <div class="resource__icons">
    <?php
    $tech_categories = get_the_terms(get_the_ID(), 'tech_category');
    if ($tech_categories && !is_wp_error($tech_categories)) :
      foreach ($tech_categories as $category) :
    ?>
        <div class="resource__icon">
          <picture>
            <source srcset='<?php echo esc_url(get_template_directory_uri()); ?>/dist/images/icons/<?php echo $category->slug; ?>.svg' media='(max-width: 868px)' />
            <img width="640" height="440" src="<?php echo esc_url(get_template_directory_uri()); ?>/dist/images/icons/<?php echo $category->slug; ?>.svg">
          </picture>
        </div>
    <?php
      endforeach;
    endif;
    ?>
  </div>
  <div class="resource__meta">
    <!-- title -->
    <div class="resource__meta-descrption">
      <div class="resource__term">
        title
      </div>
      <div class="resource__desc">
        <h3 class="resource__title">
          <?php the_title(); ?>
          </>
      </div>

    </div>
    <!-- author -->
    <div class="resource__meta-descrption">
      <div class="resource__term">
        author
      </div>
      <p class="resource__desc">
        <?php echo esc_html(get_field('author')); ?>
      </p>
    </div>
    <!-- format -->
    <div class="resource__meta-descrption">
      <div class="resource__term">
        format
      </div>
      <p class="resource__desc">
        <?php
        $formats = get_the_terms(get_the_ID(), 'resource_format');
        if ($formats && !is_wp_error($formats)) {
          echo esc_html($formats[0]->name);
        }
        ?>
      </p>
    </div>
    <!-- provider -->
    <div class="resource__meta-descrption">
      <div class="resource__term">
        provider
      </div>
      <p class="resource__desc">
        <?php
        echo esc_html(get_field('provider')); ?>
      </p>
    </div>
    <!-- <div class="resource__meta-descrption">
                        <div class="resource__term">
                          <span class="_emphasize">
                            period of my use
                          </span>
                        </div>
                        <p class="resource__desc">
                          <?php
                          $period = get_field('period');
                          if ($period) {
                            // 日付文字列を分解して年だけを取得
                            $date_parts = explode('/', $period);
                            echo esc_html(end($date_parts)); // 最後の要素（年）を表示
                          }
                          ?>
                        </p>
                      </div> -->
  </div>

  <div class="resource__content">

    <div class="resource__description"><?php the_content(); ?></div>

    <?php if (get_field('url')): ?>
      <a href="<?php echo esc_url(get_field('url')); ?>" class="resource__link" target="_blank" rel="noopener noreferrer">詳細</a>
    <?php endif; ?>

  </div>
</article>