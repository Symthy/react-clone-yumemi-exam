# コード

[保守性の高い React hooks コードの指針](https://zenn.dev/haniwa_www/articles/8ebacbd8e24321)

bad..

- 再現が困難な不具合の発生
- 容易に無限ループが発生しうる
- 不具合発生箇所の特定が手間
- 分岐が多くコードリーディングに手間がかかる

解消方法

- useEffect は１ページに１つ
- useEffect に deps 自動補完除外コメントを入れる
- state はプリミティブにする
- props にフラグがある場合はコンポーネントを分ける

[React×TypeScript の onChange の props 渡しで諦めない](https://zenn.dev/nbr41to/articles/3f1ae8cbc532b6)

```typescript
const ParentComp = () => {
  const [inputValue, setInputValue] = React.useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return <ChildComp value={inputValue} onChange={(e) => handleChange(e)} />;
};
```

## 型付け

[TypeScript: string | undefined な配列から undefined を取り除く処理の型付けをしっかりする方法](https://qiita.com/suin/items/cda9af4f4f1c53c05c6f)

## エラー情報を型安全に

[TypeScript でキャッチされたエラー情報を型安全に扱いたい](https://labs.septeni.co.jp/entry/2020/07/23/100000)
