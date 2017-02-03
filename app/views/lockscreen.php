<?php
    if (!defined("_ALORESAL_")) {
		exit;
	}
?>

<body class="gray-bg"  style="background: url(<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/img/background.jpg';?>) no-repeat center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;">
	<div class="text-center loginscreen animated fadeInDown" style="margin-bottom:-50px;margin-top:50px;" >
		<h1 style="font-size: 130px;color:#e6e6e6;"><?php echo $site_title; ?></h1>
	</div>
	<div class="middle-box text-center loginscreen animated fadeInDown">
        <div>
            <h3>Welcome to <?php echo $site_title; ?></h3>
            <p>Perfectly built and precisely prepared online based super tool with over 120 feature.
            </p>
			<?php if(isset($message)) echo $message; ?>
            <p>Login in. To see it in action.</p>
            <form class="m-t" method="post" action="<?php echo $BASE; ?>/session">
                <div class="form-group">
                    <input type="text" id="apikey" name="apikey"  class="form-control" placeholder="Aloresal API Key" required="">
                </div>
                <button type="submit" class="btn btn-primary block full-width m-b">Login</button>

                <a href="<?php echo $aloresal_portal_server; ?>/login_facebook"><small>Can't login?</small></a>
                <p class="text-muted text-center"><small>Do not have an account?</small></p>
                <a class="btn btn-sm btn-white btn-block" href="<?php echo $aloresal_portal_server; ?>/register">Create an account</a>
            </form>
            <p class="m-t"> <small><?php echo $site_title; ?> &copy; 2016. Powered by <a href="<?php echo $aloresal_portal_server; ?>">Aloresal Front End</a></p>
        </div>
    </div>

    <!-- Mainly scripts -->
    <script src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>js/jquery-2.1.1.js"></script>
    <script src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>js/bootstrap.min.js"></script>
</body>
