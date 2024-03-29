import { test } from '@wordpress/e2e-test-utils-playwright';
import { Page } from '@playwright/test';

export async function deleteLastFlag(page: Page) {
	await test.step(
		'Delete last flag',
		async () => {
			await page
				.locator('id=mr-feature-flag-item')
				.last()
				.getByLabel('Delete Flag')
				.click();

			await page.getByRole('button', { name: 'Yes' }).click();
		},
		{ box: true }
	);
}

export async function deleteAllFlags(page: Page) {
	await test.step(
		'Delete all flag',
		async () => {
			const count = await page
				.locator('id=mr-feature-flag-item')
				.getByLabel('Delete Flag')
				.count();

			if (count > 0) {
				for (let i = 0; i < count; ++i) await deleteLastFlag(page);
			}
		},
		{ box: true }
	);
}

export async function AddNewFlag(page: Page, text: string) {
	await test.step(
		'Add new flag',
		async () => {
			await page.getByRole('textbox').last().fill(text);
		},
		{ box: true }
	);
}

export async function AddNewFlagAndFill(page: Page, text: string) {
	await test.step(
		'Add new flag and fill text',
		async () => {
			await page.getByRole('button', { name: 'Add Flag' }).click();
			await page.getByRole('textbox').last().fill(text);
		},
		{ box: true }
	);
}

export async function SaveFlags(page: Page) {
	await test.step(
		'Save flags',
		async () => {
			await page.getByRole('button', { name: 'Save' }).click();
		},
		{ box: true }
	);
}

export async function DisableFlag(page: Page, isEnabled: boolean) {
	await test.step(
		'Toggle flag',
		async () => {
			const labelText = isEnabled ? 'Flag enabled' : 'Flag disabled';
			await page
				.locator('id=mr-feature-flag-item')
				.last()
				.getByLabel(labelText)
				.click();
		},
		{ box: true }
	);
}

export async function OpenSdkModal(page: Page) {
	await test.step(
		'Open sdk modal',
		async () => {
			await page.getByLabel('Click to see SDK setting').last().click();
		},
		{ box: true }
	);
}

export async function CloseSdkModal(page: Page) {
	await test.step(
		'Close sdk modal',
		async () => {
			await page.locator('button[aria-label="Close"]').click();
		},
		{ box: true }
	);
}
