import { test, expect } from '@wordpress/e2e-test-utils-playwright';
import { ERROR_FLAG_EXISTS, ERROR_FLAG_INVALID } from '../../src/constants';
import {
	AddNewFlag,
	AddNewFlagAndFill,
	CloseSdkModal,
	DisableFlag,
	OpenSdkModal,
	SaveFlags,
	deleteLastFlag,
} from './helper';

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

	test.afterEach(async ({ page }) => {
		await deleteLastFlag(page);
	});

	test('Create and save new flag successfully', async ({ page }) => {
		await AddNewFlagAndFill(page, 'hello_test');
		await SaveFlags(page);

		expect(
			await page.getByLabel('Dismiss this notice').innerText()
		).toMatch(/Saved successfully!/);
	});

	test('Create new flag and disable it successfully', async ({ page }) => {
		await AddNewFlagAndFill(page, 'test123');
		await SaveFlags(page);

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
	});

	test('Check duplicate and invalid flag', async ({ page }) => {
		//Create new flag
		await AddNewFlagAndFill(page, 'testDuplicate');
		await SaveFlags(page);

		//Confirm save success
		expect(
			await page.getByLabel('Dismiss this notice').innerText()
		).toMatch(/Saved successfully!/);

		//Create another flag with same name should show error
		await AddNewFlagAndFill(page, 'testDuplicate');
		expect(page.getByText(ERROR_FLAG_EXISTS)).toBeVisible();
		expect(page.getByRole('button', { name: 'Save' })).toBeDisabled();

		//update flag name to be unique but still invalid
		await AddNewFlag(page, 'test duplicate');
		expect(page.getByText(ERROR_FLAG_INVALID)).toBeVisible();
		expect(page.getByRole('button', { name: 'Save' })).toBeDisabled();

		//Delete the flag
		await deleteLastFlag(page);

		expect(
			await page.getByLabel('Dismiss this notice').innerText()
		).toMatch(/Saved successfully!/);
	});

	test('Open SDK modal and test the clipboard', async ({ page }) => {
		const flagName = 'testWidget';
		await AddNewFlagAndFill(page, flagName);
		await SaveFlags(page);

		expect(
			await page.getByLabel('Dismiss this notice').innerText()
		).toMatch(/Saved successfully!/);

		await OpenSdkModal(page);

		expect(
			page.getByRole('heading', {
				name: `SDK for feature flag: ${flagName}`,
			})
		).toBeVisible();

		// Check PHP Snippet clipboard details
		await page.getByLabel('Copy to clipboard').first().click();
		const phpClipboardText = await page.evaluate(
			'navigator.clipboard.readText()'
		);
		expect(phpClipboardText).toContain(`Flag::is_enabled( '${flagName}' )`);

		// Check JS Snippet clipboard details
		await page.getByLabel('Copy to clipboard').nth(1).click();
		const jsClipboardText: string = await page.evaluate(
			'navigator.clipboard.readText()'
		);
		expect(jsClipboardText).toContain(
			`window.mrFeatureFlags.isEnabled('${flagName}')`
		);

		//Close SDK modal
		await CloseSdkModal(page);
	});
});
