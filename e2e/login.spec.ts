import { test, expect } from '@playwright/test'
import { PageManager } from '../pages/pageManager';
import { baseURL as configBaseURL } from "../playwright.config";
const rawBaseURL = typeof configBaseURL === 'string' ? configBaseURL : process.env.BASE_URL || 'http://localhost:3000';
const baseURL = rawBaseURL.replace(/\/+$/, ''); // Remove trailing slashes

test.beforeEach('Perform Login', async ({ page }) => {
    const pm = new PageManager(page)
    await page.goto(`${baseURL}/practice-test-login/`)
    const username = process.env.USERNAME
    const password = process.env.PASSWORD
    if (!username || !password) {
        throw new Error('USERNAME and PASSWORD environment variables must be set')
    }
    await pm.onLoginPage().testLogin(username, password)
});
test('Verify user is redirected to logged-in page after login', async ({ page }) => {
    await expect(page).toHaveURL('/logged-in-successfully/');
});

test('Verify success message text', async ({ page }) => {
    const pageText = await page.textContent('body');
    expect(
        pageText?.toLowerCase().includes('congratulations') ||
        pageText?.toLowerCase().includes('successfully logged in')
    ).toBeTruthy();
});

test('Verify "Log out"', async ({ page }) => {
    const pm = new PageManager(page)
    await Promise.all([
        page.waitForURL(`${baseURL}/practice-test-login/`, { timeout: 10000 }),
        pm.onLoggedinPage().logOut()
    ]);
    const expectedURL = `${baseURL}/practice-test-login/`;
    expect(page.url()).toEqual(expectedURL);
});