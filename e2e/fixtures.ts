import { test as base, expect, Page } from '@playwright/test';
import { PageManager } from '../pages/pageManager';

// Define a custom fixture for PageManager
export const test = base.extend<{ pageManager: PageManager }>({
    pageManager: async ({ page }, use) => {
        const pageManager = new PageManager(page);
        await use(pageManager);
    },
});

export { expect };
