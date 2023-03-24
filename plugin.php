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
use MR\FeatureFlags\Api\Flags;

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


		$feature_flag_meta = get_option( FeatureFlags::$option_name );
		$flags_list = [];
		if(is_array($feature_flag_meta)) {
			$flags_list = $feature_flag_meta;
		}


		wp_localize_script(
			'mr-feature-flags-script',
			'mrFeatureFlags',
			[
				'flags' => $flags_list,
			]
		);

	}
);

add_action(
	'admin_enqueue_scripts',
	function( string $page ): void {
		if ( 'toplevel_page_mr-feature-flags' === $page ) {
			load_settings_scripts();
		}
	}
);

/**
 * Load settings page assets
 *
 * @return void
 */
function load_settings_scripts(): void {
	$plugin_url          = plugin_dir_url( MR_FEATURE_FLAGS_PLUGIN_PATH );
	$settings_asset_file = require_once plugin_dir_path( MR_FEATURE_FLAGS_PLUGIN_PATH ) . 'build/settings.asset.php'; // @phpcs:ignore

	wp_enqueue_script(
		'mr-feature-flags',
		$plugin_url . 'build/settings.js',
		$settings_asset_file['dependencies'],
		$settings_asset_file['version'],
		true
	);

	wp_enqueue_style( 'wp-edit-blocks' );

	wp_enqueue_style(
		'mr-feature-flags',
		$plugin_url . 'build/settings.css',
		[],
		$settings_asset_file['version']
	);

}

add_action(
	'admin_enqueue_scripts',
	function(string $page): void {
		$plugin_url        = plugin_dir_url( MR_FEATURE_FLAGS_PLUGIN_PATH );
		$script_asset_file = include_once plugin_dir_path( MR_FEATURE_FLAGS_PLUGIN_PATH ) . 'build/index.asset.php';

		wp_enqueue_script(
			'mr-feature-flags-script',
			$plugin_url . 'build/index.js',
			$script_asset_file['dependencies'],
			$script_asset_file['version'],
			true
		);

		$feature_flag_meta = get_option( FeatureFlags::$option_name );
		$flags_list = [];
		if(is_array($feature_flag_meta)) {
			$flags_list = $feature_flag_meta;
		}


		wp_localize_script(
			'mr-feature-flags-script',
			'mrFeatureFlags',
			[
				'flags' => $flags_list,
			]
		);

	}
);

$mr_feature_flags_admin_settings = new Settings();
$mr_feature_flags_admin_settings->register_feature_settings();

$mr_feature_flags_register_api = new Flags();
$mr_feature_flags_register_api->register_flags_endpoints();



add_filter( 'plugin_action_links_mr-feature-flags/plugin.php', function ( $links )
	{

		$url = esc_url(
			add_query_arg(
				'page',
				'mr-feature-flags',
				get_admin_url() . 'admin.php'
			)
		);

		$settings_link = "<a href='$url'>" . __( 'Settings', 'mr-feature-flags' ) . '</a>';

		array_push(
			$links,
			$settings_link
		);
		return $links;
	}
);
