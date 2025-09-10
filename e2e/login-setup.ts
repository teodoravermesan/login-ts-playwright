

import { test as setup } from '@playwright/test';
import { PageManager } from '../pages/pageManager';

setup('Login setup', async ({ page, context }) => {
  await page.goto('/practice-test-login/');
  const pageManager = new PageManager(page);

  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;
    if (!username || !password) {
        throw new Error('USERNAME and PASSWORD environment variables must be set')
    }
  await pageManager.onLoginPage().testLogin(username, password);

  // Wait until login is fully complete
  await page.waitForURL('**/logged-in-successfully/**');

  // Save session
  await context.storageState({ path: 'state.json' });
});
