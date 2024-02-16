import { test, expect } from '@wordpress/e2e-test-utils-playwright';

// We have multiple tests in this file, all requiring us to be authenticated.
// Compare this to the front-end.spec.ts.
test.use({ storageState: process.env.WP_AUTH_STORAGE });

test.describe('Feature flags', () => {
	test('Navigate to feature flag settings', async ({ page, admin }) => {
		await admin.visitAdminPage('/');

		await page.getByRole('link', { name: 'Feature Flags' }).click();

		await expect(
			page.getByRole('heading', { name: 'Feature Flags settings' })
		).toBeVisible();

		await page.getByRole('button', { name: 'Add Flag' }).click();

		await expect(await page.getByRole('textbox').count()).toBe(4);

		await page.getByRole('textbox').last().fill('hello');

		await page.getByRole('button', { name: 'Save' }).click();

		await expect(await page.getByText('Saved successfully!')).toBeVisible();
	});
});
