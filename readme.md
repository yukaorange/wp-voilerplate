## 開発環境について

viteを使用し、開発時はmain.jsをfunctions.phpから読み込むことで、HMRを行いながら開発を進められるようにしている。また、同一ネットワーク上のデバイスで確認をする際はbrowser syncを使用して進めるモードに切り替えることも可能。

（自分用メモ）:8888 -> browsersync

vite.config.jsとbrowser-sync.config.cjsとmampをくみあわせることで、
MAMP（80）: WordPressの基本機能を提供
Vite（3000）: 開発用アセットとHMRを提供
Browser-sync（8888）: これらを束ねて自動リロード機能を追加
という構成。

http://172.20.6:8888/lernign-resource
にて共通ネットワークのデバイスから動作確認可能（buildしてから、functions.phpのIS_VITE_DEVELOPMENTをfalseにする必要あり）

## HTML/CSSの設計について

## WordPressの設計について

## TypeScriptの設計について
