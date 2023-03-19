<?php
/**
 * The plugin bootstrap file
 *
 * @since 1.0.0
 * @package mr-feature-flags
 *
 * @wordpress-plugin
 * Plugin Name:       Feature Flags
 * Description:       Allows developers to enable / disable features based on flags.
 * Version:           1.0.0
 * Author:            Mohan Raj
 * Author URI:        https://mohanraj.dev
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       mr-feature-flags
 */

declare( strict_types = 1 );

namespace MR\FeatureFlags;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * API and Plugin version constants.
 */
define( 'MR_FEATURE_FLAGS_PLUGIN_PATH', __FILE__ );


if ( ! file_exists( FeatureFlags::class ) ) {
	include_once __DIR__ . '/vendor/autoload.php';
}

add_action(
	'wp_enqueue_scripts',
	function(): void {
		$plugin_url        = plugin_dir_url( MR_FEATURE_FLAGS_PLUGIN_PATH );
		$script_asset_file = include_once plugin_dir_path( MR_FEATURE_FLAGS_PLUGIN_PATH ) . 'build/index.asset.php';

		wp_enqueue_script(
			'mr-feature-flags-script',
			$plugin_url . 'build/index.js',
			$script_asset_file['dependencies'],
			$script_asset_file['version'],
			true
		);

		wp_enqueue_style(
			'mr-feature-flags-style',
			$plugin_url . 'build/index.css',
			[],
			$script_asset_file['version']
		);

		wp_localize_script(
			'mr-feature-flags-script',
			'mrFeatureFlags',
			[
				'flags' => get_option( FeatureFlags::$option_name ),
			]
		);

	}
);

add_action(
	'admin_enqueue_scripts',
	function(): void {
		$plugin_url        = plugin_dir_url( MR_FEATURE_FLAGS_PLUGIN_PATH );
		$script_asset_file = include_once plugin_dir_path( MR_FEATURE_FLAGS_PLUGIN_PATH ) . 'build/index.asset.php';

		wp_enqueue_script(
			'mr-feature-flags-script',
			$plugin_url . 'build/index.js',
			$script_asset_file['dependencies'],
			$script_asset_file['version'],
			true
		);

		wp_enqueue_style(
			'mr-feature-flags-style',
			$plugin_url . 'build/index.css',
			[],
			$script_asset_file['version']
		);

		wp_localize_script(
			'mr-feature-flags-script',
			'mrFeatureFlags',
			[
				'flags' => get_option( FeatureFlags::$option_name ),
			]
		);

	}
);
