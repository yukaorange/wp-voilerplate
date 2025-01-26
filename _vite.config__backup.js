import { defineConfig } from "vite";
import liveReload from "vite-plugin-live-reload";
import autoprefixer from "autoprefixer";
import postcssNesting from "postcss-nesting";
import sass from "vite-plugin-sass";
import path from "path";
import imagemin from "vite-plugin-imagemin";
import glsl from "vite-plugin-glsl";

console.log("NODE_ENV:", process.env.NODE_ENV);
const projectName = "earl"; //プロジェクト名
const devUrl = `http://localhost:80/${projectName}/wp-content/themes/${projectName}/`; //開発環境のURLを指定

export default defineConfig(({ command }) => {
  // const isProduction = command === "build";
  console.log(command);
  return {
    plugins: [
      liveReload([
        __dirname + "/**/*.php",
        //  __dirname + "/**/*.js"
      ]),
      imagemin({
        glob: "src/images/**/*.{png,jpg,jpeg,gif,svg,webp}",
        outDir: "dist/images/",
      }),
      glsl(),
    ],
    root: "", //このファイルを置いているディレクトリがプロジェクトのルートディレクトリとなる
    base: process.env.NODE_ENV === "development" ? devUrl : "./", //開発環境のURLを指定
    //この環境変数はnpm run devでにdevelopmentに切り替わる。（package.json参照）
    build: {
      outDir: path.resolve(__dirname, "./dist"),
      emptyOutDir: true,
      manifest: true,
      minify: true,
      target: "es2018",
      rollupOptions: {
        // エントリーポイントの設定
        input: {
          //画像のエントリーポイントもbundle.jsとなる
          bundle: path.resolve(__dirname + "/src/js/bundle.js"),
          // another: path.resolve(__dirname + "/src/js/another.js"),
          style: path.resolve(__dirname + "/src/scss/style.scss"),
        },
        output: {
          // 出力設定
          entryFileNames: "js/[name].js",
          chunkFileNames: "js/[name].js",
          assetFileNames: ({ name }) => {
            if (/\.(gif|jpeg|jpg|png|svg|webp)$/.test(name ?? "")) {
              return "images/[name].[ext]"; //画像の出力先を指定
            }
            if (/\.css$/.test(name ?? "")) {
              return "css/[name].[ext]"; //CSSの出力先を指定
            }
            if (/\.js$/.test(name ?? "")) {
              return "js/[name].[ext]"; //JSの出力先を指定
            }
            return "[name].[ext]"; //その他のファイルの出力先を指定
          },
        },
      },
      assetsInlineLimit: 0,
      cssCodeSplit: false, // CSSのコード分割を無効にします
      write: true,
    },
    server: {
      host: "localhost",
      cors: true,
      strictPort: true,
      port: 3000,
      https: false,
      hmr: {
        host: "localhost",
      },
      open: `http://localhost:80/${projectName}`, //開発環境のURLを指定
    },
    css: {
      preprocessorOptions: {
        scss: {
          implementation: sass,
          includePaths: ["./node_modules"],
        },
      },
      postcss: {
        plugins: [postcssNesting(), autoprefixer()],
      },
      // modules: {
      //   localsConvention: "camelCaseOnly",
      // },
      // cssFileNames: "css/[name].css",
    },
  };
});

