<?php

/**
 * Bootstap file for PHPUnit test.
 *
 * @package mr-feature-flags
 */

if ( file_exists( __DIR__ . '/../vendor/autoload.php' ) ) {
	include __DIR__ . '/../vendor/autoload.php';
}

// Manually determine what test suites we're running to prevent running functional test scripts if not required.
$args = $_SERVER['argv'];

$test_suites = [];
for ( $i = 0; $i < count($args); $i++ ) {
	if ( preg_match( '/--testsuite=(.+)/', $args[$i], $matches ) ) {
		$test_suites[] = $matches[1];
	}
	if ( $args[$i] === '--testsuite' ) {
		$test_suites[] = $args[$i + 1];
		$i++;
	}
}

if ( ! empty( $test_suites ) && ! in_array( 'integration', $test_suites ) ) {
	return;
}

$_tests_dir = getenv( 'WP_TESTS_DIR' );

if ( ! $_tests_dir ) {
	$_tests_dir = rtrim( sys_get_temp_dir(), '/\\' ) . '/wordpress-tests-lib';
}

if ( ! file_exists( $_tests_dir . '/phpunit/includes/functions.php' ) ) {
	echo "Could not find $_tests_dir/phpunit/includes/functions.php, have you run bin/install-wp-tests.sh ?" . PHP_EOL; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	exit( 1 );
}

// Give access to tests_add_filter() function.
require_once $_tests_dir . '/phpunit/includes/functions.php';

/**
 * Manually load the plugin being tested.
 */
function _manually_load_plugin() {
	require __DIR__ . '/../plugin.php';
}
tests_add_filter( 'muplugins_loaded', '_manually_load_plugin' );

if ( $_tests_dir === '/usr/src/vendor/wordpress/wordpress/tests' ) {
	define( 'WP_TESTS_CONFIG_FILE_PATH', __DIR__ . '/../tests/integration/wp-tests-config.php' );
}

define( 'WP_TESTS_PHPUNIT_POLYFILLS_PATH', __DIR__ . '/vendor/yoast/phpunit-polyfills' );

// Start up the WP testing environment.
require $_tests_dir . '/phpunit/includes/bootstrap.php';
