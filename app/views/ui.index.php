<?php
    if (!defined("_ALORESAL_")) {
		exit;
	}
?>
<div class="wrapper wrapper-content">
	

	<div class="row">
        <div class="col-lg-12">
			<div class="ibox chat-view">
				<div class="ibox-title">
					<small class="pull-right text-muted"><div id="chat-panel-last-update">Last update: </div></small>
					Chat room panel
				</div>
				<div class="ibox-content">
					<div class="row">
						<div class="col-md-9 ">
							<div id="chatpanel" class="chat-discussion">
								<div class="chat-message left">
									<img class="message-avatar" src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>img/profile_small.png" alt="" >
									<div class="message">
										<a class="message-author" href="<?php echo $aloresal_portal_server; ?>"><strong> <?php echo $site_title; ?> Bot</strong></a>
										<span class="message-date"> Wed June 1 2016 - 23:59:59 </span>
										<span class="message-content">
										Welcome to <a href="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/';?>"><strong><?php echo $site_title; ?></strong></a> chat room panel. Lets talk with other member. We have lot of feature here and please enjoy it. Feel free to ask admin if you need help!
										</span>
									</div>
								</div>
								<div class="chat-message left">
									<img class="message-avatar" src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>img/profile_small.png" alt="" >
									<div class="message">
										<a class="message-author" href="<?php echo $aloresal_portal_server; ?>"><strong> Alice</strong></a>
										<span class="message-date"> Wed June 1 2016 - 23:59:59 </span>
										<span class="message-content">
										<script type="text/javascript">var data=[[0,12,"Good morning"],[12,18,"Good afternoon"],[18,24,"Good night"]],hr=new Date().getHours();for(var i=0;i<data.length;i++){if(hr>=data[i][0]&&hr<=data[i][1]){document.write(data[i][2]);break;}}</script>, everyone!
										How’s Your Day? Wanna have a web like <strong><?php echo $site_title; ?></strong> ? You can have your own by joining Aloresal membership today. Check it out --> <a href="<?php echo $aloresal_portal_server; ?>"><?php echo $aloresal_portal_server; ?></a>
										</span>
									</div>
								</div>
								<!-- CHAT LIB -->
								<div id="chat-panel-ajax">
								</div>
								<div id="sound"></div>
								<br/><br/>
							</div>
						</div>
						<div class="col-md-3">
							<div class="chat-users">
								<div class="users-list">
									<div class="chat-user">
										<span class="pull-right label label-warning">Offline</span>
										<img class="chat-avatar" src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>img/profile_small.png" alt="" >
										<div class="chat-user-name">
											<a href="<?php echo $aloresal_portal_server; ?>">Alice</a>
										</div>
									</div>
									<div class="chat-user">
										<span class="pull-right label label-primary">Online</span>
										<img class="chat-avatar" src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>img/profile_small.png" alt="" >
										<div class="chat-user-name">
											<a href="<?php echo $aloresal_portal_server; ?>">Oreki</a>
										</div>
									</div>
									<div class="chat-user">
										<span class="pull-right label label-primary">Online</span>
										<img class="chat-avatar" src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>img/profile_small.png" alt="" >
										<div class="chat-user-name">
											<a href="<?php echo $aloresal_portal_server; ?>"><?php echo $site_title; ?> Bot</a>
										</div>
									</div>
									<div class="chat-user">
										<span class="pull-right label label-primary">Online</span>
										<img class="chat-avatar" src="<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/assets/'; ?>img/profile_small.png" alt="" >
										<div class="chat-user-name">
											<a href="<?php echo $aloresal_portal_server; ?>"><?php echo $_SESSION['username']; ?></a>
										</div>
									</div>
									<!-- CHAT LIB -->
									<div id="online-member">
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-12">
							<div class="chat-message-form">
								<div class="form-group">
									<input type="text" class="form-control message-input" name="message"  id="message" placeholder="Enter message text"></input>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
        </div>
    </div>
</div>

<script type="text/javascript">
	var chaturl = '<?php echo $SCHEME.'://'.$HOST.($PORT && $PORT!=80 && $PORT!=443?(':'.$PORT):'').$BASE.'/chat';?>';

</script>
