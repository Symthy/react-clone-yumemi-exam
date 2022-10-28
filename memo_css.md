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
- ビューとアプリケーションロジックを分けてコンポーネントを作ることを徹底するなら CSS-in-JS でも良いように思う（CSS-in-JS の方が対応の幅が効くというのはありそうなので、規模大きくなっていくのが見えているなら先を見据えて CSS-in-JS 採用はありと思う）
- CSS-is-JS で個人的に使用するなら emotion (ただし、求められるパフォーマンスがシビアでなければ。)

## Styled Component

ref: [Styled Components を無闇に使わないで](https://zenn.dev/yhase_rqp/articles/db63567117c110)

Styled Components は簡単すぎて、初歩の構造を隠蔽する

```typescript
export const Button = styled.button<Props>`
  height: 40px;
  padding: 0 16px;
  border-radius: 4px;
  ${colorStyle}
`;

Button.displayName = 'Button';
```

実態は以下

```typescript
// React.forwardRefでラップする構文を使い、refを受け取れるようにする
export const Button = React.forwardRef<Ref, Props>((props, ref) => {
  // classNameを追加でマージできるようにする (1)
  const { color, className, ...rest } = props;

  return (
    <button
      ref={ref}
      // classNameを追加でマージできるようにする (2)
      className={cx(styles.root, styles[`root__color_${color}`], className)}
      // button要素が持つpropsでclassName以外のものは、そのまま受け流す
      {...rest}
    />
  );
});
```

Styled Components の使用は無意識的に ref の多用に繋がるため実はあまりよくない？カプセル化されているため、実害はそうないと思われるが…

styled-components ライブラリの

- メリット
  - CSS の特異性の問題を解決（クラス名の衝突）
  - コンポーネント内に CSS を記述できる
    - コンポーネントのすべての機能を 1 つのファイルに格納できる
  - すぐに使えるテーマ設定をサポート
    - ダーク テーマやその他のテーマをアプリケーションに追加するのは難しく時間がかかるが、容易に実現できる
- デメリット
  - JS で CSS を書くと、将来的に 2 つを分離することが難しくなり、保守性が大幅に低下する（例：JavaScript フレームワークを切り替える場合、ほとんどのコードベースを書き直す必要がでてくる）※CSS モジュールや emotion のようなライブラリを使用すれば将来性は高まる
  - 読みにくい場合がある
    - Styled Component と React Component を区別することは、特にアトミックデザインシステムの外では難しい場合がある
    - Styled Component のみをラッパーとして使用し、その中の要素にセマンティック HTML タグを使用することで、この問題を解決はできる。以下のように別ファイルに分けるとより明確にできる

```typescript
import * as Styled from './styled';
// use styled.components
<styled.Main>{code}</styled.Main>;
```

ref: [The Pros and Cons of Using Styled Components in React](https://www.makeuseof.com/styled-components-react-pros-cons/)
