<?php
/**
 * @package nuk-wp-block-plugin
 * @since 0.1.0
 */
namespace CodeB\FeatureFlags\Api;

use WP_REST_Request;
use WP_UnitTest_Factory;
use WP_Test_REST_Controller_Testcase;


class FlagsApiTest extends WP_Test_REST_Controller_Testcase {

	protected Flags $instance;

	protected static $editor;
	protected static $admin;

	protected static $api_endpoint = '/feature-flags/v1/flags';

	public static function wpSetUpBeforeClass( WP_UnitTest_Factory $factory ) {
		self::$editor = $factory->user->create(
			array(
				'role' => 'editor',
			)
		);

		self::$admin = $factory->user->create(
			array(
				'role' => 'administrator',
			)
		);
	}

	public static function wpTearDownAfterClass() {
		wp_delete_user( self::$editor );
		delete_option( Flags::$option_name );
	}

	public function set_up() {
		parent::set_up();
		$this->instance = new Flags();
		$this->instance->register();
	}

	public function test_register() {
		$this->assertSame( 10, has_action( 'rest_api_init', array( $this->instance, 'register_routes' ) ) );
	}


	public function test_register_routes() {
		$this->instance->register_routes();
		$routes = rest_get_server()->get_routes();
		$this->assertArrayHasKey( self::$api_endpoint, $routes );
	}

	public function test_get_items_no_permission() {
		wp_set_current_user( 0 );
		$request  = new WP_REST_Request( 'GET', self::$api_endpoint );
		$response = rest_get_server()->dispatch( $request );
		$this->assertErrorResponse( 'rest_forbidden', $response, 401 );

		wp_set_current_user( self::$editor );
		$response = rest_get_server()->dispatch( $request );
		$this->assertErrorResponse( 'rest_forbidden', $response, 403 );
	}

	public function test_get_items_as_admin_returns_200() {
		wp_set_current_user( self::$admin );
		$request  = new WP_REST_Request( 'GET', self::$api_endpoint );
		$response = rest_get_server()->dispatch( $request );
		$this->assertSame( 200, $response->get_status() );
		$this->assertEquals([], $response->get_data());
	}

	public function test_get_items() {
		wp_set_current_user( self::$admin );
		$flags = [['id'=>1, 'name'=>'test', 'enabled'=>true], ['id'=>2, 'name'=>'test2', 'enabled'=>false]];
		update_option( Flags::$option_name, $flags );

		$request  = new WP_REST_Request( 'GET', self::$api_endpoint );
		$response = rest_get_server()->dispatch( $request );
		$this->assertSame( 200, $response->get_status() );
		$this->assertSame($flags, $response->get_data());
	}

	public function flagsDataProvider() {
		return [
			'invalid input' => [['invalid' => []], false],
			'valid empty input' => [['flags' => []], true],
			'valid input' => [['flags' => [['id'=>1, 'name'=>'test', 'enabled'=>true], ['id'=>2, 'name'=>'test2', 'enabled'=>false]]], true],
		];
	}
	
	/**
	 * @dataProvider flagsDataProvider
	 */
	public function testValidateFlags($inputData, $expectedResult) {
		wp_set_current_user(self::$admin);

		$request = new WP_REST_Request('POST', self::$api_endpoint);
		$request->add_header('Content-Type', 'application/json');
		$request->set_body(wp_json_encode($inputData));

		$result = $this->instance->validate_flag_input($request);

		$this->assertSame($expectedResult, $result);
	}

	public function test_create_item() {
		wp_set_current_user( self::$admin );
		$flags = [['id'=>1, 'name'=>'test', 'enabled'=>true], ['id'=>2, 'name'=>'test2', 'enabled'=>false]];

		$request  = new WP_REST_Request( 'POST', self::$api_endpoint );
		$request->add_header( 'Content-Type', 'application/json' );
		$request->set_body( wp_json_encode( ['flags' => $flags] ) );
		$response = rest_get_server()->dispatch( $request );
		
		$this->assertSame( 200, $response->get_status() );
		$this->assertTrue( $response->get_data()['success'] );

		$options = get_option(Flags::$option_name);
		$this->assertSame($options, $flags);
	}

	public function test_create_item_with_empty_array() {
		wp_set_current_user( self::$admin );
		$flags = [];

		$request  = new WP_REST_Request( 'POST', self::$api_endpoint );
		$request->add_header( 'Content-Type', 'application/json' );
		$request->set_body( wp_json_encode( ['flags' => $flags] ) );
		$response = rest_get_server()->dispatch( $request );
		
		$this->assertSame( 200, $response->get_status() );
		$this->assertTrue( $response->get_data()['success'] );

		$options = get_option(Flags::$option_name);
		$this->assertSame($options, $flags);
	}

