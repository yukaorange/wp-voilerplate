const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  proxy: `localhost/${process.env.VITE_PROJECT_NAME}`,// MAMPのWordPressサイトを監視
  port: 8888,// Browser-sync自体のポート
  files: ['src/**/*.css', 'src/**/*.js', 'src/**/*.glsl', './*.php', 'template-parts/**/*.php'],
}
/*
*
//http://localhost:8888/learning-resources 
* このポート番号のプラウザでは
* MAMPのWordPressコンテンツ
* Viteが提供する開発用アセット
* Browsersyncの自動リロード
* が同時に動作する
*/

//つまり、vite.config.jsとbrowser-sync.config.cjsとmampをくみあわせることで、
//MAMP（80）: WordPressの基本機能を提供
//Vite（3000）: 開発用アセットとHMRを提供
//Browser-sync（8888）: これらを束ねて自動リロード機能を追加
//という構成になっている。
