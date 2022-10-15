# react 実践のための まとめメモ

## ベストプラクティス（コーディング）

ref: [React ベストプラクティスの宝庫！「bulletproof-react」が勉強になりすぎる件](https://zenn.dev/meijin/articles/bulletproof-react-is-best-architecture)

- アプリケーション内に複数のレンダリング関数を追加しない。（これはすぐに制御できなくなる）
- ユニットと見なすことができる UI の一部とみなせるなら、それを別のコンポーネントに抽出。

Bad

```javascript
// this is very difficult to maintain as soon as the component starts growing
function Component() {
  function renderItems() {
    return <ul>...</ul>;
  }
  return <div>{renderItems()}</div>;
}
```

Good

```javascript
function Items() {
  return <ul>...</ul>;
}

function Component() {
  return (
    <div>
      <Items />
    </div>
  );
}
```

- コンポーネントが受け入れているプロップが多すぎる場合は、複数のコンポーネントに分割するか、子またはスロットを介して合成手法を使用することを検討する。

[example code](https://github.com/alan2207/bulletproof-react/blob/master/src/components/Elements/ConfirmationDialog/ConfirmationDialog.tsx)

```typescript
import { Dialog, DialogTitle } from '@/components/Elements/Dialog';
// :

export type ConfirmationDialogProps = {
  triggerButton: React.ReactElement;
  confirmButton: React.ReactElement;
  // :
}
export const ConfirmationDialog = ({
  triggerButton,
  confirmButton,
  // :
}: (ConfirmationDialogProps) => {
  // :
  const trigger = React.cloneElement(triggerButton, {
    onClick: open,
  });
  return (
    <>
       {trigger}
       // :
       <div>
         {confirmButton}
       </div>
    </>
  );
}
```

- 共有コンポーネントをコンポーネントライブラリに抽象化する

大規模なプロジェクトでは、すべての共有コンポーネントを抽象化することを推奨。これにより、アプリケーションの一貫性が向上し、保守が容易になる。

- その他

refs:

- [【React/Vue.js】コンポーネント設計の（個人的）ベストプラクティス | Offers Tech Blog](https://zenn.dev/offers/articles/20220523-component-design-best-practice)
- [クリーンな React プロジェクトの 21 のベストプラクティス](https://qiita.com/baby-degu/items/ea4eede60bbe9c63a348)
- [React のベストプラクティスとコード削減パターン - パート 1](https://blog.microcms.io/react-best-practices-part1/)
- [React のベストプラクティスとコード削減パターン - パート 2](https://blog.microcms.io/react-best-practices-part2/)
- [React のベストプラクティスとコード削減パターン - パート 3](https://blog.microcms.io/react-best-practices-part3/)

## React 諸々

※ドキュメント見ろ

ref: [React 18 に備えるにはどうすればいいの？ 5 分で理解する](https://qiita.com/uhyo/items/bbc22022fe846fd2b763)

### Suspense

コンポーネントを「ローディング中なのでまだレンダリングできない」という状態にすることができる

- [React の Suspense 対応非同期処理を手書きするハンズオン](https://zenn.dev/uhyo/books/react-concurrent-handson/viewer/what-is-suspense)

### カスタム hooks

- カスタムフック＝ロジックの外だし
- カスタムフックによるある種のカプセル化が可能な点（現代ではコンポーネントのロジックがほとんどカスタムフックに書かれる）
- 関数のスコープやモジュールレベルのスコープを活用した多様なカプセル化ができる点が優れている

代表例は、API の実行＆レスポンスんの解析 => カスタムフック

refs:

- [【React】カスタムフックと本気で向き合ってみた](https://qiita.com/cheez921/items/af5878b0c6db376dbaf0)
- [React Doc: 独自フックの作成](https://ja.reactjs.org/docs/hooks-custom.html)
- [useCallback はとにかく使え！　特にカスタムフックでは](https://blog.uhy.ooo/entry/2021-02-23/usecallback-custom-hooks/)

### Lazy

ref: [React のベストプラクティスとコード削減パターン - パート 1： 4.コードの分割](https://blog.microcms.io/react-best-practices-part1/)

- React.lazy を使うことでコンポーネントを非同期で読み込むことができる
- （アクセスしたコンポーネントのみをロードするため）無駄なコンポーネントの読み込みを避けることができる

```javascript
const Home = React.lazy(() => import('./Home'));
const About = React.lazy(() => import('./About'));
function MyComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Route path='/home' component={Home} />
      <Route path='/about' component={About} />
    </Suspense>
  );
}
```

ref: [named imports for React.lazy](https://github.com/facebook/react/issues/14603#issuecomment-726551598)

```typescript
function lazyImport<T extends React.ComponentType<any>, I extends { [K2 in K]: T }, K extends keyof I>(
  factory: () => Promise<I>,
  name: K
): I {
  return Object.create({
    [name]: React.lazy(() => factory().then((module) => ({ default: module[name] })))
  });
}

// Usage
const { Home } = lazyImport(() => import('./Home.component.tsx'), 'Home');
```

router と組み合わせて使う

### ref/useRef/forwardRef

- ref：コンポーネントの描画結果である DOM ノードへの参照を保持するオブジェクト（変更しても再レンダリングされない）
- useRef： ref オブジェクトを生成
- forwardRef：子コンポーネントに ref オブジェクトを渡すための機能

ref オブジェクトは current というプロパティを持ち、current はミュータブル（React の思想（宣言的 UI）には沿わないため「Don’t Overuse Refs」使いすぎ NG）

Hooks 時代の Ref の用途は 2 つ

- DOM へのアクセス
- ミュータブルな値を、レンダリングから独立して管理する

ユースケース：

- アクセシビリティの向上を実現する手段（実例：オートフォーカス、アニメーションの発火等）
- ※ とある DOM 要素から別の DOM 要素に対しての操作を行うことができる

```typescript
const ref = useRef(null)
//例: ref.currentで <input type="text" /> を参照
<input ref={ref} type="text" />
console.log(ref.current); // <input type="text" />
```

```typescript
// ボタンを押すと input 要素がフォーカスされる
const App = () => {
  const ref = useRef(null);
  const handleClick = () => {
    ref.current.focus();
    console.log('ref.current:', ref.current);
    //ref.current: <input type="text">
  };
  return (
    <>
      <input ref={ref} type='text' />
      <button onClick={handleClick}>入力エリアをフォーカスする</button>
    </>
  );
};
```

```typescript
// forwardRef の使用例
// ボタンを押すと input 要素がフォーカスされる
const CustomInput = (props, ref) => {
  return <input type='text' {...props} ref={ref} />;
};

const WrappedCustomInput = forwardRef(CustomInput);

export const App = () => {
  const ref = useRef();

  const onClick = () => {
    ref.current.focus();
  };

  return (
    <>
      <WrappedCustomInput ref={ref} />
      <button type='button' onClick={onClick}>
        focus
      </button>
    </>
  );
};
```

※React Hook Form は、Ref を上手に活用することで、ハイパフォーマンスなフォームの実装を可能にしたライブラリ → 多要素のフォーカス制御の参考になる

ref:

- [React の ref, useRef, forwardRef の基本的な知識](https://qiita.com/ryosuketter/items/1ebf2d68ba3317db53a9)
- [React の Ref とフォーカス管理におけるベストプラクティス](https://qiita.com/chelproc/items/de83a6f2959490109b49)

### State 戦略

ref:

- [「3 種類」で管理する React の State 戦略](https://zenn.dev/yoshiko/articles/607ec0c9b0408d)

3 種

- サーバーデータのキャッシュ
- Global State
  - ページをまたいで保持し続ける必要のある State ⇒ Redux や Recoil で管理
- Local State
  - 各 Component 内で useState を使って管理

### デザインパターン

[フロントエンドのデザインパターン](https://zenn.dev/morinokami/books/learning-patterns-1)

### その他やって得そうなこと

ref:

- [振り返って、やっておけばよかったこと](https://zenn.dev/yoshiko/articles/99f8047555f700#%E6%8C%AF%E3%82%8A%E8%BF%94%E3%81%A3%E3%81%A6%E3%80%81%E3%82%84%E3%81%A3%E3%81%A6%E3%81%8A%E3%81%91%E3%81%B0%E3%82%88%E3%81%8B%E3%81%A3%E3%81%9F%E3%81%93%E3%81%A8)

以下

- hooks 抜き出し
- useMemo/useCallback の適用
  - 「React は Immutability を前提に考えられている世界なので、意味合い的にはメモ化して内容が変化したときにだけ参照も更新されるようにしておいたほうが正しい」
  - 「いざ重くなったときにひとつひとつメモ化からやっていくのは大変だしデグレが怖い」とのこと ⇒ たしかに…。最初からそれなりにやっていった方が良さそう
- container/presenter の分離
  - storybook でのテストのカバレッジ向上目的
  - 別の解決の手はあるらしい： [「3 種類」で管理する React の State 戦略: Local State](https://zenn.dev/yoshiko/articles/607ec0c9b0408d#3.-local-state)

ref:

- [フロントエンドのデザインパターン：コンテナ・プレゼンテーションパターン](https://zenn.dev/morinokami/books/learning-patterns-1/viewer/presentational-container-pattern)

ビューをアプリケーションロジックから分離（関心の分離を促進）

- プレゼンテーションコンポーネント
  - 役割：props を通じてデータを受け取り、受け取ったデータを変更することなく、スタイルも含めて意図通りに表示すること
  - プレゼンテーションコンポーネントは（UI のためにステートが必要な場合を除き）ステートを持たない
- コンテナコンポーネント
  - 自身が含むプレゼンテーションコンポーネントにデータを受け渡すこと

Pros:

- プレゼンテーションコンポーネントは
  - UI を担当する純粋関数（＝テストが容易）
  - 再利用が容易（アプリケーション全体で異なる目的のために再利用可能＝全体での一貫性を保てる）
  - (デザイナーとの) 分業化容易
    Cons:
- 小規模なアプリケーションでは過剰＝複雑化

多くの場合、コンテナ・プレゼンテーションパターンは React のフックに置き換えることができる（コンテナ＝カスタムフック）

### テスト

[React Doc: テストのレシピ集](https://ja.reactjs.org/docs/testing-recipes.html)

## その他

### PLOP

PLOP：テンプレートからファイル生成に使える

- [【PLOP CLI】新しいファイルをテンプレートから生成する CLI](https://zenn.dev/anozon/articles/gatsby-plop-newpost)

- [PLOP 公式 Doc](https://plopjs.com/documentation/)

以下でも利用している。参考になるはず

[github: bulletproof-react](https://github.com/alan2207/bulletproof-react)

### eslint での 依存関係チェック

[依存関係のチェック（strict-dependencies）](https://zenn.dev/yoshiko/articles/0994f518015c04#%E4%BE%9D%E5%AD%98%E9%96%A2%E4%BF%82%E3%81%AE%E3%83%81%E3%82%A7%E3%83%83%E3%82%AF%EF%BC%88strict-dependencies%EF%BC%89)

### Headless Component

Headless Component とは一般的にはスタイルを持たない Component

この思想で作られている

- [Headless UI](https://headlessui.com/)
- [React Spectrum (Stately + Aria)](https://react-spectrum.adobe.com/index.html)

ref: [Headless Component 開発をはじめよう (Headless UI + React Spectrum)](https://zenn.dev/matamatanot/articles/7572dccafbc96d)
