<?php
use Yoast\WPTestUtils\BrainMonkey\TestCase;
use CodeB\FeatureFlags\Settings;

class SettingsTest extends TestCase {

	public function setUp(): void {
		parent::setUp();

		\Brain\Monkey\setUp();

		// Mock the __ function for translation
		\Brain\Monkey\Functions\expect('__')
			->andReturnUsing(function ($string) {
			return $string; // Simulate translation for testing purposes
		});
	}

	public function tearDown(): void {
		\Brain\Monkey\tearDown();
		parent::tearDown();
	}

	public function testRegisterFeatureSettings() {
		$settings = new Settings();

		\Brain\Monkey\Functions\expect('add_action')
			->once()
			->with('admin_menu', [$settings, 'register_settings']);

		$settings->register_feature_settings();
	}

	public function testRegisterSettings() {
		$settings = new Settings();

		\Brain\Monkey\Functions\expect('add_menu_page')
			->once()
			->with(
				'Feature Flags',
				'Feature Flags',
				'manage_options',
				'mr-feature-flags',
				[$settings, 'render_page'],
				'data:image/svg+xml;base64,' . base64_encode( '<svg width="15" height="18" viewBox="0 0 2000 1792" xmlns="http://www.w3.org/2000/svg"><path fill="black" d="M0 896q0-130 51-248.5t136.5-204 204-136.5 248.5-51h768q130 0 248.5 51t204 136.5 136.5 204 51 248.5-51 248.5-136.5 204-204 136.5-248.5 51h-768q-130 0-248.5-51t-204-136.5-136.5-204-51-248.5zm1408 512q104 0 198.5-40.5t163.5-109.5 109.5-163.5 40.5-198.5-40.5-198.5-109.5-163.5-163.5-109.5-198.5-40.5-198.5 40.5-163.5 109.5-109.5 163.5-40.5 198.5 40.5 198.5 109.5 163.5 163.5 109.5 198.5 40.5z"/></svg>' )
			);

		 $settings->register_settings();
	}

	public function testRenderPage() {
		$settings = new Settings();

		ob_start();

		$settings->render_page();

		$output = ob_get_clean();

		$this->assertStringContainsString('<div id="mr_feature_flags_settings_screen"></div>', $output);
	}
}
