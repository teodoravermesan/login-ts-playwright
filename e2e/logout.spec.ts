import { test, expect } from './fixtures';
import { baseURL as configBaseURL } from "../playwright.config";
const rawBaseURL = typeof configBaseURL === 'string' ? configBaseURL : 'http://localhost:3000';
const baseURL = rawBaseURL.replace(/\/+$/, ''); // Remove trailing slashes

test('Verify "Log out"', async ({ page, manager }) => {
    await Promise.all([
        page.waitForURL(`${baseURL}/logged-in-successfully/`, { timeout: 10000 }),
        manager.onLoggedInPage().logOut()
    ]);
    const expectedURL = `${baseURL}/practice-test-login/`;
    expect(page.url()).toEqual(expectedURL);
});