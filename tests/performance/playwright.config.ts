/**
 * External dependencies
 */
import { join } from 'node:path';
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

process.env.WP_ARTIFACTS_PATH ??= join(process.cwd(), 'artifacts');
const authStoragePath = process.env.WP_AUTH_STORAGE;
process.env.STORAGE_STATE_PATH ??= join(
	process.env.WP_ARTIFACTS_PATH,
	authStoragePath
);
process.env.TEST_ITERATIONS ??= '4';

const config = defineConfig({
	globalSetup: require.resolve('../e2e/global-setup.ts'),
	reporter: process.env.CI
		? [['blob'], ['./config/performance-reporter.ts']]
		: [['list'], ['./config/performance-reporter.ts']],
	forbidOnly: !!process.env.CI,
	workers: 1,
	retries: 0,
	repeatEach: 1,
	timeout: parseInt(process.env.TIMEOUT || '', 10) || 600_000, // Defaults to 10 minutes.
	reportSlowTests: null,
	use: {
		baseURL: process.env.WP_BASE_URL,
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
});

export default config;
