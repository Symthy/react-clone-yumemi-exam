## storybook

ref: [Vite + React + TypeScript に Vite 用 Storybook を導入する。Storybook は必要だぞ](https://zenn.dev/longbridge/articles/13e65ef71455e4)

### CSF v3.0

refs:

- [Component Story Format 3.0](https://storybook.js.org/blog/component-story-format-3-0/)
- [Storybook CSF3.0 時代のテストに備える](https://zenn.dev/takepepe/scraps/6f8fb0c9bd6fa9)
- [TypeScript + Storybook CSF3.0 の書き方とユニットテストへの応用](https://zenn.dev/yukishinonome/articles/6bc6e33d579276)

- 書き方の変更

Template.bind ではなく Object で定義できるようになった

CSF2.0

```typescript
import { Story, Meta } from '@storybook/react/types-6-0';
import SimpleFrom, { Props } from './SimpleForm'; // 対象コンポーネント
export default {
  title: 'Atoms/SimpleFrom', // CSF3.0では省略可能
  component: SimpleFrom
} as Meta<Props>;

const Template: Story<Props> = (args) => <SimpleFrom {...args} />;

export const Index = Template.bind({});
Index.args = {
  title: 'お名前フォーム'
};
```

CSF3.0

```typescript
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import SimpleForm from './SimpleForm'; // 対象コンポーネント
export default { component: SimpleForm } as ComponentMeta<typeof SimpleForm>;

export const Index: ComponentStoryObj<typeof SimpleForm> = {
  args: {
    title: 'お名前フォーム'
  }
};
```

- play 関数によりインタラクティブストーリーが記載可能

```typescript
import userEvent from '@testing-library/user-event';

export default { component: AccountForm }

export const Empty = {};

export const EmptyError = {
  ...Empty,
  play: () => userEvent.click(screen.getByText('Submit'));
}

export const Filled = {
  ...Empty,
  play: () => {
    userEvent.type(screen.getById('user'), 'shilman@example.com');
    userEvent.type(screen.getById('password'), 'blahblahblah');
  }
}

export const FilledSuccess = {
  ...Filled,  // 再利用も可能
  play: () => {
    Filled.play();
    EmptyError.play();
  }
}
```

### Interaction test

refs:

- [Storybook Doc: Interaction tests](https://storybook.js.org/docs/react/writing-tests/interaction-testing)
- [Interaction Testing with Storybook](https://storybook.js.org/blog/interaction-testing-with-storybook/)
- [Storybook 単体でインタラクションテストを実施する](https://zenn.dev/azukiazusa/articles/storybook-interaction-testing)

以下を導入すれば、再生と巻き戻しも可能

```
npm i -D @storybook/addon-interactions
```

.storybook/main.js

```javascript
  addons: [
    // 他のアドオン,
    '@storybook/addon-interactions'
  ],
  features: {
    interactionsDebugger: true
  },
```

- play で実行
- useEvent で コンポーネントとの相互作用をシミュレート
- Jest で Dom Structure を検証

```
// テスト実行
npm run test-storybook
```

### Visual Testing (Github Action)

ref: https://storybook.js.org/tutorials/intro-to-storybook/react/en/deploy/

```
npm i -D chromatic
// access to https://www.chromatic.com/start
npx chromatic --project-token=1b98b5ba4c9e
```

refs:

- [Chromatic と storybook で UI のテストを自動化してみた](https://zenn.dev/kyo9bo/articles/9909ba89c42a77)
- [storybook の VRT で Chromatic を試す](https://zenn.dev/wintyo/articles/6bea3e999ad537)
- [Chromatic のプレビューリンクを自動で PR 上にコメントする](https://zenn.dev/matken/articles/chromatic-preview-comment)
