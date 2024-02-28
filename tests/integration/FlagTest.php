<?php
use MR\FeatureFlags\Flag;
use Yoast\WPTestUtils\WPIntegration\TestCase;

class FlagTest extends TestCase{

	public function test_is_enabled_returns_true_if_flags_exists_and_enabled(): void {
		// Set up test data
		$optionValue = [['id' => 1, 'name' => 'test', 'enabled' => true ]];
		update_option(Flag::$option_name, $optionValue);

		$result = Flag::is_enabled('test');

		$this->assertTrue($result);
	}

	public function test_is_enabled_returns_false_if_flags_exists_and_disabled(): void {
		// Set up test data
		$optionValue = [['id' => 1, 'name' => 'test', 'enabled' => false ]];
		update_option(Flag::$option_name, $optionValue);

		$result = Flag::is_enabled('test');

		$this->assertFalse($result);
	}

	public function test_is_enabled_returns_false_if_flags_not_exists(): void {
		// Set up test data
		$optionValue = [['id' => 1, 'name' => 'test2', 'enabled' => true ]];
		update_option(Flag::$option_name, $optionValue);

		$result = Flag::is_enabled('test');

		$this->assertFalse($result);
	}

	public function test_is_enabled_returns_false_if_option_is_empty(): void {
		// Set up test data
		$optionValue = [];
		update_option(Flag::$option_name, $optionValue);

		$result = Flag::is_enabled('test');

		$this->assertFalse($result);
	}

	public function test_is_enabled_returns_false_if_option_not_exists(): void {

		$result = Flag::is_enabled('test');

		$this->assertFalse($result);
	}
}
