<?php

use CodeB\FeatureFlags\Flag;
use Yoast\WPTestUtils\BrainMonkey\TestCase;
use function Brain\Monkey\Functions\when;

class FlagTest extends TestCase {


	public function test_is_enabled_method_should_return_true_if_flag_name_present_and_enabled() {
		$mock_option_value = [
			[
				'id'      => 1,
				'name'    => 'Test',
				'enabled' => true,
			],
		];

		when( 'get_option' )->justReturn( $mock_option_value );

		$result = Flag::is_enabled( 'Test' );
		$this->assertTrue( $result );
	}

	public function test_is_enabled_method_should_return_false_if_no_flags_exist() {

		when( 'get_option' )->justReturn( [] );

		$result = Flag::is_enabled( 'Test' );
		$this->assertFalse( $result );
	}

	public function test_is_enabled_method_should_return_false_if_flag_name_present_and_disabled() {
		$mock_option_value = [
			[
				'id'      => 1,
				'name'    => 'Test',
				'enabled' => false,
			],
		];

		when( 'get_option' )->justReturn( $mock_option_value );

		$result = Flag::is_enabled( 'Test' );
		$this->assertFalse( $result );
	}

	public function test_is_enabled_method_should_return_false_if_flag_name_not_exist() {
		$mock_option_value = [
			[
				'id'      => 1,
				'name'    => 'Test',
				'enabled' => false,
			],
		];

		when( 'get_option' )->justReturn( $mock_option_value );

		$result = Flag::is_enabled( 'Test1' );
		$this->assertFalse( $result );
	}
}
