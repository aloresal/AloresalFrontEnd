<?php
    if (!defined("_ALORESAL_")) {
		exit;
	}
?>
<body>
    <div id="wrapper">
    <nav class="navbar-default navbar-static-side" role="navigation">
        <div class="sidebar-collapse"  style="font-size:14px;">
            <ul class="nav" id="side-menu">
                <li class="nav-header">
                    <div class="dropdown profile-element"> <span>
                            <img alt="image" class="img-circle" height="78" width="78" src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>img/profile_small.png" />
                             </span>
                        <a data-toggle="dropdown" class="dropdown-toggle" style="text-decoration: none;">
                            <span class="clear"> <span class="block m-t-xs"> <strong class="font-bold"><?php echo $SESSION['username'] ; ?></strong>
                             </span> <span class="text-muted text-xs block">
                             <?php
                             switch($_SESSION['user_role'] ){
                                 case 1:echo 'admin';break;
                                 case 2:echo 'gold membership';break;
                                 case 3:echo 'silver membership';break;
                                 case 4:echo 'premium membership';break;
                                 case 5:echo 'free membership';break;
                             }
                             ?> </span> </span> </a>
						<span class="clear">
						</span>
                    </div>
                    <div class="logo-element">
                        IN+
                    </div>
                </li>
                <li class="active">
                    <a href="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/' ;?>"><i class="fa fa-th-large"></i> <span class="nav-label">Dashboards</span></a>
                </li>
                <li>
                    <a href="http://market.aloresal.com"> <i class="fa fa-money"></i> <span class="nav-label">Buy & Sell Account</span></a>
                </li>
                <li>
                    <?php $apiList = json_decode(file_get_contents('app/lists.json'), true); ?>
                    <a href="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/lists';?>">
                        <i class="fa fa-list-ul"></i>
                        <span class="nav-label"> Account Checker</span>
                        <span class="label label-info pull-right" ><?php echo count($apiList); ?></span>
                    </a>
                </li>
                <li> <!-- your 160x600 banner ads -->
                </li>
            </ul>
        </div>
    </nav>
