<?php
/**
 * This is the init file for the plugin
 *
 * @package mr-feature-flags
 * @since 1.0.0
 */

declare(strict_types=1);

namespace MR\FeatureFlags\Helper;

/**
 * Class FeatureFlags
 *
 * @package mr-feature-flags
 * @since 1.0.0
 */
class Helper {

	/**
	 * Flag search helper, returns true if flag is found and enabled.
	 *
	 * @param array  $flags flags array.
	 * @param string $field field to search.
	 * @param string $flag name of the flag.
	 * @return boolean
	 * @since 1.0.0
	 */
	public static function search_flag( $flags, $field, $flag ) {
		if ( is_array( $flags ) ) {
			foreach ( $flags as $key => $value ) {
				if ( $value[ $field ] === $flag && true === $value['enabled'] ) {
					return true;
				}
			}
		}
		return false;
	}
}