import { expect, test } from '@wordpress/e2e-test-utils-playwright';
import { camelCaseDashes } from '../utils';

const results: Record<string, number[]> = {};

test.use({ storageState: process.env.WP_AUTH_STORAGE });
test.describe('Feature flags Perf Tests', () => {
	// After all results are processed, attach results for further processing.
	// For easier handling, only one attachment per file.
	test.afterAll(async ({}, testInfo) => {
		await testInfo.attach('results', {
			body: JSON.stringify(results, null, 2),
			contentType: 'application/json',
		});
	});

	const iterations = Number(process.env.TEST_ITERATIONS);
	for (let i = 1; i <= iterations; i++) {
		test(`Measure load time metrics (${i} of ${iterations})`, async ({
			page,
			admin,
			metrics,
		}) => {
			await admin.visitAdminPage('/');
			await page.getByRole('link', { name: 'Feature Flags' }).click();
			await expect(
				page.getByRole('heading', { name: 'Feature Flags' })
			).toBeVisible();

			const serverTiming = await metrics.getServerTiming();

			for (const [key, value] of Object.entries(serverTiming)) {
				results[camelCaseDashes(key)] ??= [];
				results[camelCaseDashes(key)]?.push(value);
			}

			const ttfb = await metrics.getTimeToFirstByte();
			const lcp = await metrics.getLargestContentfulPaint();

			results.largestContentfulPaint ??= [];
			results.largestContentfulPaint.push(lcp);
			results.timeToFirstByte ??= [];
			results.timeToFirstByte.push(ttfb);
			results.lcpMinusTtfb ??= [];
			results.lcpMinusTtfb.push(lcp - ttfb);
		});
	}
});
