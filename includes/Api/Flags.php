<?php
/**
 * API class for feature flags options
 *
 * @package mr-feature-flags
 * @since 1.0.0
 */

declare(strict_types = 1);

namespace MR\FeatureFlags\Api;

use WP_Error;
use WP_REST_Server;
use WP_REST_Request;

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
	 * @since 1.0.0
	 */
	public function register(): void {
		add_action(
			'rest_api_init',
			[ $this, 'register_routes' ]
		);
	}

	/**
	 * Register routes.
	 * 
	 * * @since 1.0.0
	 */
	public function register_routes(): void {
		register_rest_route(
			'feature-flags/v1',
			'flags',
			[
				[
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => [ $this, 'get_all_flags' ],
					'permission_callback' => static function () {
						return current_user_can( 'manage_options' );
					},
				],
				[
					'methods'             => WP_REST_Server::EDITABLE,
					'callback'            => [ $this, 'post_flags' ],
					'permission_callback' => static function () {
						return current_user_can( 'manage_options' );
					},
					'validate_callback'   => [ $this, 'validate_flag_input' ],
				],
			]
		);
	}

	/**
	 * Get all flags from options
	 *
	 * @return mixed List of flags.
	 */
	public function get_all_flags() {
		$flags = get_option( self::$option_name, [] );
		return rest_ensure_response( $flags );
	}

	/**
	 * Insert / Update flags in options table.
	 *
	 * @param WP_REST_Request $request API request.
	 * @return mixed List of flags.
	 * 
	 * @phpstan-param WP_REST_Request<array{flags?: array}> $request
	 */
	public function post_flags( WP_REST_Request $request ) {
		$input_data = $request->get_json_params();

		if ( is_array( $input_data['flags'] ) ) {
			update_option( self::$option_name, $input_data['flags'] );
			return rest_ensure_response(
				array(
					'status'  => 200,
					'success' => true,
				),
			);
		}

		return new WP_Error( 'invalid_input', 'Cannot update flags', array( 'status' => 400 ) );
	}

	/**
	 * Validates flag input from POST method.
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return bool
	 * 
	 * @phpstan-param WP_REST_Request<array{flags?: array}> $request
	 */
	public function validate_flag_input( WP_REST_Request $request ) {
		$input_data = $request->get_json_params();

		if ( ! isset( $input_data['flags'] ) || gettype( $input_data['flags'] ) !== 'array' ) {
			return false;
		}
		$valid_keys = [ 'id', 'name', 'enabled' ];

		// handle delete all feature flags.
		if ( 0 === count( $input_data['flags'] ) ) {
			return true;
		}

		foreach ( $input_data['flags'] as $flag ) {
			// validate if the input contains allowed values.
			if ( count( array_diff( $valid_keys, array_keys( $flag ) ) ) > 0 ) {
				return false;
			}

			foreach ( $valid_keys as $key ) {
				$value = isset( $flag[ $key ] ) ? $flag[ $key ] : null;
	
				match ( $key ) {
					'id' => is_int( $value ),
					'name' => is_string( $value ),
					'enabled' => is_bool( $value ),
					default => false,
				};
			}
		}

		return true;
	}
}
