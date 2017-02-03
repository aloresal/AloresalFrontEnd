


var lstMail;
var lstSock;
var maxFail;
var delimiter;
var timeout;
var time_start = 0;
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

function setInputEnable(isTrue) {
	$("#mailpass").attr ("disabled", isTrue);
	if (noSocks < 1) {
		$("#socks").attr ("disabled", isTrue)
	}
}

function up(counterWidget) {
	var value = parseInt($(counterWidget).text ());
	value++;
	$(counterWidget).text(value)
}

function stopLoading(isTrue) {
	setInputEnable(false);
	var checkStatusWidget = $("#checkStatus").html ();
	$("#checkStatus").html (checkStatusWidget.replace ("Checking", "Stopped"));
	$("#submit").removeClass ("disabled").attr ("disabled", false);
	$("#stop").addClass ("disabled").attr ("disabled", true);
	$("#loading").attr ("style", "display:none;");
	$["xhrPool"].abortAll ();
	if (isTrue) {
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

function updateTextBox(searchMailPass, searchProxy) {
	if (searchMailPass["length"] > 0) {
		var mailpassWidget = $("#mailpass").val ().split ("\x0A");
		mailpassWidget.remove (searchMailPass);
		$("#mailpass").val (mailpassWidget.join ("\x0A"))
	};
	if (searchProxy["length"] > 0) {
		var proxyWidget = $("#socks").val ().split ("\x0A");
		proxyWidget.remove (searchProxy);
		$("#socks").val (proxyWidget.join ("\x0A"))
	}
}

function updateProgress(initialValue, total) {
	$(".check-amount").html ("<b>Progress</b>: " + initialValue + "/" + total);
	var currentValue = Math.floor ((initialValue / total) * 100);
	$("#percentcheck").html ("<b>Progress</b>: " + initialValue + "/" + total);
	var currentValue = Math.floor ((initialValue / total) * 100);
	$("#progressbar").css ("width", currentValue + "%").text (currentValue + "%");
	document["title"] = currentValue + "% [" + initialValue + "/" + total + "] " + docTitle;
}

function updateExecutionTime(exec_time) {
    var count = parseFloat($('#requesttime').html());
    count=count+parseFloat(exec_time);
    $('#requesttime').html(count+'');
}

function isEmail(email) {
	var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	return regex.test (email)
}

function resetResult() {
	$("#socks-die, #tvmit_die, #tvmit_unk, #tvmit_live").html ("");
	//$("#tvmit_live_count, #tvmit_die_count, .socks-die, #tvmit_unk_count").text ("0");
    $("#count_all").html ("0");
    $("#tvmit_live_counts").html ("0");
    $("#tvmit_die_counts").html ("0");
    $("#tvmit_unk_counts").html ("0");
    $(".progress .bar").css ("width", "0%").text ("0%");
    $("#checkStatus").text ("Idle");
    $("#percentcheck").text ("");

	//$(".socks-die, .acc-die, .wrong-format").text ("0");
}

function filterMP(mailpass) {
	var aMailPass = mailpass.split ("\x0A");
	var delim = $("#delim").val ().trim ();
	var scannedMailPass = new Array();
	var completeFilteredMailPass = new Array();
	for (var i = 0; i < aMailPass["length"]; i++) {
		if (aMailPass[i].indexOf ("@") != -1) {
			var splitMailPass = aMailPass[i].split (delim);
			if (splitMailPass["length"] < 2) {
				continue
			};
			for (var j = 0; j < splitMailPass["length"] - 1; j++) {
				var trimSplitMailOnly = $.trim (splitMailPass[j]);
				if (isEmail(trimSplitMailOnly)) {
					var trimSplitPassOnly = $.trim (splitMailPass[j + 1]);
					if ($.trim (trimSplitPassOnly)["length"] < 1) {
						break
					};
					if (scannedMailPass.indexOf (trimSplitMailOnly.toLowerCase ()) == -1) {
						scannedMailPass.push (trimSplitMailOnly.toLowerCase ());
						completeFilteredMailPass.push (trimSplitMailOnly + "|" + trimSplitPassOnly);
						break
					}
				}
			}
		}
	};
	$("#delim").val ("|");
	delim = "|";
	return completeFilteredMailPass
}

function filterM_(mailpass) {
	var aMailPass = mailpass.split ("\x0A");
	delim = $("#delim").val ().trim ();
	var scannedMailPass = new Array();
	var completeFilteredMailPass = new Array();
	for (var i = 0; i < aMailPass["length"]; i++) {
		if (aMailPass[i].indexOf ("@") != -1) {
				if (isEmail(aMailPass[i])) {
						completeFilteredMailPass.push (aMailPass[i]);
				}
		}
	};
	$("#delim").val ("|");
	delim = "|";
	return completeFilteredMailPass
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

    $("#reset_stat").click (function() {
        //var confirmModal = confirm("Do you really want to Reset Statistic ?");
        if (confirm("Do you really want to Reset Statistic ?")) {
            resetResult();
        }
    });
    $("#delete_table").click (function() {
        $("#count_alls").html ("0");
    });
	$("#submit").click (function() {
        time_start = performance.now();
	    $('#time_counter').hide();
		delim = $("#delim").val ().trim ();
		maxFail = parseInt($("#fail").val ());
		chkChange = $("#nochange").is (":checked") ? 1 : 0;
		noSocks = $("#noSocks").val () ? 1 : 0;
		timeout = $("#timeout").val ();
		var completeFilteredMailPass = filterMP($("#mailpass").val ());
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

function implode(glue, pieces) {
  //  discuss at: http://phpjs.org/functions/implode/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Waldo Malqui Silva
  // improved by: Itsacon (http://www.itsacon.net/)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  //   example 1: implode(' ', ['Kevin', 'van', 'Zonneveld']);
  //   returns 1: 'Kevin van Zonneveld'
  //   example 2: implode(' ', {first:'Kevin', last: 'van Zonneveld'});
  //   returns 2: 'Kevin van Zonneveld'

  var i = '',
    retVal = '',
    tGlue = '';
  if (arguments.length === 1) {
    pieces = glue;
    glue = '';
  }
  if (typeof pieces === 'object') {
    if (Object.prototype.toString.call(pieces) === '[object Array]') {
      return pieces.join(glue);
    }
    for (i in pieces) {
      retVal += tGlue + pieces[i];
      tGlue = glue;
    }
    return retVal;
  }
  return pieces;
}

function playSound(filename){
	document.getElementById("sound").innerHTML='<audio autoplay="autoplay"><source src="'+filename+'" type="audio/mpeg"/></audio>';
}
