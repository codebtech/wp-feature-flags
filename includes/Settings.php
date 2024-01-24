<?php
/**
 * Admin setting page for feature flags
 *
 * @package mr-feature-flags
 * @since 1.0.0
 */

declare(strict_types = 1);

namespace MR\FeatureFlags;

/**
 * Class Settings
 *
 * @package mr-feature-flags
 * @since 1.0.0
 */
class Settings {

	/**
	 * Register feature flag settings page.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function register_feature_settings() {
		add_action( 'admin_menu', [ $this, 'register_settings' ] );
	}

	/**
	 * Register settings action method.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function register_settings() {

		add_menu_page(
			__( 'Feature Flags', 'mr-feature-flags' ),
			__( 'Feature Flags', 'mr-feature-flags' ),
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
