<?php	
    if (!defined("_ALORESAL_")) {
		exit; 	
	}
    
	$f3->set('COOKIE.sent',TRUE);

	$f3->set('header','header.php');
    
    if($f3->get('PARAMS')[0] == '/session')	$f3->set('content','lockscreen.php');
    if($f3->get('PARAMS')[0] == '/register') $f3->set('content','register.php');
    if($f3->get('PARAMS')[0] == '/destroy') $f3->set('content','destroy.php');
    if($f3->get('PARAMS')[0] == '/install')	{
		if (!file_exists('app/setup.sql')) {            
			$f3->reroute('/');
        }
        else {
            $f3->set('content','install.php');
        }
    }
	echo View::instance()->render('layout.php');
    