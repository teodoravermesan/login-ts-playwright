import { test as base, expect, Page } from '@playwright/test';
import { PageManager } from '../pages/pageManager';
import { baseURL as configBaseURL } from "../playwright.config";
const rawBaseURL = typeof configBaseURL === 'string' ? configBaseURL : 'http://localhost:3000';
const baseURL = rawBaseURL.replace(/\/+$/, ''); // Remove trailing slashes

export const test = base.extend<{ pageManager: PageManager, login: string }>({
    pageManager: async ({ page }, use) => {
        const pageManager = new PageManager(page);
        await use(pageManager);
    },

    login: async ({ page , pageManager}, use) => {
        await page.goto('/practice-test-login/');
        await page.goto(`${baseURL}/practice-test-login/`)
        const username = process.env.USERNAME
        const password = process.env.PASSWORD
        if (!username || !password) {
            throw new Error('USERNAME and PASSWORD environment variables must be set')
        }
        await pageManager.onLoginPage().testLogin(username, password)
        await use('');
    }
});

export { expect };
