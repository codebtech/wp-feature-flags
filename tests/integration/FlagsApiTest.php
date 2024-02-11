<?php
/**
 * @package nuk-wp-block-plugin
 * @since 0.1.0
 */
namespace MR\FeatureFlags\Api;

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