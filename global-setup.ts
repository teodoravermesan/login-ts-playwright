import { chromium } from 'playwright';
import { PageManager } from './pages/pageManager';
import { baseURL } from './playwright.config';

export default async function globalSetup() {
  // Check if we're running in CI
  const isCI = process.env.CI || process.env.GITHUB_ACTIONS;
  
  // 1️⃣ Launch a browser (headless in CI, non-headless in local dev)
  const browser = await chromium.launch({ 
    headless: isCI ? true : false
  });

  try {
    // 2️⃣ Create a context
    const context = await browser.newContext();

    // 3️⃣ Create a page
    const page = await context.newPage();

    // 4️⃣ Navigate to login page using baseURL
    await page.goto(`${baseURL}practice-test-login/`);

    // 5️⃣ Perform login
    const pageManager = new PageManager(page);
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    
    if (!username || !password) {
      throw new Error('USERNAME and PASSWORD environment variables must be set');
    }
    
    await pageManager.onLoginPage().testLogin(username, password);

    // 6️⃣ Wait until login is complete
    await page.waitForURL('**/logged-in-successfully/**');

    // 7️⃣ Store authentication state
    await context.storageState({ path: './auth.json' });

    console.log('✅ Login successful - Auth state has been saved');
  } catch (error) {
    console.error('❌ Global setup failed:', error);
    throw error;
  } finally {
    // 8️⃣ Close browser
    await browser.close();
  }
}
