import { defineConfig, PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = defineConfig({
  reporter: [
    ['html', { open: 'never' }],
  ],

  testDir: './tests',
  timeout: 5 * 60 * 1000,
  expect: {
    timeout: 120000,
  },
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  workers: 1,

  use: {
    actionTimeout: 0,
    trace: 'on-first-retry',
    viewport: null,
    browserName: 'chromium',
    launchOptions: {
      args: ['--start-maximized'],
      slowMo: 100,
    },
  },

  projects: [
    {
      name: 'QA_environment',
      use: { 
        baseURL: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
        browserName: 'firefox',
        launchOptions: {
          args: process.env.CI ? ['--start-maximized'] : [],
        },
        trace: 'on-first-retry',
      },
    },
  ],
});

export default config;
