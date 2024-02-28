<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit38c76af14c393316f9746c3dcceb88c4
{
    public static $prefixLengthsPsr4 = array (
        'C' => 
        array (
            'CodeB\\FeatureFlags\\' => 19,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'CodeB\\FeatureFlags\\' => 
        array (
            0 => __DIR__ . '/../..' . '/includes',
        ),
    );

    public static $classMap = array (
        'CodeB\\FeatureFlags\\Api\\Flags' => __DIR__ . '/../..' . '/includes/Api/Flags.php',
        'CodeB\\FeatureFlags\\Flag' => __DIR__ . '/../..' . '/includes/Flag.php',
        'CodeB\\FeatureFlags\\Helper' => __DIR__ . '/../..' . '/includes/Helper.php',
        'CodeB\\FeatureFlags\\Settings' => __DIR__ . '/../..' . '/includes/Settings.php',
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit38c76af14c393316f9746c3dcceb88c4::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit38c76af14c393316f9746c3dcceb88c4::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit38c76af14c393316f9746c3dcceb88c4::$classMap;

        }, null, ClassLoader::class);
    }
}
