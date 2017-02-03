<?php
    if (!defined("_ALORESAL_")) {
		exit;
	}
?>

        <div id="page-wrapper" class="gray-bg">
        <div class="row border-bottom">
        <nav class="navbar navbar-static-top white-bg" role="navigation" style="margin-bottom: 0">
        <div class="navbar-header">
            <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i class="fa fa-bars"></i> </a>

        </div>
            <ul class="nav navbar-top-links navbar-right">
                <li>
                    <span class="m-r-sm text-muted welcome-message" style="font-size:16px;">Welcome <?php echo $_SESSION['username'];?> to <strong><?php echo $site_title; ?></strong></span>
                </li>

                <li>
                    <a href="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/logout' ;?>">
                        <i class="fa fa-sign-out"></i> Log out
                    </a>
                </li>
            </ul>

        </nav>
        </div>
