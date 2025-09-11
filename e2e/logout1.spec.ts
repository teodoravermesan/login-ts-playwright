import { test, expect } from './fixtures';
import { baseURL } from "../playwright.config";

test('Verify "Log out"', async ({ page, manager }) => {
    // Since we're already logged in from global setup, we can directly test logout
    await manager.onLoggedInPage().logOut();
    
    // Verify we are redirected to the login page
    const expectedURL = `${baseURL}practice-test-login/`;
    await expect(page).toHaveURL(expectedURL);
});