import { test, expect } from '@wordpress/e2e-test-utils-playwright';

// We have multiple tests in this file, all requiring us to be authenticated.
// Compare this to the front-end.spec.ts.
test.use({ storageState: process.env.WP_AUTH_STORAGE });

test.describe('Feature flags', () => {
	test('Navigate to feature flag settings', async ({ page, admin }) => {
		await admin.visitAdminPage('/');

		//Find the feature flags in side menu
		await page.getByRole('link', { name: 'Feature Flags' }).click();

		//Confirm the setting page header
		await expect(
			page.getByRole('heading', { name: 'Feature Flags settings' })
		).toBeVisible();

		//Create new flag
		await page.getByRole('button', { name: 'Add Flag' }).click();
		await expect(await page.getByRole('textbox').count()).toBe(4);
		await page.getByRole('textbox').last().fill('hello');
		await page.getByRole('button', { name: 'Save' }).click();

		//Confirm save success
		await expect(
			await page.getByLabel('Dismiss this notice').innerText()
		).toMatch(/Saved successfully!/);
	});
});
