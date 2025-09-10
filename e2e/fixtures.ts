import { test as base, expect, Page } from '@playwright/test';
import { PageManager } from '../pages/pageManager';

export const test = base.extend<{ login: PageManager, navigate: string }>({

    navigate: [async ({ page }, use) => {
        await page.goto('/practice-test-login/');
        await use('');
    }, { auto: true }],

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
