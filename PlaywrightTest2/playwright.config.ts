import { defineConfig, devices } from '@playwright/test';

import dotenv from 'dotenv';
import path from 'path';
import { secrets } from './src/util/secret';
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: secrets.get("BASEURL"),

     trace: 'on',
     screenshot: 'only-on-failure',
     video: 'on-first-retry'
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

  ],

});
