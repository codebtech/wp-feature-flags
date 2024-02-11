<?php

declare(strict_types = 1);

/**
 * Bootstap file for PHPUnit integration tests.
 *
 * @package mr-feature-flags
 */

use function Yoast\WPTestUtils\WPIntegration\bootstrap_it;

require_once dirname( __DIR__, 2 ) . '/vendor/yoast/wp-test-utils/src/WPIntegration/bootstrap-functions.php';

// Env var setup in Dockerfile
$_tests_dir = getenv( 'WP_TESTS_DIR' );

define( 'WP_TESTS_PHPUNIT_POLYFILLS_PATH', dirname( __DIR__, 2 ) . '/vendor/yoast/phpunit-polyfills' );

// Give access to tests_add_filter() function.
require_once $_tests_dir . '/includes/functions.php';

/**
 * Manually load the plugin being tested.
 */
function _manually_load_plugin(): void {
	require dirname( __DIR__, 2 ) . '/plugin.php';
}

tests_add_filter( 'muplugins_loaded', '_manually_load_plugin' );

define( 'WP_TESTS_CONFIG_FILE_PATH', __DIR__ . '/wp-tests-config.php' );

bootstrap_it();
