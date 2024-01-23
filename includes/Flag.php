<?php
/**
 * Utility class to expose flag methods.
 *
 * @package mr-feature-flags
 * @since 1.0.0
 */

declare(strict_types = 1);

namespace MR\FeatureFlags;

use MR\FeatureFlags\Helper\Helper;

/**
 * Utils class for feature flags
 *
 * @package mr-feature-flags
 * @since 1.0.0
 */
class Flag {

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
}
