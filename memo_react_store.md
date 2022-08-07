# React ステート管理

## React Context

React 単体での共通ステート管理の限界

欠点

- １コンテキストに複数情報を入れる場合、それに依存する全てのコンポーネントが再レンダリングされる = パフォーマンス劣化

> コンテキストで、Redux っぽく「全てのステートを詰め込んだオブジェクトでステートを管理し、一つのコンテキストにそのオブジェクトを流す」ように、一つのコンテキストに全ての情報を入れてしまう場合はそれに依存する全てのコンポーネントが再レンダリングされ、パフォーマンス劣化に繋がるため、パフォーマンスを重視する場合に問題となる。

refs:

- [Recoil vs Redux](https://www.imaginarycloud.com/blog/recoil-vs-redux/)

### useContext

useContext: コンポーネント間でデータ(状態)の共有とデータ(状態)の受け渡しに関する Hook

```typescript
export const UserCount = createContext();

function App() {
  return (
    <div style={{ textAlign: 'center' }}>
      <UserCount.Provider value={100}>
        <ComponentA />
      </UserCount.Provider>
    </div>
  );
}
```

```typescript
import { useContext } from 'react';
import { UserCount } from '../App';

const ComponentC = () => {
  const count = useContext(UserCount);
  return (
    <div>
      <p>Componet C</p>
      <p>{count}</p>
    </div>
  );
};
```

## Redux/Recoil

共通点：パフォーマンス上の課題を解決するもの

Redux

- ステートの宣言が中央集権的
- アプリケーションの状態とロジックを一元化したストアを提供する。
- コンポーネントが必要なデータに直接アクセスできるようにし、クライアントサーバー環境とネイティブ環境で一貫して動作する JavaScript アプリの作成を支援するように設計された予測可能な状態コンテナー
- アプリケーション全体でデータの一貫性を提供することにより、複雑なアプリケーションの構築を容易にすることができる
- 開発者のベストプラクティスを実施するのに優れており、従うべき単純なパターンを提供するため、機能を構築するときにあまり多くの実装決定を行う必要がない
- API リクエストをアクションに抽象化して、すべてを 1 か所にまとめることもできる
- Redux Devtools を使用して、アプリケーションの状態がいつ、どこで、なぜ、どのように変化するかを追跡可能
- React アプリケーションの状態を処理するために提案された 「アーキテクチャ」 である Flux も実装している。（Flux：https://facebook.github.io/flux/）

Recoil

- Recoil はステートの宣言が局所的
- 大きなメリットは、 React の Suspense との統合
- フックとの相性がよい（Recoil が提供する各種のフックは、カスタムフックに組み込みやすいように作られている）
- セレクターで非同期リクエストを作成して、API リクエストから状態を開始することができる
- (Recoil は React の最新モードと統合されているため)、Suspense を使用してロード状態を処理し、ErrorBoundary を使用してエラーを処理することで、より宣言的な方法でアプリケーションを構築することができる。
- 開発者エクスペリエンスとユーザーエクスペリエンスの両方に関しては Redux より適している

refs:

- [Recoil vs Redux](https://www.imaginarycloud.com/blog/recoil-vs-redux/)
- [Facebook 製の新しいステート管理ライブラリ「Recoil」を最速で理解する](https://blog.uhy.ooo/entry/2020-05-16/recoil-first-impression/)

## Recoil vs Zustand vs Jotai

ref: https://recoiljs.org/docs/introduction/motivation

> 互換性とシンプルさの理由から、外部のグローバルステートではなく、React の組み込み状態管理機能を使用することをお勧めします。しかし React にはいくつかの制限がある。
>
> - コンポーネントの状態は、共通の先祖にプッシュすることによってのみ共有できますが、これには再レンダリングが必要な巨大なツリーが含まれる場合があります。
> - コンテキストは 1 つの値のみを格納でき、それぞれが独自のコンシューマを持つ不確定な値のセットは格納できません。
> - どちらの場合も、ツリーの最上部 (状態が存在する必要がある場所) をツリーのリーフ (状態が使用される場所) からコード分割するのは困難です。

Recoil

- ステートのシリアライゼーション（ストレージ、サーバー、URL へのステートの保存）を大きく必要とするなら、Recoil は良い機能を備えている (＝ React Context の代替として使うだけではオーバースペック)
- 様々な要件を持つ大きなアプリに対応したフルフィーチャーなライブラリ
- Recoil は atom 文字列のキーに依存
- [Recoil Docs](https://recoiljs.org/docs/introduction/core-concepts)
  > Recoil を使うと、atom (共有状態) から selector (純粋関数) を経て React コンポーネントに至るまでの固有の有効グラフ（React ツリーに付随）を作成できる。アトムは、コンポーネントがサブスクライブできる状態の単位です。selector は、この状態を同期的または非同期的に変換します。
- ＝ React の中で管理？

```typescript
const countAtom = atom<number>({
  key: `countAtom`,
  default: 0
});

function UpDown() {
  const [count, setCount] = useRecoilState(countAtom);
  return (
    <div>
      <button onClick={() => setCount(count - 1)}>Down</button>
      {count}
      <button onClick={() => setCount(count + 1)}>Up</button>
    </div>
  );
}

function App() {
  return (
    <RecoilRoot>
      <UpDown />
    </RecoilRoot>
  );
}
```

- ref: [Facebook 公式の React の状態管理ライブラリ Recoil は、Redux の代わりになりそう](https://www.kwbtblog.com/entry/2020/11/07/032250)

Zustand

- シングルステート（Redux と同様）
- React の外側で状態を更新したい場合は、Zustand の方がうまくいく
- Redux の devtools にも対応しているため、それを好むなら、Zustand が良い
- Context を用いていない。(Redux と同じ) 外部のグローバルステート = React の外で管理
- 一般的な落とし穴に対処。これらをすべて正しく理解している唯一のステートマネージャーかもしれない [Zustand Introduction](https://docs.pmnd.rs/zustand/introduction)

```typescript
interface State {
  count: number;
  increment: () => void;
}

const useStore = create<State>((set) => {
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
});

const App = () => {
  const { count, increment } = useStore();
  return (
    <div>
      {count} <button onClick={increment}>+1</buttoon>
    </div>
  );
};
```

- [Zustand: React 向け軽量ステート管理ライブラリ](https://qiita.com/daishi/items/deb20d951f532b86f029)

Jotai

- Jotai はプリミティブな複数のアトムで、それを合成 ＝ React の中で管理
- useState+useContext の代替が必要なら、Jotai がよく合う
- コードの分割が重要なら、Jotai がうまくいくはず
- リーンラーニングのためのプリミティブな API に力を入れていて、独創的(Zustand と同じ哲学)
- Jotai は atom オブジェクトの参照性同一性に依存
- React コンテキストの課題を解決 [Jotai Concept](https://jotai.org/docs/basics/concepts)

```typescript
export const countAtom = atom(0);
```

```typescript
const [count, setCount] = useAtom(countAtom);

const handlePlus = () => setCount((value) => value + 1);
const handleMinus = () => setCount((value) => value - 1);

return (
  <>
    <h1>{count} </h1>
    <div className='buttons'>
      <button onClick={handlePlus}>one up</button>
      <button onClick={handleMinus}>one down</button>
    </div>
  </>
);
```

- [React 用状態管理ライブラリ「Jotai」に入門](https://zenn.dev/kkeeth/articles/studying-jotai-library#provider-%E3%81%A7%E5%88%9D%E6%9C%9F%E5%80%A4%E3%82%92%E4%B8%8E%E3%81%88%E3%82%8B)

refs:

[React 状態管理ライブラリ Jotai とその他ライブラリとの比較](https://zenn.dev/tell_y/articles/a200a3dec620cc#%E3%81%84%E3%81%A4%E3%81%A9%E3%81%A1%E3%82%89%E3%82%92%E4%BD%BF%E3%81%86%E3%81%8B-1)

### まとめ

- React 外のストア
  - Redux (シングルステート)
  - Zustand (シングルステート、複数も可)
- React コンポーネントツリー内のストア
  - Recoil ※多分 (複数可)
  - Jotai (複数可)

## その他

- ref: [ベストな手法は？React のステート管理方法まとめ](https://ics.media/entry/200409/)
  - Redux と useReducer での状態管理の大きな違いは、グローバルステートとして管理するか、コンポーネントのスコープ内（ローカル）でステートを管理するか
  - Redux を使用するときは [re-ducks](https://github.com/alexnm/re-ducks) のようなデザインパターンを採用すると、密結合なファイル群をまとめることができるので複雑さが軽減できる
