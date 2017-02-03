<?php
    if (!defined("_ALORESAL_")) {
		exit;
	}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $site_title . ((isset($account_checker) ? ' - '.$account_checker : '')); ?></title>
    <link href="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>css/bootstrap.min.css" rel="stylesheet">
    <link href="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>font-awesome/css/font-awesome.css" rel="stylesheet">

    <!-- Morris -->
    <link href="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>css/plugins/morris/morris-0.4.3.min.css" rel="stylesheet">

    <!-- Toastr style -->
    <link href="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>css/plugins/toastr/toastr.min.css" rel="stylesheet">

    <!-- Gritter -->
    <link href="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>js/plugins/gritter/jquery.gritter.css" rel="stylesheet">

    <link href="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>css/animate.css" rel="stylesheet">
    <link href="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>css/style.css" rel="stylesheet">

    <!-- Chat -->
    <link href="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>chat/css/fbemoticons.css" rel="stylesheet">
</head>
