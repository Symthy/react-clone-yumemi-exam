# api memo

- react-query
- axios

[REST API なら React Query がファーストチョイス](https://zenn.dev/brachio_takumi/articles/20210226-react-query#%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E3%81%AE%E3%83%81%E3%83%A5%E3%83%BC%E3%83%8B%E3%83%B3%E3%82%B0%E3%81%8C%E3%81%97%E3%82%84%E3%81%99%E3%81%84)

## axios

- [The Axios Instance](https://axios-http.com/docs/instance)
- [Interceptors](https://axios-http.com/docs/interceptors)

前処理による共通化が可能

- [axios の interceptors で、リクエストの前処理を共通して行う](https://qiita.com/buntafujikawa/items/78e9204cc9ea7eaabd3d)
- [【リソース取得 API の比較】fetch と axios の 4 つの相違点](https://zenn.dev/syu/articles/9840082d1a6633)

レスポンスは、 AxiosResponse の形で返ってくるため注意が必要。ボディは data に格納されている

```typescript
interface AxiosResponse<T = any, D = any> {
  data: T;
  status: number;
  statusText: string;
  headers: AxiosResponseHeaders;
  config: AxiosRequestConfig<D>;
  request?: any;
}
```

ref: [【Typescript】いろいろな型の指定方法：Axios 編](https://maasaablog.com/development/typescript/3455/#toc6)

## react-query & axios

```typescript
export const useQueryTasks = () => {
  const getTasks = async () => {
    const { data } = await axios.get<Task[]>(`${API_BASE_URL}/tasks`);
    return data;
  };
  return useQuery<Task[], Error>({
    queryKey: 'tasks',
    queryFn: getTasks,
    staleTime: 0
  });
};
```

```typescript
export const TaskList = () => {
  const { status, data } = useQueryTasks();
  if (status === 'loading') return <div>{'Loding...'}</div>;
  if (status === 'error') return <div>{'Error'}</div>;
  return (
    <div>
      {data?.map((task) => {
        <div key={task.id}>
          <ul>
            <TaskItem task={task} />
          </ul>
        </div>;
      })}
    </div>
  );
};
```

## refs

[The React Mega-Tutorial, Chapter 6: Building an API Client](https://blog.miguelgrinberg.com/post/the-react-mega-tutorial-chapter-6-building-an-api-client)
