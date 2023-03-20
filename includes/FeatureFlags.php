<?php
/**
 * This is the init file for the plugin
 *
 * @package mr-feature-flags
 * @since 1.0.0
 */

declare(strict_types=1);

namespace MR\FeatureFlags;

/**
 * Class FeatureFlags
 *
 * @package mr-feature-flags
 * @since 1.0.0
 */
class FeatureFlags {

	/**
	 * Name in options table.
	 *
	 * @var string $option_name
	 */
	public static $option_name = 'mr_feature_flags';

	/**
	 * Check if given feature is enabled or not.
	 *
	 * @param string $flag name of the flag.
	 * @return bool
	 * @since 1.0.0
	 */
	public static function is_enabled( string $flag ): bool {
		$flags = get_option( self::$option_name );

		if ( Helper::search_flag( $flags, 'name', $flag ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Adds provided flag if it does not exists.
	 *
	 * @param string $flag name of the flag.
	 * @return bool
	 * @throws \Error Throws error if flag already exists.
	 * @since 1.0.0
	 */
	public static function add_flag( string $flag ): bool {

		$flags = get_option( self::$option_name );

		if ( is_array( $flags ) && Helper::search_flag( $flags, 'name', $flag ) ) {
			throw new \Error( "Flag \"{$flag}\" already exists" );
		}

		$flag_key = 1;

		if ( is_array( $flags ) && count( $flags ) ) {
			$flag_key = count( $flags ) + 1;
		}

		// $flag_key = count( $flags ) ? count( $flags ) + 1 : 1;
		// ddd( $flag_key );
		$new_flag = [
			'id'      => $flag_key,
			'name'    => $flag,
			'enabled' => false,
		];

		if ( $flags ) {
			array_push( $flags, $new_flag );
			return update_option( self::$option_name, $flags );
		}

		return add_option( self::$option_name, [ $new_flag ] );

	}
}
