import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/pageManager';

test('Logout test', async ({ browser }) => {
  const context = await browser.newContext({ storageState: 'state.json' });
  const page = await context.newPage();

  const pageManager = new PageManager(page);
  await pageManager.onLoggedInPage().logOut();

  expect(page.url()).toContain('/practice-test-login/');
});
