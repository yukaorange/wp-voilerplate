<?php
// 各ページタイトル表示
function page_title()
{
  if (is_home()) {
  } elseif (is_page()) {
    echo get_the_title();
  } elseif (is_single()) {
  }
}


// Ajax handlers 
/**
 * WordPress の Ajax システムにハンドラーを登録
 * 
 * wp_ajax_ で始まるアクションフックは WordPress の Ajax システム
 * load_more_resources: Ajax リクエストを識別するためのアクション名
 * load_more_resources_handler: 実際の処理を行うコールバック関数
 * 
 * 二つのフックを登録する理由：
 * wp_ajax_: ログインユーザー用
 * wp_ajax_nopriv_: 非ログインユーザー用
 * これにより、ログイン状態に関係なく全てのユーザーがリソースを読み込める
 */
add_action('wp_ajax_load_more_resources', 'load_more_resources_handler'); // ログインユーザー
add_action('wp_ajax_nopriv_load_more_resources', 'load_more_resources_handler'); // 非ログインユーザー

function load_more_resources_handler()
{
  // POSTリクエストからパラメータを安全に取得
  // isset(): 変数が存在し NULL でないことを確認
  // intval(): 整数値に変換（SQLインジェクション対策）
  // sanitize_text_field(): 特殊文字をエスケープ（XSS対策）
  $page = isset($_POST['page']) ? intval($_POST['page']) : 1;
  $tech = isset($_POST['tech']) ? sanitize_text_field($_POST['tech']) : '';
  $format = isset($_POST['format']) ? sanitize_text_field($_POST['format']) : '';

  $posts_per_page = 10; // 一度に読み込む投稿数

  $args = array(
    'post_type' => 'learning_resource',
    'posts_per_page' => $posts_per_page,
    'paged' => $page,
    'meta_key' => 'period',
    'orderby' => 'meta_value',
    'order' => 'DESC',
    'meta_type' => 'DATE'
  );

  /**
   * フィルタリング条件の構築
   * tax_query: タクソノミーに基づいて投稿をフィルタリングする WordPress の機能
   * relation => 'AND': 複数の条件を「かつ」で結合
   */
  if (!empty($tech) || !empty($format)) {
    $args['tax_query'] = array('relation' => 'AND');

    if (!empty($tech)) { //[] を使うことで、既存の tax_query 配列の末尾に新しい条件を簡単に追加できる
      $args['tax_query'][] = array(
        'taxonomy' => 'tech_category',
        'field' => 'slug',
        'terms' => $tech
      );
      /**
       *こんな感じになるイメージ
       *$args = [
       *   'tax_query' => [
       *      0 => ['taxonomy' => 'tech_category', ...],
       *      1 => ['taxonomy' =>* 'another_category', ...],
       *      2 => ['taxonomy' => 'third_category', ...]
       *   ]
       *];
       **/
    }

    if (!empty($format)) {
      $args['tax_query'][] = array(
        'taxonomy' => 'resource_format',
        'field' => 'slug',
        'terms' => $format
      );
    }
  }

  $query = new WP_Query($args);
  $total_posts = $query->found_posts;

  /**
   * 出力バッファリングを開始
   * ob_start(): PHPの出力をバッファに捕捉開始
   * これにより、テンプレートパーツの出力をHTMLとして取得可能
   */
  ob_start();
  if ($query->have_posts()) {
    while ($query->have_posts()) {
      $query->the_post();

      get_template_part("template-part/component/content-resource");
    }
    wp_reset_postdata(); // グローバルな投稿データを元に戻す

    // 現在までに表示された投稿数を計算
    $posts_shown = $posts_per_page * $page;

    $response = array(
      'html' => ob_get_clean(), // バッファの内容を取得してクリア
      'show_button' => $posts_shown < $total_posts,
      'total_posts' => $total_posts // 総投稿数
    );
  } else {
    $response = array(
      'show_button' => false,
      'is_empty' => true
    );
  }

  echo json_encode($response);
  wp_die();
}


// ajaxurl をグローバル変数として追加
function add_ajax_url()
{
?>
  <script>
    var ajaxurl = '<?php echo admin_url('admin-ajax.php'); ?>';
  </script>
<?php
}
add_action('wp_head', 'add_ajax_url');
