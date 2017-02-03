<?php

define("_ALORESAL_", 1);

/* SPECIFIC ERROR LOG FILE */
@ini_set("log_errors" , "1");
@ini_set("error_log" , 'error-log.php');
@ini_set("display_errors" , "0");

// Kickstart the framework

$f3=require('lib/base.php');

$f3->set('DEBUG',0);

$f3->set('ONERROR',
    function($f3) {
	    // recursively clear existing output buffers:
        while (ob_get_level()) ob_end_clean();
        AloresalFrontEnd::error($f3);
    }
);

if ((float)PCRE_VERSION<7.9)
	trigger_error('PCRE version is out of date');

// Load configuration
$f3->config('config.ini');

include('app/bootstrap.php');

$f3->run();
