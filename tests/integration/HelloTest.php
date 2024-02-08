<?php
/**
 * @package nuk-wp-block-plugin
 * @since 0.1.0
 */

class HelloIntegrationTest extends \WP_UnitTestCase {

	public function test_hello_integration_test():void {
		$this->assertTrue( post_type_exists( 'page' ) );
	}

}
