import { test, expect } from '@playwright/test'
import { PageManager } from '../pages/pageManager';
import { baseURL } from "../playwright.config"

test.beforeEach('Perform Login', async ({ page }) => {
    const pm = new PageManager(page)
    await page.goto('/practice-test-login/')
    await pm.onLoginPage().testLogin(process.env.USERNAME, process.env.PASSWORD)
});

test('Verify new page URL', async ({ page }) => {
    const currentURL = page.url();
    // Build expected full URL from baseURL + relative path
    const expectedURL = new URL('logged-in-successfully/', baseURL).href;

    expect(currentURL).toContain(expectedURL);
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
    await pm.onLoggedinPage().logOut()
    await page.waitForURL('/practice-test-login/');  // relative to baseURL
    const expectedURL = new URL('/practice-test-login/', baseURL).href;
    expect(page.url()).toEqual(expectedURL);
});