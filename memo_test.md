# test

[React テスト応用、テストに悩む人へ](https://zenn.dev/tkdn/books/react-testing-patterns/viewer/testing-with-spy)

## Jest

### path alias

moduleNameMapper を使用する

```javascript
  // jest.config.js
  moduleNameMapper: {
    '^src/(.+)$': '<rootDir>/src/$1'
  }
```

refs:

- [How to use path alias in a react project with Typescript + Jest (stackoverflow)](https://stackoverflow.com/questions/51080947/how-to-use-path-alias-in-a-react-project-with-typescript-jest)
- [Jest で alias を使ったモジュール参照を扱う](https://blog.mitsuruog.info/2019/06/jest-module-name-mapper)

## jest-environment-jsdom (React+Jest)

DOM API を使用するテスト、かつ、Jest(v27 以上) を使う場合は指定が必要

デフォルトは jest-environment node

```
/**
 * @jest-environment jsdom
 */
```

```javascript
// jest.config.js 全テストに判定される
module.exports = {
  testEnvironment: 'jsdom'
};
```

refs:

- [Jest の「The error below may be caused by using the wrong test environment」の解決方法](https://qiita.com/mame_daifuku/items/79b6a5a1514a3f067e1a)
- [Jest v28 に上げるためにやったこと](https://zenn.dev/keita_hino/articles/488d31e8c4a240)
