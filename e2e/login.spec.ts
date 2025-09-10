import { test, expect } from './fixtures';
import { baseURL as configBaseURL } from "../playwright.config";
const rawBaseURL = typeof configBaseURL === 'string' ? configBaseURL : 'http://localhost:3000';
const baseURL = rawBaseURL.replace(/\/+$/, ''); 

test('Verify user is redirected to logged-in page after login', async ({ page , login}) => {
    await expect(page).toHaveURL('/logged-in-successfully/');
});

test('Verify success message text', async ({ page , login}) => {
    const pageText = await page.textContent('body');
    expect(
        pageText?.toLowerCase().includes('congratulations') ||
        pageText?.toLowerCase().includes('successfully logged in')
    ).toBeTruthy();
});

test('Verify "Log out"', async ({ page, pageManager, login }) => {
    await Promise.all([
        page.waitForURL(`${baseURL}/logged-in-successfully/`, { timeout: 10000 }),
        pageManager.onLoggedInPage().logOut()
    ]);
    const expectedURL = `${baseURL}/practice-test-login/`;
    expect(page.url()).toEqual(expectedURL);
});