import { test as base, expect } from '@playwright/test';
import { PageManager } from '../pages/PageManager';

// Define a custom fixture for PageManager
export const test = base.extend<{ pageManager: PageManager }>({
    pageManager: async ({ page }, use) => {
        const pageManager = new PageManager(page);
        await use(pageManager);
    },
});

export { expect };
