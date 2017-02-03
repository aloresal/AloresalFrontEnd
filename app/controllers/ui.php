<?php
    if (!defined("_ALORESAL_")) {
		exit;
	}

    $site_url = $f3->get('SCHEME').'://'.$f3->get('HOST').($f3->get('PORT') && $f3->get('PORT')!=80 && $f3->get('PORT')!=443?(':'.$f3->get('PORT')):'').$f3->get('BASE');
    $cookiePath = $f3->get('BASE');
    $cookiePath .= ($f3->get('BASE') == "" ? "" : "/");

    $f3->set('ESCAPE',FALSE);
    $f3->set('customJs','

    <script>
		var THIS_SITE_URL = "' . $site_url .'";
		var SITE_URL = "' . $site_url . '/api/'.$f3->get('account_checker').'";

		// Append config box / Only for demo purpose
		// Uncomment on server mode to enable XHR calls
		$.get("'.$f3->get('SCHEME').'://'.$f3->get('HOST').($f3->get('PORT') && $f3->get('PORT')!=80 && $f3->get('PORT')!=443?(':'.$f3->get('PORT')):'').$f3->get('BASE').'/assets/skin-config.html", function (data) {
			if (!$("body").hasClass("no-skin-config"))
				$("body").append(data);
		});
		$("body").removeClass("skin-2");
		$("body").removeClass("skin-3");
		$("body").addClass("skin-1");
		$("body").addClass("fixed-sidebar");

		var cookiePath = "' . $cookiePath . '";

		'. ($f3->get('account_checker') == 'index' ? '$(document).ready (function() {inspiniaChat("'.$f3->get('SESSION.username').'");});': '') .'

    </script>

    <script src="'. $site_url.'/assets/js/yukichanchecker/yukichanchecker.js"></script>
    '. (file_exists('assets/js/yukichanchecker/'.$f3->get('account_checker').'.js') ?
            '<script src="'.$site_url.'/assets/js/yukichanchecker/'.$f3->get('account_checker').'.js"></script>' :
            '<script src="'.$site_url.'/assets/js/yukichanchecker/default.js"></script>') .'
    <script src="'. $site_url.'/assets/js/counter.js"></script>

    ');

	$f3->set('header','header.php');
	$f3->set('navigator','navigator.php');
	$f3->set('topheader','topheader.php');
    $apiList = json_decode(file_get_contents('app/lists.json'), true);
    $flag = 0;
    foreach($apiList as $key => $value){
        if($value['router'] == $f3->get('account_checker')
                || $f3->get('account_checker') == 'index'
                || $f3->get('account_checker') == 'lists') $flag = 1;
    }

    if($flag == 1){
        if(file_exists($f3->get('UI') . 'ui.'.$f3->get('account_checker') .'.php')) {
        	$f3->set('content','ui.'.$f3->get('account_checker') .'.php');
        }else{
            $f3->set('content','ui.default.php');
        }
    }else{
    	$f3->set('content', 'error.404.php');
    }
	$f3->set('footer','footer.php');
	echo View::instance()->render('layout.php');
