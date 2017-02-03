/*
 * Developer: Pavel Grebennikov, nekwave@gmail.com
 */


var inspiniaChat = function(name) {
    this.chatUrl = chaturl;

    if (name != undefined && name) {
        this.username = name;
    }
	else if (getCookie('chat_last_name')) {
		this.username = getCookie('chat_last_name');
	}

    this.resives = 0; // count ajax requests for recive history
    this.messages = new Array(); // history of sended messages
    this.updateTimer = 5000; // time for request history (defaule 5sec)

	var self = this;

	this.shiftPressed = false;
    this.created = false;
    this.input = false;
    this.nowSend = false;
    this.selectedText = 0;
    this.lastMsg = '';

    $(document).ajaxStart(function() {
        self.nowSend = 1;
    });

	$(document).ajaxStop(function() {
        self.nowSend = 0;
    });

	jQuery.postChat = function(url, data, callback, type) {
        if (self.nowSend == 1) {
            setTimeout(function(){
                jQuery.postChat(url, data, callback, type);
            },100);
        } else {
            jQuery.post(url, data, callback, type);
        }

		var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		var month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
		var d = new Date();
		$('#chat-panel-last-update').html('Last update: ' + weekday[d.getDay()] + ' ' + month[d.getMonth()]
				+ ' ' + d.getDay() + ' ' + d.getFullYear() + ' - ' + d.getHours()+':'+d.getMinutes()+':'+d.getSeconds());
    }

    this.toggle = function() {
       // show
		if (!this.created) {
			this.getNewHistory(0,!this.created);
			this.create();
		} else {
			self.historyUpdateTime = setTimeout('self.getNewHistory(0);', self.updateTimer);
		}
		this.displayed = true;
		self.input.focus();

    }

	this.create = function(){
        this.created = true;
        this.input = $('#message');
        this.input.on('keydown',function(event){
            if(event.keyCode == 13){ // enter press
                var text = this.value;
                this.value = '';
                for (var i in self.commands) {
                    if(self.commands[i].name != ''){
                        if (text.indexOf(self.commands[i].name, 0) === 0) {
                            self.nowSend = 0;
                            this.value = '';
                            return self.commands[i].func(text);
                        }
                    }

                }
                if (!self.nowSend) {
                    self.sendMessage(text);
                    self.nowSend = 1;
                } else {
                    setTimeout(function(){
                        if (self.nowSend) {
                            self.sendMessage(text);
                            self.nowSend = 1;
                        }
                    },100);
                }

            }
        });
    }

	this.com = {
        privateMsg: function(command) {
            $.postChat(self.chatUrl,{
                url:document.location.href,
                'type':'private',
                'msg':command,
                username:self.username
            },function(data){
                $('#chat-panel-ajax').append(data);
                self.scrollChat();
            });
        }
    }


    this.scrollChat = function(){
        $('#chatpanel').animate({
            scrollTop:100000000
        },0);
    }

    this.commands = new Array(
    {
        name:'/pm',
        func:this.com.privateMsg
    });

    this.sendMessage = function(text,dontSave) {
        if (dontSave==undefined || dontSave != 1) {
            self.messages[self.messages.length] = text;
        }
        $.postChat(self.chatUrl,{
            url:document.location.href,
            'msg':text,
            'username':self.username
        },function(data){
            self.resiveChat(data);
        });
    }

    this.historyUpdateTime = false;

	this.getNewHistory = function(stop,full){
        if (stop) {
            clearTimeout(self.historyUpdateTime)
        } else {
            self.historyUpdateTime = setTimeout('self.getNewHistory(0);', self.updateTimer);
            if (full != undefined && full) {
                $.postChat(self.chatUrl+'?full',{
                    url:document.location.href,
                    'username':self.username
                },self.resiveChat);
            } else {
                $.postChat(self.chatUrl,{
                    url:document.location.href,
                    'username':self.username
                },self.resiveChat);
            }
        }
    }

	this.resiveChat = function(data,clear) {
        if (clear != undefined && clear == 1) {
            $('#chat-panel-ajax').html('');
        }
        clearTimeout(self.historyUpdateTime);
        self.historyUpdateTime = setTimeout('self.getNewHistory(0);', self.updateTimer);
        $('#chat-panel-ajax').append(data);
        $('.chat-panel-ajax-content').emoticons();

		if(data){
			self.scrollChat();
            playSound(THIS_SITE_URL+'/assets/sounds/fBWebMessageSD2.mp3');
		}
        $('#chat-panel-ajax p strong').off('click',self.appendAdminMenu);
        $('#chat-panel-ajax p strong').on('click',self.appendAdminMenu);
        self.nowSend = 0;
        self.resives++;
    }
	self.toggle();
}


function playSound(filename){
document.getElementById("sound").innerHTML='<audio autoplay="autoplay"><source src="'+filename+'" type="audio/mpeg"/></audio>';
}



function getCookie(c_name)
{
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1)
    {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1)
    {
        c_value = null;
    }
    else
    {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1)
        {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start,c_end));
    }
    return c_value;
}

function setCookie(c_name,value,exdays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}
