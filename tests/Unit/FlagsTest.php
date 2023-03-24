<?php

namespace MR\FeatureFlags\Api;

use \PHPUnit\Framework\TestCase;
use Mockery\Adapter\Phpunit\MockeryPHPUnitIntegration;
use \Brain\Monkey;
use \Brain\Monkey\Functions;




class FlagsTest extends \PHPUnit\Framework\TestCase
{

    public function setUp() : void {
		parent::setUp();
		Monkey\setUp();
	}

	protected function tearDown():void
    {
        Monkey\tearDown();
        parent::tearDown();
    }

	public function test_get_all_flags_method_should_return_all_flags_from_options_table() {
		$mock_option_value = [['id'=>1, 'name'=>'Test','enabled'=>true]];

		\Brain\Monkey\Functions\when('get_option')->justReturn($mock_option_value);
		\Brain\Monkey\Functions\when('rest_ensure_response')->returnArg();

		$flags = new Flags();
		$result = $flags->get_all_flags();
		$this->assertEquals($result, $mock_option_value);
	}

	public function test_get_all_flags_method_should_return_empty_array_if_value_is_not_set() {
		$mock_option_value = '';

		\Brain\Monkey\Functions\when('get_option')->justReturn($mock_option_value);
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

	// public function test_post_flag_works() {
	// 	$request = \Brain\Monkey\Functions\mock('WP_Request', [['id'=>1, 'name'=>'Test','enabled'=>true]]);

	// 	$mock_option_value = [['id'=>1, 'name'=>'Test','enabled'=>true]];
	// 	\Brain\Monkey\Functions\when('update_option')->justReturn($mock_option_value);
	// 	\Brain\Monkey\Functions\when('rest_ensure_response')->returnArg();

	// 	$flags = new Flags();
	// 	$result = $flags->post_flags($request);
	// 	var_dump($result);

	// }

	// public function test_post_flags() {
	// 	$request_data = array( 'flag1' => true, 'flag2' => false );
	// 	$request = \Brain\Monkey\Functions\mock( 'WP_REST_Request' );
	// 	$request->expects( 'get_json_params' )->once()->andReturn( $request_data );

	// 	\Brain\Monkey\Functions\expect( 'update_option' )
	// 		->once()
	// 		->with( self::$option_name, $request_data )
	// 		->andReturn( true );

	// 	$result = $this->obj->post_flags( $request );

	// 	$this->assertInstanceOf( 'WP_REST_Response', $result );
	// 	$this->assertEquals(
	// 		array(
	// 			'status'  => 200,
	// 			'success' => true,
	// 		),
	// 	);
	// }

	public function test_post_flags() {
		// Set up mock request object with JSON data
		$request_data = array( 'flag1' => true, 'flag2' => false );
		$request = new \stdClass();
		$request->set_body_params( $request_data );

		// Mock the update_option function
		$expected_option_name = 'my_option';
		$expected_option_value = $request_data;
		\Brain\Monkey\Functions\expect( 'update_option' )
			->once()
			->with( $expected_option_name, $expected_option_value )
			->andReturn( true );

		// Call the post_flags method with the mock request
		$response = $this->obj->post_flags( $request );

		// Check that the response is a WP_REST_Response object with expected data
		$this->assertInstanceOf( 'WP_REST_Response', $response );
		$this->assertEquals( array( 'status' => 200, 'success' => true ), $response->get_data() );
	}
}
