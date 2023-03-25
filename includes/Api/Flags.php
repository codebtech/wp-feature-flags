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
class Flags {

	/**
	 * Name in options table.
	 *
	 * @var string $option_name
	 */
	public static $option_name = 'mr_feature_flags';

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
							'permission_callback' => function () {
								return current_user_can( 'manage_options' );
							},
						],
						[
							'methods'             => \WP_REST_SERVER::EDITABLE,
							'callback'            => [ $this, 'post_flags' ],
							'permission_callback' => function () {
								return current_user_can( 'manage_options' );
							},
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

}