import { chromium } from 'playwright';
import { PageManager } from './pages/pageManager';

export default async function globalSetup() {
  // 1️⃣ Launch a browser
  const browser = await chromium.launch({ headless: false });

  // 2️⃣ Create a context
  const context = await browser.newContext();

  // 3️⃣ Create a page manually
  const page = await context.newPage();

  // 4️⃣ Navigate to login page using full URL
await page.goto('https://practicetestautomation.com/practice-test-login/');

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

  console.log('Logged in successfully.');

}
