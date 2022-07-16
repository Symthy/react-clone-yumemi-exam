# memo

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
