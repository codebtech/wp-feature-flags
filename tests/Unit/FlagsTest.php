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

	public function test_post_flags_methods_should_return_success_if_input_is_array() {
		$this->markTestIncomplete(
			'This test has not been implemented yet.'
		  );
		$request_mock = \Mockery::mock('WP_Request');
		$request_mock->shouldReceive('get_json_params')->andReturn(['param1' => 'value1']);

		\Brain\Monkey\Functions\when('update_option')->justReturn(true);
		\Brain\Monkey\Functions\when('rest_ensure_response')->returnArg();

		global $wp;
		$wp = new \stdClass();
		$wp->request = $request_mock;

		$flags = new Flags();
		$result = $flags->post_flags($request_mock);

		$this->assertEquals(['status'=>200, 'success' => true], $result);

        unset($GLOBALS['wp']);
    }

	public function test_post_flags_methods_should_throw_error_if_input_is_not_an_array() {
		$this->markTestIncomplete(
			'This test has not been implemented yet.'
		  );
        $request_mock = \Mockery::mock('WP_Request');
        $request_mock->shouldReceive('get_json_params')->andReturn('test');

        global $wp;
        $wp = new \stdClass();
        $wp->request = $request_mock;

		$error_mock = \Mockery::mock('WP_Error');

		\Brain\Monkey\Functions\expect('post_flags')->andReturn($error_mock);


		$flags = new Flags();
		$result = $flags->post_flags($request_mock);

		$this->assertInstanceOf('WP_Error', $result);

    }


}
