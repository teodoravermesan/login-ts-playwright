import { test, expect } from '@playwright/test'
import { PageManager } from '../pages/pageManager';

test.beforeEach('Perform Login', async ({ page }) => {
    const pm = new PageManager(page)
    await page.goto('https://practicetestautomation.com/practice-test-login/')
    await pm.onLoginPage().testLogin(process.env.USERNAME, process.env.PASSWORD)
});

test('Verify new page URL', async ({ page }) => {
    const currentURL = page.url();
    expect(currentURL).toContain('practicetestautomation.com/logged-in-successfully/');
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
    page.waitForTimeout(3000)
    expect(page.url()).toEqual('https://practicetestautomation.com/practice-test-login/')
});



