<?php
    if (!defined("_ALORESAL_")) {exit; }
?>
<div class="row wrapper border-bottom white-bg page-heading">
	<div class="col-sm-4" style="margin-top:20px;">
		<h2>[API] PayPal (is registered)</h2> </div>
</div>
<div class="row">
	<div class="col-lg-12">
		<div class="wrapper wrapper-content animated fadeInRight">
            <?php echo $this->render('welcome.php'); ?>
			<div class="ibox-content forum-container">
				<div class="forum-title">
					<div class="pull-right forum-desc">
						<samll>
                            <strong>Total Request: <?php echo json_decode(AloresalFrontEnd::pipe("http://".$my_checker_site."/api/statistics?api=". $_SESSION['api']), true)['stats']['request']['month']; ?></strong>
                        </samll>
					</div>
					<h3>PayPal (is registered) API</h3> </div>
				<div class="forum-item active">
					<div class="row">
						<div class="col-md-14">
							<!-- START -->
							<div class="row">
								<div class="form-group">
									<div class="col-md-8"> <label for="mailpass">Account</label> <textarea class="form-control" name="mailpass" id="mailpass" rows="7" placeholder="EMAIL"></textarea> </div>
									<div class="col-md-2"> <label for="socks">socks</label> <textarea class="form-control" name="socks" id="socks" rows="7" placeholder="127.0.0.1:8080" >127.0.0.1:8080</textarea> </div>
								</div>
								<div class="checkbox i-checks"><label> <input name="login" id="login" type="checkbox" value="1" disabled="" checked=""> <i></i> Validation </label></div>
								<div class="checkbox i-checks"><label> <input name="info" id="info" type="checkbox" value="1" disabled="" checked=""> <i></i> Info </label></div>
								<div class="checkbox i-checks"><label> <input name="other" id="other" type="checkbox" value="1" disabled="" checked=""> <i></i> Other </label></div>
							</div>
						</div>
					</div>
				</div>
				<div class="forum-item active">
					<div class="row">
						<div class="col-md-14">
							<!-- START -->
							<div class="row">
								<div class="form-group">
									<div class="" style="text-align: center;">
                                        <?php //echo $this->render('server.list.php');?>
										Method:
                                        <select class="form-control m-b" name="method" id="method" style="text-align: center;display:inline;width: 100px;margin-right: 8px;padding: 4px;" >
                                            <option value="0">method 1</option>
                                            <option value="1">method 2</option>
                                            <option value="2">method 3</option>
                                        </select>
                                        Delim: <input name="delim" id="delim" style="text-align: center;display:inline;width: 40px;margin-right: 8px;padding: 4px;" value="|" class="form-control" type="text">
                                        Interval: <input name="interval" id="interval" style="text-align: center;display:inline;width: 40px;margin-right: 8px;padding: 4px;" value="1" class="form-control" type="text">
                                        <button type="button" class="btn btn-success btn-metro" id="submitPaypal">START</button>
                                        <button type="button" class="btn btn-danger btn-metro disabled" id="stop" >Stop</button>
										<div style="text-align: center;"></div>
                                        <br>
                                        <div id="loading" style="display:none;">

                                            <div class="sk-spinner sk-spinner-wave" style="margin-left:50%;margin-right:50%;">
                                                <div class="sk-rect1"></div>
                                                <div class="sk-rect2"></div>
                                                <div class="sk-rect3"></div>
                                                <div class="sk-rect4"></div>
                                                <div class="sk-rect5"></div>
                                            </div>
                                        </div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
            <?php echo $this->render('donate.php'); ?>


				<div style="" id="result">
					<div class="panel panel-default">
						<div class="panel-heading" style="padding: 13px 0px 4px 8px;">
							<h3 class="panel-title">
                                <b><a href="#tools" data-toggle="modal" class="btn btn-info btn-metro btn-xs  tooltips" data-placement="top" title="" data-original-title="Statistic"><i class="fa fa-flask"></i> Statistic</a></b>
								<button id="reset_stat" class="btn btn-default btn-xs"><i class="fa fa-exclamation-circle"></i> Reset Result</button>
							</h3>
                        </div>
						<div class="panel-body"><b></b>
							<div class="row"><b>
                                </b>
								<div class="p-xs">
									<div class="progress progress-striped active">
										<div id="progressbar" style="width: 0%" aria-valuemax="100" aria-valuemin="0" aria-valuenow="0" role="progressbar" class="progress-bar progress-bar-success"> <span class="sr-only" id="progressbar">0%</span> </div>
									</div>
                                    <span id="percentcheck"></span> Account </b> <span> | </span>
									<font color="#000"><b>All: <span id="count_all">0</span></b></font> |
									<font color="#000"><b>Live: <span id="tvmit_live_counts">0</span></b></font> |
									<font color="#000"><b>Die: <span id="tvmit_die_counts">0</span></b></font> |
									<font color="#000"><b>Un+Inv: <span id="tvmit_unk_counts">0</span></b></font> |
                                    <span id="checkStatus">Idle </span><span> |</span>
                                    <span id="current_socks">Idle </span>
                                    <span id="time_counter" style="display:none;"> | You've wasted <strong><span id="requesttime">0</span></strong> minutes in your life</span>
                                    <br>

									<div id="sound"></div>
                                </div>
							</div>
						</div>
					</div>

					<?php echo $this->render('result.php');?>
					<?php echo $this->render('log.php');?>

				</div>
				

		</div>
	</div>
</div>
<div class="wrapper wrapper-content">
	<div class="row">
		<div class="col-lg-12">
			<div id="disqus_thread"></div>
		</div>
	</div>
</div>
