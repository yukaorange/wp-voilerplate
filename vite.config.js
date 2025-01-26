import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import liveReload from 'vite-plugin-live-reload';
import autoprefixer from 'autoprefixer';
import postcssNesting from 'postcss-nesting';
import sass from 'vite-plugin-sass';
import path from 'path';
import glsl from 'vite-plugin-glsl';

dotenv.config();

console.log('ENV:', process.env.NODE_ENV, 'PROJECT_NAME:', process.env.VITE_PROJECT_NAME);
const projectName = process.env.VITE_PROJECT_NAME; //プロジェクト名
// const devUrl = `http://localhost:80/${projectName}`; //開発環境のURLを指定
const devUrl = `/${projectName}/wp-content/themes/${projectName}/public`; //開発環境のURLを指定

export default defineConfig(({ command }) => {
  // const isProduction = command === "build";
  console.log(`command:${command}`);
  return {
    plugins: [
      liveReload([
        __dirname + '/**/*.php',
        // __dirname + "/**/*.js",//開発中はインラインのスクリプトが更新されるので、jsファイルは監視しない。（監視するとHMRが複数回走ってしまう。）
        // __dirname + "/**/*.scss"//same as above
      ]),
      glsl(),
    ],
    root: '', //このファイルを置いているディレクトリがプロジェクトのルートディレクトリとなる
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
    server: {
      host: '0.0.0.0',
      cors: true,
      strictPort: true,
      port: 3000,
      https: false,
      hmr: {
        host: 'localhost',
      },
      open: `http://localhost:80/${projectName}`, //開発環境のURLを指定
    },
    css: {
      preprocessorOptions: {
        scss: {
          implementation: sass,
          includePaths: ['./node_modules'],
        },
      },
      postcss: {
        plugins: [postcssNesting(), autoprefixer()],
      },
    },
  };
});
