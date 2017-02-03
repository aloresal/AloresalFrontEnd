<?php
    if(!defined("_ALORESAL_")){exit;}
?>
<div class="row wrapper border-bottom white-bg page-heading">
	<div class="col-sm-4">
		<h2>[API] Stripe</h2> </div>
</div>
<div class="row">
	<div class="col-lg-12">
		<div class="wrapper wrapper-content animated fadeInRight">
            <?php echo $this->render('welcome.php'); ?>
			<div class="ibox-content forum-container">
				<div class="forum-title">
					<div class="pull-right forum-desc">
						<samll>
                            <strong>Total Request: <?php echo json_decode(Aloresal::pipe("http://".$my_checker_site."/api/statistics?api=". $_SESSION['api']), true)['stats']['request']['month']; ?></strong>
                        </samll>
					</div>
					<h3>Stripe API</h3> </div>
				<div class="forum-item active">
					<div class="row">
						<div class="col-md-14">
							<!-- START -->
							<div class="row">
								<div class="form-group">
									<div class="col-md-6"> <label for="mailpass">Card</label> <textarea class="form-control" name="mailpass" id="mailpass" rows="7" placeholder="NUMBER|MONTH|YEAR|CVV"></textarea> </div>
									<div class="col-md-4"> <label for="stripeapikey">Stripe API Key</label> <textarea class="form-control" name="stripeapikey" id="stripeapikey" rows="7" placeholder="sk_Live_GiRuDATsuCyBUSDx1kjsa2x"></textarea> </div>
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
                                        <?php echo $this->render('server.list.php');?>
                                        Delim: <input name="delim" id="delim" style="text-align: center;display:inline;width: 40px;margin-right: 8px;padding: 4px;" value="|" class="form-control" type="text">
                                        Interval: <input name="interval" id="interval" style="text-align: center;display:inline;width: 40px;margin-right: 8px;padding: 4px;" value="1" class="form-control" type="text">
                                        <button type="button" class="btn btn-success btn-metro" id="submit">START</button>
                                        <button type="button" class="btn btn-danger btn-metro disabled" id="stop" disabled="disabled">Stop</button>
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
			<div class="ibox-content m-b-sm border-bottom">
				<div style="" id="result">
					<div class="panel panel-default">
						<div class="panel-heading" style="padding: 13px 0px 4px 8px;">
							<div class="panel-btns" style="display: none;"> <button id="reset_stat" class="btn btn-default btn-xs"><i class="fa fa-exclamation-circle"></i> Reset Statistic</button> <a href="#" class="panel-minimize tooltips" data-toggle="tooltip" title="" data-original-title="Minimize Panel"><i class="fa fa-minus"></i></a> </div>
							<h3 class="panel-title"><b>
                            <a href="#tools" data-toggle="modal" class="btn btn-info btn-metro btn-xs  tooltips" data-placement="top" title="" data-original-title="BIN Tools"><i class="fa fa-flask"></i> BIN check</a>

                            </b></h3><b>
                        </b></div><b>
                        </b>
						<div class="panel-body"><b></b>
							<div class="row"><b>
                                <!--<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="text-align:right">
                                    <img id="loading" alt="" src="../stylecyb/images/clear.gif">
                                </div>-->
                                </b>
								<div class="p-xs">
									<div class="progress progress-striped active">
										<div id="progressbar" style="width: 0%" aria-valuemax="100" aria-valuemin="0" aria-valuenow="0" role="progressbar" class="progress-bar progress-bar-success"> <span class="sr-only" id="progressbar">0%</span> </div>
									</div>
                                    <span id="percentcheck"></span> Card </b> <span> | </span>
									<font color="#000"><b>All: <span id="count_all">0</span></b></font> |
									<font color="#000"><b>Live: <span id="tvmit_live_counts">0</span></b></font> |
									<font color="#000"><b>Die: <span id="tvmit_die_counts">0</span></b></font> |
									<font color="#000"><b>Un+Inv: <span id="tvmit_unk_counts">0</span></b></font> |
                                    <span id="checkStatus">Idle </span><span> |</span>
                                    <span id="current_api">Idle </span>
                                    <span id="time_counter" style="display:none;"> | You've wasted <strong><span id="requesttime">0</span></strong> minutes in your life</span>
                                    <br>
                                </div>
							</div>
						</div>
					</div>
					<div class="modal fade" id="valid" tabindex="-1" role="basic" aria-hidden="true">
						<div class="modal-dialog">
							<div class="modal-content">
								<div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
									<h4 class="modal-title">Card Verifier Tools</h4> </div>
								<div class="modal-body">
									<form class="form-inline">
										<div class="form-group"> <label for="checkmail">Check Email</label><br> <input class="form-control" id="caricoeg" placeholder="example@gmail.com" type="email"> </div>
										<div class="form-group"> <label for="cgen">Navigation</label><br> <button type="button" id="tekancoeg" class="btn btn-default">Check</button> <button type="button" id="henticoeg" class="btn btn-default">Cancel</button> </div> <br><br> </form> <pre id="hasil"></pre> </div>
							</div>
							<div class="modal-footer"> <button type="button" class="btn default" data-dismiss="modal">Close</button> </div>
						</div>
						<!-- /.modal-content -->
					</div>
					<!-- /.modal-dialog -->
					<div class="panel panel-default">
						<div class="panel-heading" style="padding: 10px 15px;">
							<div class="panel-btns" style="display: none;"> <button id="delete_table" class="btn btn-default btn-xs">CLEAR</button> <a href="#" class="panel-minimize tooltips" data-toggle="tooltip" title="" data-original-title="Minimize Panel"><i class="fa fa-minus"></i></a> </div>
							<h3 class="panel-title" style="text-align: left;">Table: <span class="label label-default" id="count_alls">0</span></h3> </div>
						<div class="ibox-content">
							<table class="table">
								<thead>
									<tr>
										<th>Line</th>
										<th>Status</th>
										<th>CC Number</th>
										<th>Expire Month</th>
										<th>Expire Year</th>
										<th>CVV</th>
										<th>Comment</th>
									</tr>
								</thead>
								<tbody id="cc">

								</tbody>
							</table>
						</div>
					</div>



					<?php echo $this->render('result.php');?>


					<?php echo $this->render('log.php');?>


				</div>
			</div>
		</div>
	</div>
</div>
