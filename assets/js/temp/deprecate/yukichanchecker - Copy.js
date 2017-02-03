/* girudatsu.website
 * Ver.:	1.00
 * File:	yukichanchecker.js
 * Date:
 * Desc:	javascript library for yukichanchecker
 * Copyright (C) 2015 Girudatsu Team (http://girudatsu.website)
 */

/*
// Ala facebook
var n = [
'',
 '  IIIIIIII   II                          II             II                      ',
 ' III                                     II             II                      ',
 'II           II  IIIIII III   III  :IIIIIII   IIIIIII IIIIIII IIIIII   II    II ',
 'II   IIIII   II  III    III   III  II    II        II   II    III      II    II ',
 'II      II   II  III    III   III ~II    II  IIIIIIII   II     IIIII   II    II ',
 ',II=    II   II  III    :II   III  II    II  II    II   II        ,II  II    II ',
 '  IIIIIIII   II  III     IIIIIIII   IIIIIII  IIIIIIII   IIIII IIIIII,   IIIIIII '],

k = "This is a browser feature intended for developers. If someone told you to copy-paste something here to enable a Facebook feature or \"hack\" someone's account, it is a scam and will give them access to your Facebook account.",
l = "See {url} for more information.",
o = ('' + k).match(/.{35}.+?\s+|.+$/g),
p = Math.floor(Math.max(0, (n.length - o.length) / 2));
for (var q = 0; q < n.length || q < o.length; q++) {
	var r = n[q];
	n[q] = r + new Array(85 - r.length).join(' ') + (o[q - p] || '');
}
console.log('\n\n\n' + n.join('\n') + '\n\n' + l + '\n');
*/


var lstMail;
var lstSock;
var maxFail;
var delimiter;
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
		$("#socks").attr ("disabled", _0x2b8bx12)
	}
}

function up(_0x2b8bx14) {
	var _0x2b8bx15 = parseInt($(_0x2b8bx14).text ());
	_0x2b8bx15++;
	$(_0x2b8bx14).text(_0x2b8bx15)
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
		var _0x2b8bx1d = $("#socks").val ().split ("\x0A");
		_0x2b8bx1d.remove (_0x2b8bx1b);
		$("#socks").val (_0x2b8bx1d.join ("\x0A"))
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

function isEmail(_0x55a8x28) {
	var _0x55a8x29 = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	return _0x55a8x29.test (_0x55a8x28)
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

function filterM_(_0x55a8x2b) {
	var _0x55a8x3c = _0x55a8x2b.split ("\x0A");
	delim = $("#delim").val ().trim ();
	var _0x55a8x3d = new Array();
	var _0x55a8x3e = new Array();
	for (var _0x55a8x3f = 0; _0x55a8x3f < _0x55a8x3c["length"]; _0x55a8x3f++) {
		if (_0x55a8x3c[_0x55a8x3f].indexOf ("@") != -1) {
				if (isEmail(_0x55a8x3c[_0x55a8x3f])) {
						_0x55a8x3e.push (_0x55a8x3c[_0x55a8x3f]);
				}
		}
	};
	$("#delim").val ("|");
	delim = "|";
	console.log(_0x55a8x3e);
	return _0x55a8x3e
}




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
