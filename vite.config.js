import { defineConfig } from 'vite'
import dotenv from 'dotenv'
import liveReload from 'vite-plugin-live-reload'
import autoprefixer from 'autoprefixer'
import postcssNesting from 'postcss-nesting'
// import sass from 'vite-plugin-sass'
import path from 'path'
// import glsl from 'vite-plugin-glsl'

dotenv.config()

console.log('ENV:', process.env.NODE_ENV, 'PROJECT_NAME:', process.env.VITE_PROJECT_NAME)
const projectName = process.env.VITE_PROJECT_NAME //プロジェクト名
// const devUrl = `http://localhost:80/${projectName}`; //開発環境のURLを指定
const devUrl = `/${projectName}/wp-content/themes/${projectName}/public` //開発環境のURLを指定

export default defineConfig(({ command }) => {
  // const isProduction = command === "build";
  console.log(`command:${command}`)
  return {
    plugins: [
      liveReload([
        __dirname + '/**/*.php',
        // __dirname + "/**/*.js",//開発中はインラインのスクリプトが更新されるので、jsファイルは監視しない。（監視するとHMRが複数回走ってしまう。）
        // __dirname + "/**/*.scss"//same as above
      ]),
      // glsl(),
    ],
    root: '', //このファイルを置いているディレクトリがプロジェクトのルートディレクトリとなる

    /*
     * このbaseオプションは、ビルドされたアセットのパスを指定する。
     *
     * 開発時（NODE_ENV === 'development'の場合）:
     * - devUrl（/project/wp-content/themes/project/public）が使用される
     * - ブラウザは http://localhost:3000/project/wp-content/themes/project/public/画像.jpg のようなURLで
     *   Viteの開発サーバーから画像にアクセスできる
     *
     * ビルド時（yarn build実行時）:
     * - './'（相対パス）が使用される
     * - コンパイルされたJS/CSSファイルはdistディレクトリに出力
     * - 画像などの静的アセットもdistディレクトリにコピーされる
     * - 本番環境では相対パスでアセットを参照することになる
     * 
     * 開発時
     * Viteサーバー（localhost:3000）+ devUrl + アセットファイル名
例：http://localhost:3000/project/wp-content/themes/project/public/images/sample.jpg
     *
     * ビルド後
     * WordPressテーマのURL + distディレクトリ + アセットファイル名
例：http://localhost/project/wp-content/themes/project/dist/images/sample.jpg
     * 
     * ファイルの参照方法を環境によって切り替える必要がなくなる
     */

    base: process.env.NODE_ENV === 'development' ? devUrl : './', //この環境変数はnpm run devでにdevelopmentに切り替わる。（package.json参照）
    resolve: {
      alias: {
        '@scss': path.resolve(__dirname, './src/scss'),
        '@ts': path.resolve(__dirname, './src/ts'),
      },
    },
    build: {
      outDir: path.resolve(__dirname, './dist'),
      emptyOutDir: true,
      manifest: true,
      minify: true,
      target: 'es2018',
      rollupOptions: {
        // エントリーポイントの設定
        input: {
          main: path.resolve(__dirname + '/src/ts/index.ts'),
          style: path.resolve(__dirname + '/src/scss/style.scss'),
        },
        output: {
          // 出力設定
          entryFileNames: 'js/[name].js',
          chunkFileNames: 'js/[name].js',
          assetFileNames: 'assets/[name].[ext]',
        },
      },
      assetsInlineLimit: 0,
      cssCodeSplit: false, // CSSのコード分割を無効にします
      write: true,
    },
    /**
     * 3000番でviteサーバーを起動。ここで
     * TypeScript/SCSSファイルの監視・コンパイル
     * 開発用アセット（JS/CSS）の提供
     * HMR（Hot Module Replacement）の提供
     * がなされる。
     * これをfunctions.phpで読み込むことで、開発中のファイルの変更を即座に反映させることができる。(define('VITE_SERVER', 'http://localhost:3000'); @functions.php)
     *
     * なお、開発中のブラウザリロードはBrowsersyncが担当するため、ブラウザの軌道はBrowsersyncのポート番号で行う。(@browser-sync.config.cjsに詳細)
     */
    server: {
      host: '0.0.0.0',
      cors: true,
      strictPort: true,
      port: 3000,
      https: false,
      hmr: {
        //個人的に混乱したポイントはここ。HMRしているのに、ブラウザリロードがおきないが、それもそのはず、ここでのHMRとはあくまでアセットの差し替えのみであり、ブラウザのリロードはBrowsersyncが担当しているため。
        host: 'localhost', //port:3000と合わさって、ブラウザがViteサーバーにアクセスするためのURLを指定している。(define('VITE_SERVER', 'http://localhost:3000'); @functions.php)←この通り、フロント側のHTMLで、このURLを参照するようにしている。
      },
      open: `http://localhost:80/${projectName}`, //開発環境のURLを指定
    },
    css: {
      preprocessorOptions: {
        scss: {
          // implementation: sass,
          includePaths: ['./node_modules'],
        },
      },
      postcss: {
        plugins: [postcssNesting(), autoprefixer()],
      },
    },
  }
})
