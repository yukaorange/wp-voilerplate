<div class="nav-drawer" id="nav-drawer" data-ui="nav-drawer">
  <div class="nav-drawer__inner" data-ui="nav-drawer-inner">
    <div class="nav-drawer__filter">
      <div class="nav-drawer__term">
        技術カテゴリー
      </div>
      <ul class="list-drawer-nav" data-ui="list-drawer-nav">
        <?php
        $parent_categories = get_terms(
          [
            'taxonomy' => 'tech_category',
            'parent' => 0, //これ以上親が無いものを取得
            'hide_empty' => true //投稿の無いものは取得しない
          ]
        );
        if ($parent_categories):
          foreach ($parent_categories as $parent):
            $child_terms = get_terms([
              'taxonomy' => 'tech_category',
              'parent' => $parent->term_id,
              'hide_empty' => true
            ]);
        ?>
            <?php foreach ($child_terms as $term): ?>
              <li class="item-drawer-nav" data-term="<?php echo esc_attr($term->slug); ?>" data-ui="item-drawer-nav">
                <span data-ui="item-nav-drawer-link">
                  <?php echo esc_html($term->name); ?>
                </span>
              </li>
            <?php endforeach; ?>
        <?php
          endforeach;
        endif; ?>
      </ul>
    </div>

    <div class="nav-drawer__filter">
      <div class="nav-drawer__term">
        形式
      </div>
      <ul class="list-drawer-nav" data-ui="list-drawer-nav">
        <?php
        $formats = get_terms([
          'taxonomy' => 'resource_format',
          'hide_empty' => false,
        ]);
        if ($formats) :
          foreach ($formats as $format) : ?>
            <li class="item-drawer-nav" data-term="<?php echo esc_attr($format->slug); ?>" data-ui="item-drawer-nav">
              <span data-ui="item-nav-drawer-link">
                <?php echo esc_html($format->name); ?>
              </span>
            </li>
        <?php endforeach;
        endif; ?>
      </ul>
    </div>

    <div class="nav-drawer__cta">

      <a href="https://portfolio-2024-takaoka.vercel.app/" target="_blank" class="nav-drawer__link _en">
        My<span class="_silkskreen">p</span>ortfolio
        <div class="item-nav__icon">
          <svg width="100%" height="100%">
            <use href="#external-link-icon" />
          </svg>
        </div>
      </a>
      <a target="_blank" href="https://x.com/webcreaterfrm30" class="sns__link">X</a>
      <a target="_blank" href="https://github.com/yukaorange" class="sns__link">GitHub</a>

    </div>
  </div>
</div>