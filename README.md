# Feature Flags

[![PHP lint & test](https://github.com/codebtech/wp-feature-flags/actions/workflows/php.yml/badge.svg)](https://github.com/codebtech/wp-feature-flags/actions/workflows/php.yml)
[![JS lint & test](https://github.com/codebtech/wp-feature-flags/actions/workflows/js.yml/badge.svg)](https://github.com/codebtech/wp-feature-flags/actions/workflows/js.yml)
[![E2E Tests](https://github.com/codebtech/wp-feature-flags/actions/workflows/e2e.yml/badge.svg)](https://github.com/codebtech/wp-feature-flags/actions/workflows/e2e.yml)

Feature flags allow developers to configure features in plugins/themes behind the feature flags on both the server (PHP) and client (JS/TS) side.

## Hooks

### JS Filters

##### mrFeatureFlags.newFlag.defaultStatus

The filter controls whether the new flag is enabled by default or not. Default `true`

Example usage:

```js
addFilter('mrFeatureFlags.newFlag.defaultStatus', 'mr-feature-flags', () => {
	return false;
});
```

## Development setup

To build the plugin

PHP setup

-   `composer install`

JS setup

-   `yarn install`
-   `yarn build` to create the build
-   `yarn start` to start the development watch mode

## Linting and formatting

PHP

-   `composer lint`
-   To auto fix the linting errors `composer lint:fix`

💡 [VSCode extension](https://marketplace.visualstudio.com/items?itemName=shevaua.phpcs) to auto format PHP files based on `phpcs.xml.dist` configuration

JS

-   `yarn lint:js`

💡 [VSCode extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) to auto format JS / TS files based on `.prettierrc` configuration

CSS

-   `yarn lint:css`
-   To auto fix the css linting errors `yarn lint:css:fix`

## Testing

### PHP

-   Run `./local` from your preferred CLI. Ensure you have Docker installed and running.
-   The setup will automatically ssh into the container.
-   To run unit tests `composer run test:unit`
-   To run integrations tests `composer run test:integration`
-   To run integrations tests as multisite `composer run test:multisite`

### JS

-   Run `yarn test:js` which will run all jest and React Testing Library tests

### E2E

The E2E tests depends on `wp-env` setup. Ensure you run `wp-env start` before running the tests.

-   Run `yarn test:e2e` which will run all Playwright e2e tests.
