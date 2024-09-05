// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */

module.exports = defineConfig({
  testDir: './test scripts',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 3,
  reporter: 'html',
  timeout:60000,

  /* Shared settings for all the projects below.*/
  use: {
    headless:false,
    bypassCSP:true,
    // screenshot:'on',
    /* Collect trace when retrying the failed test.*/
    trace: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Amazon and Flipkart Tests',
      testMatch: ['amazon.spec.js', 'flipkart.spec.js'],
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'Bargain Hunter Tests',
      testMatch: ['hunter.spec.js'],
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['Amazon and Flipkart Tests'],
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
    
    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

});

