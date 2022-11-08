# api memo

- react-query
- axios

[REST API なら React Query がファーストチョイス](https://zenn.dev/brachio_takumi/articles/20210226-react-query#%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E3%81%AE%E3%83%81%E3%83%A5%E3%83%BC%E3%83%8B%E3%83%B3%E3%82%B0%E3%81%8C%E3%81%97%E3%82%84%E3%81%99%E3%81%84)

## axios

- [The Axios Instance](https://axios-http.com/docs/instance)
- [Interceptors](https://axios-http.com/docs/interceptors)
- [error handling sample (Github README)](https://github.com/axios/axios#handling-errors)

Axios の重要な機能の 1 つは、その同形性

ref: [Axios HTTP クライアントの完全ガイド](https://reflectoring.io/tutorial-guide-axios/)

前処理による共通化が可能

- [axios の interceptors で、リクエストの前処理を共通して行う](https://qiita.com/buntafujikawa/items/78e9204cc9ea7eaabd3d)
- [【リソース取得 API の比較】fetch と axios の 4 つの相違点](https://zenn.dev/syu/articles/9840082d1a6633)

### レスポンス

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

[The React Mega-Tutorial, Chapter 6: Building an API Client](https://blog.miguelgrinberg.com/post/the-react-mega-tutorial-chapter-6-building-an-api-client)

### 複数の同時リクエストの送信可能

```javascript
const axios = require('axios');

const app = express();

// Route Handler
app.get('/products/:productName/inventory', (request, response) => {
  const productName = request.params.productName;

  // Call the first API for product details
  const productApiResponse = axios.get(`http://localhost:3002/products/${productName}`);

  // Call the second API for inventory details
  const inventoryApiResponse = axios.get(`http://localhost:3002/products/${productName}/itemsInStock`);

  // Consolidate results into a single result
  Promise.all([productApiResponse, inventoryApiResponse]).then((results) => {
    const productData = results[0].data;
    const inventoryData = results[1].data;
    let aggregateData = productData;
    aggregateData.unitsInStock = inventoryData.unitsInStock;
    response.send(aggregateData);
  });
});
```

ref: [Axios HTTP クライアントの完全ガイド](https://reflectoring.io/tutorial-guide-axios/)

### interceptors (前処理/後処理)

```typescript
function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = storage.getToken();
  if (token) {
    config.headers.authorization = `${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    useNotificationStore.getState().addNotification({
      type: 'error',
      title: 'Error',
      message
    });

    return Promise.reject(error);
  }
);
```

React の フックで使う場合は以下のようにする ※ただし、こうする必要があるかは考えた方がいい

```typescript
export function AxiosClientProvider({ children }: { children: React.ReactElement }) {
  // 関数コンポーネントなのでフックが使える
  const navigate = useNavigate();
  React.useEffect(() => {
    const requestInterceptors = axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
      if (config.headers !== undefined) {
        // const accessToken = getAccessToken()
        // if (accessToken) {
        //   config.headers.Authorization = `Bearer ${accessToken}`
        // }
      }
      return config;
    });

    const responseInterceptor = axiosClient.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        switch (error.response?.status) {
          case 401:
            // なにかする
            break;
          default:
            break;
        }
        return Promise.reject(error);
      }
    );

    return () => {
      // クリーンアップ
      axiosClient.interceptors.request.eject(requestInterceptors);
      axiosClient.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return <>{children}</>;
}
```

[React axios インターセプターでフックを使えるようにする](https://zenn.dev/longbridge/articles/761d980297a62c)
