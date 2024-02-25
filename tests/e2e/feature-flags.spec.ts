import { test, expect } from '@wordpress/e2e-test-utils-playwright';
import { ERROR_FLAG_EXISTS, ERROR_FLAG_INVALID } from '../../src/constants';

// eslint-disable-next-line
test.use({ storageState: process.env.WP_AUTH_STORAGE });

test.describe('Feature flags', () => {
	test('Create and delete flags e2e scenarios', async ({ page, admin }) => {
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
		await page.getByRole('textbox').last().fill('test');
		await page.getByRole('button', { name: 'Save' }).click();
		//Confirm save success
		expect(
			await page.getByLabel('Dismiss this notice').innerText()
		).toMatch(/Saved successfully!/);

		//Toggle flag test
		await page
			.locator('id=mr-feature-flag-item')
			.last()
			.getByLabel('Flag enabled')
			.click();
		expect(
			await page.getByLabel('Dismiss this notice').innerText()
		).toMatch(/Saved successfully!/);
		expect(
			page
				.locator('id=mr-feature-flag-item')
				.last()
				.getByLabel('Flag disabled')
		).toBeVisible();

		//Create another flag with same name
		await page.getByRole('button', { name: 'Add Flag' }).click();
		await page.getByRole('textbox').last().fill('test');
		expect(page.getByText(ERROR_FLAG_EXISTS)).toBeVisible();
		expect(page.getByRole('button', { name: 'Save' })).toBeDisabled();

		//update flag name to be unique and check text validation.
		await page.getByRole('textbox').last().fill('test 2');
		expect(page.getByText(ERROR_FLAG_INVALID)).toBeVisible();

		expect(page.getByRole('button', { name: 'Save' })).toBeDisabled();

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

		//Check SDK modal details.
		await page.getByLabel('Click to see SDK setting').last().click();
		expect(
			page.getByRole('heading', { name: 'SDK for feature flag: test' })
		).toBeVisible();

		// Check PHP Snippet clipboard details
		await page.getByLabel('Copy to clipboard').first().click();
		const phpClipboardText = await page.evaluate(
			'navigator.clipboard.readText()'
		);
		expect(phpClipboardText).toContain("Flag::is_enabled( 'test' )");

		// Check JS Snippet clipboard details
		await page.getByLabel('Copy to clipboard').nth(1).click();
		const jsClipboardText: string = await page.evaluate(
			'navigator.clipboard.readText()'
		);
		expect(jsClipboardText).toContain(
			"window.mrFeatureFlags.isEnabled('test')"
		);

		await page.locator('button[aria-label="Close"]').click();

		await page
			.locator('id=mr-feature-flag-item')
			.last()
			.getByLabel('Delete Flag')
			.click();

		await page.getByRole('button', { name: 'Yes' }).click();
	});
});
