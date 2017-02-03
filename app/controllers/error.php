<?php	
    if (!defined("_ALORESAL_")) {
		exit; 	
	}
    	
	$f3->set('COOKIE.sent',TRUE);

	$f3->set('header','header.php');

	echo View::instance()->render('layout.php');
    