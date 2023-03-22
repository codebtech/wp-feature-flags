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
class Helper {

	/**
	 * Name of flag environment.
	 *
	 * @var string $env_option_name
	 */
	public static $env_option_name = 'mr_feature_flags_env';

	/**
	 * Flag search helper.
	 *
	 * @param array  $flags flags array.
	 * @param string $field field to search.
	 * @param string $flag name of the flag.
	 * @return mixed
	 * @since 1.0.0
	 */
	public static function search_flag( $flags, $field, $flag ) {
		if ( is_array( $flags ) ) {
			foreach ( $flags as $key => $value ) {
				$current_env = get_option( self::$env_option_name );
				$env_field = 'enabled';
 				if( $current_env === 'pre-prod' ) {
					$env_field = 'preProdEnabled';
				}

				if ( $value[ $field ] === $flag && true === $value[ $env_field]  ) {
					return $value;
				}
			}
		}
		return false;
	}
}
