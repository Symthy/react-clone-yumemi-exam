# CSS (Style)

命名は BEM で書くより rscss の方が良い（コンポーネントでクローズドにできるため BEM は冗長）

refs:

- [React CSS で悩む全ての人へ【2022 年版】](https://ramble.impl.co.jp/1414/)
- [短いクラス名で運用できる CSS 設計 rscss を CSS Modules 向けにアレンジしてみた](https://zenn.dev/lollipop_onl/articles/eoz-rscss-in-css-modules)

styled-components vs emotion

- 可読性に関して、emotion > styled-components は同意。
- 速度も emotion 優位らしい。
- emotion は特定のフレームワークにロックインされない。
- emotion なら Object Style で書ける。
- emotion の欠点は SSR 環境への導入はややこしいらしい。

refs:

- [Vite+React+TypeScript で、CSS スタイルについて調べて、Emotion に流れ着いた](https://zenn.dev/longbridge/articles/78b5018315c876)
- [CSS-in-JS のライブラリとして「emotion」を選択している理由](https://qiita.com/__sakito__/items/d240840eef7123f62acf)
- [emotion - フレームワークに依存しない洗練された CSS-in-JS](https://blog.recruit.co.jp/rmp/front-end/post-17543/)
- [Sass から CSS Modules、そして styled-components に乗り換えた話](https://note.com/tabelog_frontend/n/n2541778b81e3)
- [CSS in JS として Vanilla-Extract を選んだ話と技術選定の記録の残し方 (emotion vs Vanilla-Extract)](https://tech.plaid.co.jp/karte-blocks-vanilla-extract-adr)

CSS Modules & CSS-in-JS 特徴

- パフォーマンスが重要なアプリケーションの場合は CSS Modules の方が適している。
- CSS-in-JS は、コードの可読性を最大化し、開発者の生産性と開発エクスペリエンスを向上させる。
- ※パフォーマンス面で CSS-in-JS が最適でないのを解消しようとしているのが ゼロランタイム CSS-in-JS。（将来的にはゼロランタイム CSS-in-JS が主流になりそうな予感）

ref:

- [CSS solutions Battle: Compile time CSS-in-JS vs CSS-in-JS vs CSS Modules vs SASS](https://dev.to/fyapy/sass-vs-css-modules-vs-css-in-js-vs-compile-time-css-in-js-who-wins-4cl)
- [CSS in JS とは](https://zenn.dev/takuyakikuchi/articles/b1b20f65d4f9cf)

個人の見解

- 動的に style 変える必要ないのなら、CSS in JS の使用はオーバースペックに思う
- webpack の css-loader が deprecated にしたため CSS Modules は下火になりつつある？
- 2022 の結果が出ないと分からないが、満足度：CSS Modules > CSS in JS (Vanilla-Extract 除く) にも関わらず早々消えるとは思えない
  - [CSS-in-JS Rankings](https://2021.stateofcss.com/en-US/technologies/css-in-js/)
- コンポーネントのソースファイルに CSS の Style の定義が入ってると可読性が良くないように感じる（色々な物が１ファイルに書かれていると何が何かパッと見見づらい）
  - 故に分けたいため、CSS Modules と Vanilla-Extract が個人的には好み（ただ Vanilla-Extract はまだマイナーなのが気になる）
  - だが、ビューとアプリケーションロジックを分ける container/presentation パターン で実装するなら CSS-in-JS でも気にならない
    - ビュー（HTML/CSS メイン）と ロジック(JS の実装ゴリゴリ) で分けれるなら、そちらの方が関心の分離になるため(可読性や責務的にも)良い
- webpack で CSS Modules が非推奨というだけで、Vite では非推奨になっていない(デフォルトで使用可能)なため、Vite で CSS Modules 使う分には直近問題にはならない
- ※ Native ESM でどうなるか理解が足りなくて分からない

結論（Vite を使用する前提で）

- 小規模で動的に style 変える必要もないなら CSS Modules でも十分
- 中～大規模で、ビューとアプリケーションロジックを分けてコンポーネントを作ることを徹底するなら CSS-in-JS の方が良いように思う（CSS-in-JS の方が対応の幅が効くというのはありそうなので、先を見据えて CSS-in-JS 採用はありと思う）
- CSS-is-JS で個人的に使用するなら emotion (ただし、求められるパフォーマンスがシビアでなければ。)

## emotion

参考:

- [Emotion Doc: Best Practices](https://emotion.sh/docs/best-practices)
- [@emotion/react でコンポーネントの外部からスタイルを受け取る方法](https://zenn.dev/hatchinee/articles/a235edb225fb39)
- [CSS in JS ライブラリ「emotion」のすすめ](https://zenn.dev/itomise/articles/e6386441cac697)
- [Emotion を使いこなす](https://qiita.com/282Haniwa/items/7248bed02a1b5b66579f)
- [Emotion はいいぞ](https://qiita.com/282Haniwa/items/93edc81a884add528593)
- [【お遊び？】Emotion で Utility First してみた](https://qiita.com/honey32/items/c7d4117bbc46c15a273b)
  - 以下のような指定もできるし、配列指定で合成も可能 ⇒ 一部 style を共通化して使用することも可能

```javascript
<div
  css={[
    css`color: white;`,
    // 1) テーマを引数に取る指定も含められる
    (theme) => css`background-color: ${theme.colors.primary};`,
    // 2) && etc. による条件付き指定も可
    selected && css`background-color: red;`,
  ]}
>
```

## theme の モードチェンジ

emotion での実現方法

- [Implementing dark mode in next.js with emotion - Topcoder](https://www.topcoder.com/thrive/articles/implementing-dark-mode-in-next-js-with-emotion)
- [Adding Dark Mode to Your React App with Emotion CSS-in-JS](https://levelup.gitconnected.com/adding-dark-mode-to-your-react-app-with-emotion-css-in-js-fc5c0f926838)
- [[React + Typescript] emotion の Theming 機能を使って複数の Theme 切り替えを実装してみた](https://dev.classmethod.jp/articles/react-typescript-emotion-theming/)
- [emotion 公式 Doc：複数 theme サポートしないならば theme は使用すべきでない](https://emotion.sh/docs/best-practices#define-colors-and-other-style-constants-as-javascript-variables)

※ sass で実現する方法もある。ちょっと面倒そう

[React で CSS variables でダークモードとライトモードを手軽に切り替える](https://zenn.dev/bom_shibuya/articles/f0a6d7daddfa6f)
