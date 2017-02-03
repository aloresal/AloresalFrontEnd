<?php
    if (!defined("_ALORESAL_")) {exit; }

				if($log == 1){
				?>
					<div class="panel panel-default">
						<div class="panel-heading" style="padding: 10px 15px;">
							<div class="panel-btns" style="display: none;"> <button id="delete_unk" class="btn btn-default btn-xs">CLEAR</button> <a href="#" class="panel-minimize tooltips" data-toggle="tooltip" title="" data-original-title="Minimize Panel"><i class="fa fa-minus"></i></a> </div>
							<h3 class="panel-title" style="text-align: left;">Request log: <span class="label label-default" id="request_count">0</span> </h3> </div>
						<div class="panel-body">
							<div class="row">
								<div id="request_log" class="col-xs-12 col-sm-12 col-md-12 col-lg-12"> </div>
							</div>
						</div>
					</div>
					
					
					<div class="panel panel-default">
						<div class="panel-heading" style="padding: 10px 15px;">
							<div class="panel-btns" style="display: none;"> <button id="delete_unk" class="btn btn-default btn-xs">CLEAR</button> <a href="#" class="panel-minimize tooltips" data-toggle="tooltip" title="" data-original-title="Minimize Panel"><i class="fa fa-minus"></i></a> </div>
							<h3 class="panel-title" style="text-align: left;">Response log: <span class="label label-default" id="response_count">0</span> </h3> </div>
						<div class="panel-body">
							<div class="row">
								<div id="response_log" class="col-xs-12 col-sm-12 col-md-12 col-lg-12"> </div>
							</div>
						</div>
					</div>
			<?php
				}
				?>