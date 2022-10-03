# react query

https://tanstack.com/query/v4/docs/adapters/react-query

## レスポンスとデータが undefined の場合のエラー

```typescript
return useQuery<PrefectureResponeseResult[], Error>(['prefectures'], () => apiCilent.getPrefectures());
```

`apiCilent.getPrefectures()` のレスポンスが undefined だと以下のエラーとなった

以下のようなエラーが出た場合

```
Query data cannot be undefined. Please make sure to return a value other than undefined from your query function. Affected query key: ["prefectures"]

Error: undefined
    at Object.onSuccess (query.ts:460:19)
    at resolve (retryer.ts:103:14)
```
