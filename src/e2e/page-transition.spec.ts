import { test, expect } from '@playwright/test';
import { rest } from 'msw';
import { RESAS_API_ENDPOINT, RESAS_API_POPULATIONS_PATH, RESAS_API_PREFECTURES_PATH } from 'src/api/constants';
import { serverError } from 'src/mocks/resolvers/errorServerError';
import { server } from 'src/mocks/server';

const APP_URL = 'http://127.0.0.1:5173';

test('login success', async ({ page }) => {
  await page.goto(APP_URL);
  await expect(page).toHaveURL(/.*login/);

  await page.getByPlaceholder('API キー').click();
  await page.getByPlaceholder('API キー').fill('test-key');
  await page.getByRole('button', { name: '利用開始' }).click();
  await expect(page).toHaveURL(`${APP_URL}/prefecture-population-view`);
});

test('server error when login', async ({ page }) => {
  server.use(
    rest.get(RESAS_API_ENDPOINT + RESAS_API_PREFECTURES_PATH, (req, res, ctx) =>
      res.once(ctx.status(500), ctx.json(serverError))
    )
  );

  await page.goto(APP_URL);
  await page.getByPlaceholder('API キー').click();
  await page.getByPlaceholder('API キー').fill('test-key');
  await page.getByRole('button', { name: '利用開始' }).click();
  await expect(page.locator('h2')).toHaveText('予期せぬエラーが発生しました');
  await page.getByRole('button', { name: 'トップへ戻る' }).click();
  await expect(page).toHaveURL(`${APP_URL}/login`);
});

test('server error when after login', async ({ page }) => {
  server.use(
    rest.get(RESAS_API_ENDPOINT + RESAS_API_POPULATIONS_PATH, (req, res, ctx) =>
      res.once(ctx.status(500), ctx.json(serverError))
    )
  );

  await page.goto(APP_URL);

  await page.getByPlaceholder('API キー').click();
  await page.getByPlaceholder('API キー').fill('test-eky');
  await page.getByRole('button', { name: '利用開始' }).click();
  await expect(page).toHaveURL(`${APP_URL}/prefecture-population-view`);
  await page.getByText('徳島県').click();
  await expect(page.locator('h2')).toHaveText('予期せぬエラーが発生しました');
  await page.getByRole('button', { name: 'トップへ戻る' }).click();
  await expect(page).toHaveURL(`${APP_URL}/login`);
});
