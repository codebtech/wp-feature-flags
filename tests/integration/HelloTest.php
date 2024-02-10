<?php
/**
 * @package nuk-wp-block-plugin
 * @since 0.1.0
 */

use Yoast\WPTestUtils\WPIntegration\TestCase;

 class HelloIntegrationTest extends TestCase {

	// TODO: https://core.trac.wordpress.org/ticket/57844
	public function test_hello_integration_test():void {
		$this->assertTrue( post_type_exists( 'page' ) );
	}

}
