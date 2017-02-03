<?php
    if (!defined("_ALORESAL_")) {exit; }
?>
    <link href="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>css/plugins/dataTables/datatables.min.css" rel="stylesheet">

    <div class="row wrapper border-bottom white-bg page-heading">
        <div class="col-sm-4" style="margin-top:20px;">
            <h2>Account Checker List</h2>
		</div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="wrapper wrapper-content animated fadeInRight">
                <?php echo $this->render('welcome.php'); ?>
                <div class="row">

                    <div class="col-lg-12">
                        <div class="ibox float-e-margins"  style="font-size:14px;">
                            <div class="ibox-title">
                                <h5>Account Checker List </h5>
                                <div class="ibox-tools">
                                    <a class="collapse-link">
                                        <i class="fa fa-chevron-up"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="ibox-content">
                                <div class="table-responsive">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name </th>
                                                <th>Description </th>
                                                <th>Live </th>
                                                <th>Die </th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
											<?php
												$content = file_get_contents('app/lists.json');
												$lists = json_decode($content, true);
												foreach($lists as $key => $plugin): ?>
													<tr>
														<td><?php echo $key+1; ?></td>
														<td><strong><a href="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/ui/'.$plugin['router']; ?>"><?php echo ucfirst($plugin['name']); ?></a></strong></td>
														<td><?php echo $plugin['description']; ?></td>
														<td><?php echo $plugin['fee']['success']; ?></td>
														<td><?php echo $plugin['fee']['failed']; ?></td>
														<td><i class="fa fa-<?php
																switch ($plugin['status']) {
																	case 'available':
																		echo 'check text-navy"> available';
																		break;
																	case 'maintenance':
																		echo 'times text-warning"> maintenance';
																		break;
																	case 'unavailable':
																		echo 'times text-danger"> unavailable';
																		break;
																	default:
																	  break;
																}
															?></i></td>
													</tr>
												<?php endforeach; ?>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <?php echo $this->render('donate.php'); ?>
            </div>
        </div>
    </div>

    <script src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>js/plugins/dataTables/datatables.min.js"></script>
