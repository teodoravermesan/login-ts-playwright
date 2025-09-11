import { test as base, expect } from '@playwright/test';
import { PageManager } from '../pages/pageManager';

export const test = base.extend<{ login: PageManager, navigate: string, manager: PageManager }>({
    // Navigation helper
    navigate: [async ({ page }, use) => {
        await page.goto('/practice-test-login/');
        await use('');
    }, { auto: true }],

    // Page manager for all tests
    manager: [async ({ page }, use) => {
        const pageManager = new PageManager(page);
        await use(pageManager);
    }, { auto: true }],

    // NOTE: This login fixture is kept as an example.
    // The actual login is handled by global-setup.ts for better performance
    login: [async ({ page }, use) => {
        const pageManager = new PageManager(page);
        const username = process.env.USERNAME
        const password = process.env.PASSWORD
        if (!username || !password) {
            throw new Error('USERNAME and PASSWORD environment variables must be set')
        }
        await pageManager.onLoginPage().testLogin(username, password)
        await use(pageManager);
        console.log('Logged in successfully');
    }, { auto: true }],
});

export { expect };
