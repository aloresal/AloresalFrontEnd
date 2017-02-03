<?php
    if (!defined("_ALORESAL_")) {
		exit;
	}
?> 

        <div class="footer fixed">
            <div class="pull-right" style="z-index:99;">
				<a id="online-visitors-counter" style="color:#676a6c;"></a>
            </div>
            <div style="font-size:15px;">
                <!--<strong>Copyright</strong>--> <strong><?php echo $site_title; ?></strong> &copy; 2016. Powered by <a href="<?php echo $aloresal_portal_server; ?>">Aloresal Community</a>
            </div>
        </div>
        </div>
        <div id="right-sidebar">
            <div class="sidebar-container">
                <ul class="nav nav-tabs navs-3">
                    <li class=""><a data-toggle="tab" href="#tab-3">
                        <i class="fa fa-gear"></i>
                    </a></li>
                </ul>
                <div class="tab-content">
            </div>
        </div>
    </div>

    <!-- Mainly scripts -->
    <script src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>js/jquery-2.1.1.js"></script>

    <!--<script src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>chat/js/jquery.min.js"></script>-->
    <script src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>js/bootstrap.min.js"></script>
    <script src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

    <!-- Flot -->
    <script src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>js/plugins/flot/jquery.flot.js"></script>
    <script src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>js/plugins/flot/jquery.flot.tooltip.min.js"></script>
    <script src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>js/plugins/flot/jquery.flot.spline.js"></script>
    <script src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>js/plugins/flot/jquery.flot.resize.js"></script>
    <script src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>js/plugins/flot/jquery.flot.pie.js"></script>
    <script src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>js/plugins/flot/jquery.flot.symbol.js"></script>
    <script src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>js/plugins/flot/curvedLines.js"></script>

    <!-- Peity -->
    <script src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>js/plugins/peity/jquery.peity.min.js"></script>
    <script src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>js/demo/peity-demo.js"></script>

    <!-- Custom and plugin javascript -->
    <script src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>js/inspinia.js"></script>
    <script src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>js/plugins/pace/pace.min.js"></script>

    <!-- jQuery UI -->
    <script src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>js/plugins/jquery-ui/jquery-ui.min.js"></script>

    <!-- GITTER -->
    <script src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>js/plugins/gritter/jquery.gritter.min.js"></script>

    <!-- Sparkline -->
    <script src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>js/plugins/sparkline/jquery.sparkline.min.js"></script>

    <!-- Sparkline demo data  -->
    <script src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>js/demo/sparkline-demo.js"></script>

    <!-- ChartJS-->
    <script src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>js/plugins/chartJs/Chart.min.js"></script>

    <!-- Toastr -->
    <script src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>js/plugins/toastr/toastr.min.js"></script>

    <!-- bootbox -->
    <script src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>js/plugins/bootbox/bootbox.min.js"></script>

    <!-- Idle Timer plugin -->
    <script src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>js/plugins/idle-timer/idle-timer.min.js"></script>

    <!-- chat -->
    <script src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>chat/js/chat.js"></script>
    <script src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>chat/js/jquery.emoticons.js"></script>

    <?php if(isset($customJs)) echo $customJs ; ?>

    <script>

		    var chaturl = '<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/chat';?>';

    </script>


</body>
</html>
