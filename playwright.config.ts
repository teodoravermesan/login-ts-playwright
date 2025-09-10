import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const isCI = !!process.env.CI;
const isStaging = process.env.STAGING === '1';

export const baseURL = isStaging
  ? 'http://staging.practiceautomation.com/'
  : 'https://practicetestautomation.com/';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 1,
  workers: isCI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'on-first-retry',
  },
  globalSetup: require.resolve('./global-setup.ts'),
  projects: [
    // {
    //   name: 'logout-with-global-setup',
    //   testMatch: 'logout1.spec.ts',
    //   use: { ...devices['Desktop Chrome'] },
    // },

    {
      name: 'login',
      testMatch: 'login-setup.ts',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'logout',
      testMatch: 'logout.spec.ts',
      use: {
        ...devices['Desktop Chrome'],

      },
      dependencies: ['login']

    },
    {
      name: 'logout-with-login-fixture-firefox',
      testMatch: 'login-tests.spec.ts',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'logout-with-login-fixture-safari',
         testMatch: 'login-tests.spec.ts',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'logout-with-login-fixture-chrome',
      testMatch: 'login-tests.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
