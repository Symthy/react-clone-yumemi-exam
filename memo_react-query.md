# react query

https://tanstack.com/query/v4/docs/adapters/react-query

アプリケーションの規模が大きくなるとカスタムフック化するなど抽象化が必要になってくる。

抽象化の例：[React Query を使いこなすために試したこと](https://zenn.dev/himorishige/articles/76e903bc5a1aa2)

react query の型は [React Query and TypeScript](https://tkdodo.eu/blog/react-query-and-type-script) が参考になる

[非同期処理に疲れた方に、ReactQuery の処方箋](https://zenn.dev/t_keshi/articles/react-query-prescription#reactquery%E3%81%AE%E5%87%A6%E6%96%B9%E7%AE%8B)

## レスポンスとデータが undefined の場合のエラー

```typescript
return useQuery<PrefectureResponeseResult[], Error>(['prefectures'], () => apiCilent.getPrefectures());
```

`apiCilent.getPrefectures()` のレスポンスが undefined だと以下のエラーとなった

以下のようなエラーが出た場合

```
Query data cannot be undefined. Please make sure to return a value other than
undefined from your query function. Affected query key: ["prefectures"]

Error: undefined
    at Object.onSuccess (query.ts:460:19)
    at resolve (retryer.ts:103:14)
```

## invalidate と reset の挙動の違い

cacheTime : 取得済みのデータ（＝キャッシュ）を保持する時間（デフォルト 5 分）

- 時間経過時は、キャッシュ破棄し、Loading 状態で データ取得
- resetQueries はこちらをリセット（経過したとみなす）

staleTime : キャッシュが古くなったと見なして再取得する時間（デフォルト 0）

- 時間経過時は、キャッシュのデータを表示した上で、最新データを取得
- invalidateQueries はこちらをリセット（経過したとみなす）

```typescript
const MyComponent = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching } = useQuery('time', fetchTime);

  const onReset = () => {
    queryClient.resetQueries('time');
  };

  const onInvalidate = () => {
    queryClient.invalidateQueries('time');
  };

  if (isLoading) return <div>Loading...</div>;

  if (data == null) return <div>ERR!</div>;

  return (
    <div>
      <h1>{data.getTime()}</h1>

      <div>
        <button onClick={onReset}>reset</button>
        <button onClick={onInvalidate}>invalidate</button>
        {isFetching && <span> (fetching...)</span>}
      </div>
    </div>
  );
};
```

ref: [react-query：invalidate と reset の挙動の違い](https://oita.oika.me/2021/09/06/react-query-reset-vs-invalidate)

## Error handling

[React Query Error Handling](https://tkdodo.eu/blog/react-query-error-handling#error-boundaries)
