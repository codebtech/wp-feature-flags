# WordPress Feature Flags

[![PHP lint & test](https://github.com/codebtech/wp-feature-flags/actions/workflows/php.yml/badge.svg)](https://github.com/codebtech/wp-feature-flags/actions/workflows/php.yml)
[![JS lint & test](https://github.com/codebtech/wp-feature-flags/actions/workflows/js.yml/badge.svg)](https://github.com/codebtech/wp-feature-flags/actions/workflows/js.yml)
[![E2E Tests](https://github.com/codebtech/wp-feature-flags/actions/workflows/e2e.yml/badge.svg)](https://github.com/codebtech/wp-feature-flags/actions/workflows/e2e.yml)
[![codecov](https://codecov.io/github/codebtech/wp-feature-flags/graph/badge.svg?token=QNUWGCRJGR)](https://codecov.io/github/codebtech/wp-feature-flags)

Stable tag: 0.3.2
Requires at least: 6.2
Tested up to: 6.4
Requires PHP: 8.1

WordPress Feature flags plugin allow developers to configure features in plugins/themes behind the feature flags on both the server (PHP) and client (JS/TS) side.

## Installation

`composer require codeb/wp-feature-flags`

Packagist: https://packagist.org/packages/codeb/wp-feature-flags

## Hooks

### PHP filters

#### `codeb_feature_flags_max_allowed`

Filter to define the maximum number of allowed flags. It is recommended to keep this to default value, which is 20.

Example usage:

```php
add_filter(
	'codeb_feature_flags_max_allowed',
	static function () {
		return 10;
	}
);
```

### JS filters

##### `codebFeatureFlags.newFlag.defaultStatus`

The filter controls whether the new flag is enabled by default or not. Default `true`

Example usage:

```js
addFilter(
	'codebFeatureFlags.newFlag.defaultStatus',
	'codeb-feature-flags',
	() => {
		return false;
	}
);
```

## Development setup

To build the plugin

PHP setup

-   `composer install`

JS setup

-   `yarn install`
-   `yarn build` to create the build
-   `yarn start` to start the watch mode

### wp-env

This plugin uses `wp-env` setup to for local environment.

-   `wp-env start` to start the containers
-   `wp-env stop` to stop the containers

More details on how to access local environment can be found [here](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/#quick-tldr-instructions).

## Linting and formatting

PHP

-   `composer lint`
-   `composer lint:fix` to auto fix PHP linting errors.

JS

-   `yarn lint:js`
-   `yarn lint:js:fix` to auto fix JS linting errors.

CSS

-   `yarn lint:css`
-   `yarn lint:css:fix` to auto fix CSS linting errors.

## Testing

### PHP

The WordPress unit and integration tests depends on `wp-env` setup. Ensure you run `yarn wp-env:coverage` before running the tests.

-   To run unit tests `yarn php:unit`
-   To run integrations tests `yarn php:integration`
-   To run integrations tests as multisite `yarn php:multisite`

### JS

-   Run `yarn test:js` to run all Jest and React Testing Library tests

### E2E

The E2E tests depends on `wp-env` setup. Ensure you run `wp-env start` before running the tests.

-   Run `yarn test:e2e` to run all Playwright e2e tests.

## Contributing

Code contributions, feedback, issue reporting and feature suggestions are welcome. See [CONTRIBUTING.md](https://github.com/codebtech/wp-feature-flags/blob/main/CONTRIBUTING.md) for more details.
