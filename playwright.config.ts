import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: 'tests/e2e',
	globalSetup: 'tests/e2e/global-setup.ts',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: 4,
	reporter: 'html',
	use: {
		baseURL: process.env.WP_BASE_URL,
		trace: 'on-first-retry',
		permissions: ['clipboard-read'],
	},

	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
});
