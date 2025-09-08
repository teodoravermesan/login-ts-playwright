import { test, expect } from './fixtures';
import { baseURL as configBaseURL } from "../playwright.config";
const rawBaseURL = typeof configBaseURL === 'string' ? configBaseURL : process.env.BASE_URL || 'http://localhost:3000';
const baseURL = rawBaseURL.replace(/\/+$/, ''); // Remove trailing slashes

test.beforeEach('Perform Login', async ({ page, pageManager }) => {
    await page.goto(`${baseURL}/practice-test-login/`)
    const username = process.env.USERNAME
    const password = process.env.PASSWORD
    if (!username || !password) {
        throw new Error('USERNAME and PASSWORD environment variables must be set')
    }
    await pageManager.onLoginPage().testLogin(username, password)
});

test('Login with invalid credentials shows error message', async ({ page, pageManager }) => {
    await page.goto(`${baseURL}/practice-test-login/`);
    await pageManager.onLoginPage().testLogin('invalidUser', 'invalidPass');
    const errorMessage = await page.locator('.show').textContent();
    expect(errorMessage?.toLowerCase()).toContain('invalid');
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

test('Verify "Log out"', async ({ page, pageManager }) => {
    await Promise.all([
        page.waitForURL(`${baseURL}/practice-test-login/`, { timeout: 10000 }),
        pageManager.onLoggedInPage().logOut()
    ]);
    const expectedURL = `${baseURL}/practice-test-login/`;
    expect(page.url()).toEqual(expectedURL);
});