<?php
/**
 * This is the init file for the plugin
 *
 * @package codeb-feature-flags
 * @since 0.1.0
 */

declare(strict_types = 1);

namespace CodeB\FeatureFlags;

/**
 * Class FeatureFlags
 *
 * @package codeb-feature-flags
 * @since 0.1.0
 */
class Helper {

	/**
	 * Flag search helper, returns true if flag is found and enabled.
	 *
	 * @param array<int, array{id: int, name: string, enabled: bool}> $flags flags array.
	 * @param string                                                  $field field to search.
	 * @param string                                                  $flag name of the flag.
	 * @return boolean
	 * @since 0.1.0
	 */
	public function search_flag( $flags, $field, $flag ) {
		
		if ( 0 === count( $flags ) ) {
			return false;
		}
		
		foreach ( $flags as $value ) {
			if ( $value[ $field ] === $flag && true === $value['enabled'] ) {
				return true;
			}
		}
		
		return false;
	}
}
