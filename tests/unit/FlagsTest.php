<?php

use MR\FeatureFlags\Api\Flags;
use Yoast\WPTestUtils\BrainMonkey\TestCase;

class FlagsTest extends TestCase
{

	public function test_get_all_flags_method_should_return_all_flags_from_options_table() {
		$mock_option_value = [['id'=>1, 'name'=>'Test','enabled'=>true]];

		\Brain\Monkey\Functions\when('get_option')->justReturn($mock_option_value);
		\Brain\Monkey\Functions\when('rest_ensure_response')->returnArg();

		$flags = new Flags();
		$result = $flags->get_all_flags();
		$this->assertEquals($result, $mock_option_value);
	}

	public function test_get_all_flags_method_should_return_empty_array_if_value_is_not_set() {
		
		\Brain\Monkey\Functions\when('get_option')->justReturn([]);
		\Brain\Monkey\Functions\when('rest_ensure_response')->returnArg();

		$flags = new Flags();
		$result = $flags->get_all_flags();
		$this->assertEquals($result, []);
	}

	public function test_get_all_flags_method_should_return_multiple_flags_from_options_table() {
		$mock_option_value = [['id'=>1, 'name'=>'Test','enabled'=>true],['id'=>2, 'name'=>'Test2','enabled'=>false]];

		\Brain\Monkey\Functions\when('get_option')->justReturn($mock_option_value);
		\Brain\Monkey\Functions\when('rest_ensure_response')->returnArg();

		$flags = new Flags();
		$result = $flags->get_all_flags();
		$this->assertEquals($result, $mock_option_value);
	}
	
}
