<?php

namespace MR\FeatureFlags;

use \PHPUnit\Framework\TestCase;
use Mockery\Adapter\Phpunit\MockeryPHPUnitIntegration;
use Brain\Monkey;



class HelperTest extends \PHPUnit\Framework\TestCase
{
    // Adds Mockery expectations to the PHPUnit assertions count.
    use MockeryPHPUnitIntegration;

    protected function tearDown():void
    {
        Monkey\tearDown();
        parent::tearDown();
    }

	public function test_search_flag_method_should_return_true_if_flag_name_present_and_enabled() {
		$result = Helper::search_flag([['id'=>1, 'name'=>'Test','enabled'=>true]],'name','Test');
		$this->assertTrue($result);
	}

	public function test_search_flag_method_should_return_false_if_flags_are_empty() {
		$result = Helper::search_flag([],'name','Test');
		$this->assertFalse($result);
	}

	public function test_search_flag_method_should_return_false_if_flag_name_present_but_disabled() {
		$result = Helper::search_flag([],'name','Test');
		$this->assertFalse($result);
	}

	public function test_search_flag_method_should_return_false_if_flag_not_present() {
		$result = Helper::search_flag([['id'=>1, 'name'=>'Test','enabled'=>true]],'name','Test1');
		$this->assertFalse($result);
	}
}
