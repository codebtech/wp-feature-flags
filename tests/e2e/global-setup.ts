import { request } from '@playwright/test';
import { RequestUtils } from '@wordpress/e2e-test-utils-playwright';

// Before any tests are run, we sign in, save the cookies set by WordPress, and then discard the session.
// Later, when we need to act as a logged-in user, we make those cookies available.
// https://playwright.dev/docs/test-global-setup-teardown#configure-globalsetup-and-globalteardown
export default async function globalSetup() {
	const requestContext = await request.newContext({
		baseURL: process.env.WP_BASE_URL,
	});
	const requestUtils = new RequestUtils(requestContext, {
		storageStatePath: process.env.WP_AUTH_STORAGE,
		user: {
			username: process.env.WP_USERNAME || '',
			password: process.env.WP_PASSWORD || '',
		},
	});

	// Alternatively, we could take a more traditional route,
	// filling in the input fields for the username and password and submitting the form.
	// https://playwright.dev/docs/test-global-setup-teardown#example
	await requestUtils.setupRest();
	await requestContext.dispose();
}
