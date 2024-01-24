<?php

use MR\FeatureFlags\Flag;
use \Brain\Monkey;

class FlagTest extends \PHPUnit\Framework\TestCase
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

	public function test_is_enabled_method_should_return_true_if_flag_name_present_and_enabled() {
		$mock_option_value = [['id'=>1, 'name'=>'Test','enabled'=>true]];

		\Brain\Monkey\Functions\when('get_option')->justReturn($mock_option_value);

		$result = Flag::is_enabled('Test');
		$this->assertTrue($result);
	}

	public function test_is_enabled_method_should_return_false_if_no_flags_exist() {
		$mock_option_value = '';

		\Brain\Monkey\Functions\when('get_option')->justReturn($mock_option_value);

		$result = Flag::is_enabled('Test');
		$this->assertFalse($result);
	}

	public function test_is_enabled_method_should_return_false_if_flag_name_present_and_disabled() {
		$mock_option_value = [['id'=>1, 'name'=>'Test','enabled'=>false]];

		\Brain\Monkey\Functions\when('get_option')->justReturn($mock_option_value);

		$result = Flag::is_enabled('Test');
		$this->assertFalse($result);
	}

	public function test_is_enabled_method_should_return_false_if_flag_name_nor_present() {
		$mock_option_value = [['id'=>1, 'name'=>'Test','enabled'=>false]];

		\Brain\Monkey\Functions\when('get_option')->justReturn($mock_option_value);

		$result = Flag::is_enabled('Test1');
		$this->assertFalse($result);
	}


}
