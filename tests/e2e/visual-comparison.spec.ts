import { test } from '@wordpress/e2e-test-utils-playwright';
import {
	AddNewFlagAndFill,
	CloseSdkModal,
	DisableFlag,
	OpenSdkModal,
	SaveFlags,
	deleteAllFlags,
} from './helper';

test.describe.configure({ mode: 'serial' });

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
		await page
			.locator('#codeb_feature_flags_settings_screen')
			.screenshot({ path: 'tests/e2e/screenshots/no-flags.png' });
	});

	test('Feature flags screen with some flags', async ({ page }) => {
		await AddNewFlagAndFill(page, 'hello_test');
		await AddNewFlagAndFill(page, '123');
		await DisableFlag(page, true);
		await AddNewFlagAndFill(page, 'healthCheck');

		await SaveFlags(page);

		await page
			.locator('#codeb_feature_flags_settings_screen')
			.screenshot({ path: 'tests/e2e/screenshots/some-flags.png' });
	});

	test('Toggle feature flag', async ({ page }) => {
		await AddNewFlagAndFill(page, 'auth0');
		await DisableFlag(page, true);
		await page
			.locator('#codeb_feature_flags_settings_screen')
			.screenshot({ path: 'tests/e2e/screenshots/flag-disabled.png' });
	});

	test('Delete flag modal', async ({ page }) => {
		await AddNewFlagAndFill(page, 'helloWorld');

		await page
			.locator('id=mr-feature-flag-item')
			.last()
			.getByLabel('Delete Flag')
			.click();

		await page
			.locator('#codeb_feature_flags_settings_screen')
			.screenshot({
				path: 'tests/e2e/screenshots/delete-flag-modal.png',
			});

		await page.getByRole('button', { name: 'Yes' }).click();
	});

	test('SDK modal', async ({ page }) => {
		await AddNewFlagAndFill(page, 'drag-drop');
		await OpenSdkModal(page);

		await page
			.locator('#codeb_feature_flags_settings_screen')
			.screenshot({ path: 'tests/e2e/screenshots/sdk-modal.png' });

		await CloseSdkModal(page);
	});
});
