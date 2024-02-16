import { test, expect } from '@wordpress/e2e-test-utils-playwright';

// We have multiple tests in this file, all requiring us to be authenticated.
// eslint-disable-next-line
test.use({ storageState: process.env.WP_AUTH_STORAGE });

// async function deleteLastFeatureFlag(page) {
// 	await page
// 		.locator('id=mr-feature-flag-item')
// 		.last()
// 		.getByLabel('Delete Flag')
// 		.click();

// 	await page.getByRole('button', { name: 'Yes' }).click();
// }

test.describe('Feature flags', () => {
	test('Create and delete flags', async ({ page, admin }) => {
		await admin.visitAdminPage('/');

		//Find the feature flags in side menu
		await page.getByRole('link', { name: 'Feature Flags' }).click();

		//Confirm the setting page header
		await expect(
			page.getByRole('heading', { name: 'Feature Flags settings' })
		).toBeVisible();

		//Create new flag
		await page.getByRole('button', { name: 'Add Flag' }).click();
		// await expect(await page.getByRole('textbox').count()).toBe(4);
		await page.getByRole('textbox').last().fill('hello');
		await page.getByRole('button', { name: 'Save' }).click();

		//Confirm save success
		expect(
			await page.getByLabel('Dismiss this notice').innerText()
		).toMatch(/Saved successfully!/);

		//Create another flag with same name
		await page.getByRole('button', { name: 'Add Flag' }).click();
		await page.getByRole('textbox').last().fill('hello');
		expect(page.getByText('Flag name already exists')).toBeTruthy();
		expect(await page.getByRole('button', { name: 'Save' })).toBeDisabled();

		//update flag name
		await page.getByRole('textbox').last().fill('hello 2');
		expect(
			page.getByText(
				'Flag name should not contain spaces. Allowed special characters are - and _'
			)
		).toBeTruthy();
		expect(await page.getByRole('button', { name: 'Save' })).toBeDisabled();

		await page
			.locator('id=mr-feature-flag-item')
			.last()
			.getByLabel('Delete Flag')
			.click();

		await page.getByRole('button', { name: 'Yes' }).click();

		//Confirm delete success
		expect(
			await page.getByLabel('Dismiss this notice').innerText()
		).toMatch(/Saved successfully!/);

		await page
			.locator('id=mr-feature-flag-item')
			.last()
			.getByLabel('Delete Flag')
			.click();

		await page.getByRole('button', { name: 'Yes' }).click();
	});
});
