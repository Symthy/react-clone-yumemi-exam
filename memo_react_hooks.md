# hooks

[【useCallback】React hook が便利すぎる](https://zenn.dev/web_tips/articles/656af21ea850d5)

[React.memo / useCallback / useMemo の使い方、使い所を理解してパフォーマンス最適化をする](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2)

## useReducer

ref: [【useReducer】React hook が便利すぎる](https://zenn.dev/web_tips/articles/0638273b083ec8)

state の更新に関して独自処理を定義した上で使用できる関数

```typescript
const [user, setUser] = useReducer(
  (user: UserData, newDetails: Partial<UserData>) => ({
    ...user,
    ...newDetails
  }),
  firstUser
);

// Reducer を使わずにやろうとすると以下にする必要がでてくる
//const onClick = () => setUser({ ...user, admin: true })
const onClick = () => setUser({ admin: true });
```

以下のように action を定義して扱える = state に対して可能な操作を紐づけて定義できる

```typescript
const reducerFunction = (state, action) => {
  switch (action) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    case 'reset':
      return 0;
    default:
      return state;
  }
};

// useReducerの引数にreducerの関数とステートの初期値を渡す。
const [counter, dispatch] = useReducer(reducerFunction, 0);
return (
  <>
    <p>カウント：{counter}</p>
    <button onClick={() => dispatch('increment')}>+1</button>
    <button onClick={() => dispatch('decrement')}>-1</button>
    <button onClick={() => dispatch('reset')}>RESET</button>
    <div className='line'></div>
  </>
);
```

## useEffect

依存しているものを、中で更新すると無限ループが起きる
