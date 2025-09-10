import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/pageManager';
import { baseURL as configBaseURL } from "../playwright.config";
const rawBaseURL = typeof configBaseURL === 'string' ? configBaseURL : 'http://localhost:3000';
const baseURL = rawBaseURL.replace(/\/+$/, ''); // Remove trailing slashes

test('Verify "Log out"', async ({ page }) => {
    const pageManager = new PageManager(page);
    pageManager.onLoggedInPage().logOut()
    const expectedURL = `${baseURL}/practice-test-login/`;
    expect(page.url()).toEqual(expectedURL);
});