	public function test_create_item_with_invalid_input_array() {
		wp_set_current_user( self::$admin );
		$flags = [['id'=>1, 'name'=>'test', 'enabled'=>true]];

		$request  = new WP_REST_Request( 'POST', self::$api_endpoint );
		$request->add_header( 'Content-Type', 'application/json' );
		$request->set_body( wp_json_encode( ['invalid' => $flags] ) );
		$response = rest_get_server()->dispatch( $request );
		
		$this->assertErrorResponse( 'rest_invalid_params', $response, 400 );

	}

	public function test_create_item_with_default_max_allowed_filter() {
		wp_set_current_user( self::$admin );
		$flags = [['id'=>1, 'name'=>'test', 'enabled'=>true],
		['id'=>2, 'name'=>'test2', 'enabled'=>false],
		['id'=>3, 'name'=>'test3', 'enabled'=>false],
		['id'=>4, 'name'=>'test4', 'enabled'=>false],
		['id'=>5, 'name'=>'test5', 'enabled'=>false],
		['id'=>6, 'name'=>'test6', 'enabled'=>false],
		['id' => 7, 'name' => 'test7', 'enabled' => true],
		['id' => 8, 'name' => 'test8', 'enabled' => false],
		['id' => 9, 'name' => 'test9', 'enabled' => false],
		['id' => 10, 'name' => 'test10', 'enabled' => false],
		['id' => 11, 'name' => 'test11', 'enabled' => false],
		['id' => 12, 'name' => 'test12', 'enabled' => false],
		['id' => 13, 'name' => 'test13', 'enabled' => false],
		['id' => 14, 'name' => 'test14', 'enabled' => false],
		['id' => 15, 'name' => 'test15', 'enabled' => false],
		['id' => 16, 'name' => 'test16', 'enabled' => false],
		['id' => 17, 'name' => 'test17', 'enabled' => false],
		['id' => 18, 'name' => 'test18', 'enabled' => false],
		['id' => 19, 'name' => 'test19', 'enabled' => false],
		['id' => 20, 'name' => 'test20', 'enabled' => false],
		['id' => 21, 'name' => 'test21', 'enabled' => false],];

		$request  = new WP_REST_Request( 'POST', self::$api_endpoint );
		$request->add_header( 'Content-Type', 'application/json' );
		$request->set_body( wp_json_encode( ['flags' => $flags] ) );
		$response = rest_get_server()->dispatch( $request );
		$response_message = $response->get_data()['message'];

		$this->assertErrorResponse( 'flag_limit_exceeded', $response, 400 );
		$this->assertEquals('Cannot add more than 20 flags', $response_message);

	}

	public function test_create_item_with_custom_max_allowed_filter() {
		wp_set_current_user( self::$admin );

		// Mock the filter hook
		$mocked_max_flags = 3;
		add_filter('mr_feature_flags_max_allowed', function () use ($mocked_max_flags) {
			return $mocked_max_flags;
		});

		$flags = [['id'=>1, 'name'=>'test', 'enabled'=>true], ['id'=>2, 'name'=>'test2', 'enabled'=>false], ['id'=>3, 'name'=>'test2', 'enabled'=>false], ['id'=>4, 'name'=>'test2', 'enabled'=>false]];

		$request  = new WP_REST_Request( 'POST', self::$api_endpoint );
		$request->add_header( 'Content-Type', 'application/json' );
		$request->set_body( wp_json_encode( ['flags' => $flags] ) );
		$response = rest_get_server()->dispatch( $request );
		$response_message = $response->get_data()['message'];
		
		$this->assertErrorResponse( 'flag_limit_exceeded', $response, 400 );
		$this->assertEquals('Cannot add more than 3 flags', $response_message);
	}

	public function test_create_item_without_input() {
		wp_set_current_user( self::$admin );

		$request  = new WP_REST_Request( 'POST', self::$api_endpoint );
		$request->add_header( 'Content-Type', 'application/json' );
		$response = rest_get_server()->dispatch( $request );
		
		$this->assertErrorResponse( 'rest_invalid_params', $response, 400 );

	}

	/**
	 * @doesNotPerformAssertions
	 */
	public function test_context_param() {}

	/**
	 * @doesNotPerformAssertions
	 */
	public function test_get_item() {}

	/**
	 * @doesNotPerformAssertions
	 */
	public function test_update_item() {}

	/**
	 * @doesNotPerformAssertions
	 */
	public function test_prepare_item() {}

	/**
	 * @doesNotPerformAssertions
	 */
	public function test_get_item_schema() {}

	/**
	 * @doesNotPerformAssertions
	 */
	public function test_delete_item() {}
}
