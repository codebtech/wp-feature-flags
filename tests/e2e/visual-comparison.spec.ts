import { test, expect } from '@wordpress/e2e-test-utils-playwright';
import {
	AddNewFlagAndFill,
	CloseSdkModal,
	DisableFlag,
	OpenSdkModal,
	SaveFlags,
	deleteAllFlags,
} from './helper';

test.describe('Visual tests', () => {
	test.use({ storageState: process.env.WP_AUTH_STORAGE });

	test.beforeEach(async ({ page, admin }) => {
		await admin.visitAdminPage('/');
		await page.getByRole('link', { name: 'Feature Flags' }).click();
	});

	test.afterEach(async ({ page }) => {
		await deleteAllFlags(page);
	});

	test('Feature flags screen without flags', async ({ page }) => {
		await expect(page).toHaveScreenshot('no-flags.png');
	});

	test('Feature flags screen with some flags', async ({ page }) => {
		await AddNewFlagAndFill(page, 'hello_test');
		await AddNewFlagAndFill(page, '123');
		await DisableFlag(page, true);
		await AddNewFlagAndFill(page, 'healthCheck');

		await SaveFlags(page);
		await expect(page).toHaveScreenshot('some-flags.png');
	});

	test('Toggle feature flag', async ({ page }) => {
		await AddNewFlagAndFill(page, 'auth0');
		await DisableFlag(page, true);
		await expect(page).toHaveScreenshot('flag-disabled.png');
	});

	test('Delete flag modal', async ({ page }) => {
		await AddNewFlagAndFill(page, 'helloWorld');

		await page
			.locator('id=mr-feature-flag-item')
			.last()
			.getByLabel('Delete Flag')
			.click();

		await expect(page).toHaveScreenshot('delete-flag-modal.png');

		await page.getByRole('button', { name: 'Yes' }).click();
	});

	test('SDK modal', async ({ page }) => {
		await AddNewFlagAndFill(page, 'drag-drop');
		await OpenSdkModal(page);

		await expect(page).toHaveScreenshot('sdk-modal.png');

		await CloseSdkModal(page);
	});
});
