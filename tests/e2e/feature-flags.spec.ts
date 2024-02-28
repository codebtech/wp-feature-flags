import { test, expect } from '@wordpress/e2e-test-utils-playwright';
import { ERROR_FLAG_EXISTS, ERROR_FLAG_INVALID } from '../../src/constants';
import { AddNewFlag, AddNewFlagAndFill, DisableFlag, SaveFlags, deleteLastFlag } from './helper';

// eslint-disable-next-line
test.use({ storageState: process.env.WP_AUTH_STORAGE });

test.describe('Feature flags', () => {
	test.beforeEach(async ({ page, admin }) => {
		await admin.visitAdminPage('/');

		//Find the feature flags in side menu
		await page.getByRole('link', { name: 'Feature Flags' }).click();

		//Confirm the setting page header
		await expect(
			page.getByRole('heading', { name: 'Feature Flags settings' })
		).toBeVisible();
	});

	test('Create and delete flags e2e scenarios', async ({ page }) => {
		//Create new flag
		await AddNewFlagAndFill(page, 'test');
		await SaveFlags(page);

		//Confirm save success
		expect(
			await page.getByLabel('Dismiss this notice').innerText()
		).toMatch(/Saved successfully!/);

		await DisableFlag(page, true);

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
		await AddNewFlagAndFill(page, 'test');
		expect(page.getByText(ERROR_FLAG_EXISTS)).toBeVisible();
		expect(page.getByRole('button', { name: 'Save' })).toBeDisabled();

		//update flag name to be unique and check text validation.
		await AddNewFlag(page, 'test 2');
		expect(page.getByText(ERROR_FLAG_INVALID)).toBeVisible();
		expect(page.getByRole('button', { name: 'Save' })).toBeDisabled();

		//Delete the flag
		await page
			.locator('id=mr-feature-flag-item')
			.last()
			.getByLabel('Delete Flag')
			.click();
		// await deleteLastFlag(page);
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
		//Close SDK modal
		await page.locator('button[aria-label="Close"]').click();

		//Delete the created flag
		await deleteLastFlag(page);
	});
});
