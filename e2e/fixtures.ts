import { test as base, expect, Page } from '@playwright/test';
import { PageManager } from '../pages/pageManager';

// Define a custom fixture for PageManager
export const test = base.extend<{ pm: PageManager }>({
  pm: async ({ page }, use) => {
    const pm = new PageManager(page);
    await use(pm);
  },
});

export { expect };
