/**
* jQuery Fbemoticons
*
*/

(function($){
	$.fn.emoticons = function(options){
		$this = $(this);
		var opts = $.extend({}, $.fn.emoticons.defaults, options);
		return $this.each(function(i,obj){
			var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
			var x = $(obj);
			// Entites Encode
			var encoded = [];
			for(key in o.d)
			{
			   encoded[key] = String(key).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

			}
			for(key in o.d)
			{
				var repls = x.html();
				if(repls.indexOf(o.d[key]) || repls.indexOf(encoded[key])){
					var rstr = '<span class="emoticon emoticon_'+o.d[key]+'"></span>';
					x.html(repls.replace(key,rstr));
					x.html(repls.replace(encoded[key],rstr));
				}
			}

		});
	}
	// Defaults
	$.fn.emoticons.defaults = {
		d : {":)":"smile",":]":"smile","=)":"smile",":-)":"smile",":(":"frown",":[":"frown","=(":"frown",":-(":"frown",":p":"tongue",":P":"tongue","=P":"tongue",":-p":"tongue",":-P":"tongue",":D":"grin","=D":"grin",":-D":"grin",":o":"gasp",":O":"gasp",":-o":"gasp",":-O":"gasp","8-)":"glasses","B-)":"glasses","8|":"sunglasses","B|":"sunglasses","8-|":"sunglasses","B-|":"sunglasses",">:(":"grumpy",">:-(":"grumpy",":/":"unsure",":\\":"unsure",":-/":"unsure",":-\\":"unsure",":'(":"cry","3:)":"devil","3:-)":"devil","O:)":"angel","O:-)":"angel",":*":"kiss",":-*":"kiss","^_^":"kiki","-_-":"squint","o.O":"confused",">:o":"upset",">:O":"upset",">:-O":"upset",">:-o":"upset",":v":"pacman",":3":"colonthree","<3":"heart","(y)":"like","(Y)":"like",":putnam:":"putnam",'<(")':"penguin",":poop:":"poop","(^^^)":"shark"}
	};
})(jQuery);
