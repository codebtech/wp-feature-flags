<?php
/**
 * API class for feature flags options
 *
 * @package mr-feature-flags
 * @since 1.0.0
 */

declare(strict_types=1);

namespace MR\FeatureFlags\Api;

/**
 * Class Settings
 *
 * @package mr-feature-flags
 * @since 1.0.0
 */
class FlagOptions {

	/**
	 * Name in options table.
	 *
	 * @var string $option_name
	 */
	public static $option_name = 'mr_feature_flags';

	/**
	 * Name of flag environment.
	 *
	 * @var string $env_option_name
	 */
	public static $env_option_name = 'mr_feature_flags_env';

	/**
	 * Register feature flag endpoints.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function register_flags_endpoints() {
		add_action(
			'rest_api_init',
			function () {
				register_rest_route(
					'feature-flags/v1',
					'flags',
					[
						[
							'methods'             => \WP_REST_SERVER::READABLE,
							'callback'            => [ $this, 'get_all_flags' ],
							'permission_callback' => '__return_true',
						],
						[
							'methods'             => \WP_REST_SERVER::EDITABLE,
							'callback'            => [ $this, 'post_flags' ],
							'permission_callback' => '__return_true',
						],
					]
				);

				register_rest_route(
					'feature-flags/v1',
					'flags/env',
					[
						[
							'methods'             => \WP_REST_SERVER::READABLE,
							'callback'            => [ $this, 'get_flag_env' ],
							'permission_callback' => '__return_true',
						],
					]
				);

			}
		);
	}

	/**
	 * Get all flags from options
	 *
	 * @return mixed List of flags.
	 */
	public function get_all_flags() {
		$flags = get_option( self::$option_name );

		if ( empty( $flags ) ) {
			return rest_ensure_response( [] );
		}

		return rest_ensure_response( $flags );
	}

	/**
	 * Insert / Update flags in options table.
	 *
	 * @param WP_Request $request API request.
	 *
	 * @return mixed List of flags.
	 */
	public function post_flags( $request ) {
		$flags = $request->get_json_params();

		if ( is_array( $flags ) ) {
			$result = update_option( self::$option_name, $flags );
			return rest_ensure_response(
				array(
					'status'  => 200,
					'success' => true,
				),
			);

		} else {
			return new \WP_Error( 'invalid_input', 'Cannot update flags', array( 'status' => 400 ) );
		}
	}

	/**
	 * Get Feature Flag environment.
	 *
	 * @return mixed List of flags.
	 */
	public function get_flag_env() {
		$env = get_option( self::$env_option_name );

		if ( empty( $env ) ) {
			return rest_ensure_response( [ 'env' => 'prod' ] );
		}

		return rest_ensure_response( $env );
	}

	/**
	 * Register settings action method.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function register_settings() {

		add_menu_page(
			'Feature Flags',
			'Feature Flags',
			'manage_options',
			'mr-feature-flags',
			[ $this, 'render_page' ],
			'data:image/svg+xml;base64,' . base64_encode( '<svg width="15" height="18" viewBox="0 0 2000 1792" xmlns="http://www.w3.org/2000/svg"><path fill="black" d="M0 896q0-130 51-248.5t136.5-204 204-136.5 248.5-51h768q130 0 248.5 51t204 136.5 136.5 204 51 248.5-51 248.5-136.5 204-204 136.5-248.5 51h-768q-130 0-248.5-51t-204-136.5-136.5-204-51-248.5zm1408 512q104 0 198.5-40.5t163.5-109.5 109.5-163.5 40.5-198.5-40.5-198.5-109.5-163.5-163.5-109.5-198.5-40.5-198.5 40.5-163.5 109.5-109.5 163.5-40.5 198.5 40.5 198.5 109.5 163.5 163.5 109.5 198.5 40.5z"/></svg>' )
		);
	}

	/**
	 * Render page
	 */
	public function render_page() {
		echo '<div id="mr_feature_flags_settings_screen"></div>';
	}
}
