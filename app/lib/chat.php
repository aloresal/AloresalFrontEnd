<?php

if (!defined('_ALORESAL_')) {
    exit;
}

/*
 *  aloresal.com
 *
 * version 1.1.6
*/

class Chat extends AloresalFrontEnd
{
    //! chat
    public function alochat($f3)
    {
        $url = $f3->get('chat_server').'?auth='.$f3->get('chat_auth_key');

        if (isset($_GET['full'])) { // first resive history
            setcookie('chat_last_resive', '0', time() + 30 * 24 * 3600, $f3->get('BASE').($f3->get('BASE') == '' ? '' : '/'));
            $url .= '&full';
        }
        //extract data from the post //set POST variables
        $fields = $f3->get('POST');
        $fields['chat_last_resive'] = $_COOKIE['chat_last_resive'] ? $_COOKIE['chat_last_resive'] : '0';
        //$fields['chat_last_resive'] = $_COOKIE['chat_last_resive'];

        //url-ify the data for the POST
        foreach ($fields as $key => $value) {
            $fields_string .= $key.'='.$value.'&';
        }
        rtrim($fields_string, '&');

        $alochat = json_decode(AloresalFrontEnd::pipe($url, $fields_string, $fields), true);
        setcookie('chat_last_resive', $alochat['now'], time() + 30 * 24 * 3600, $f3->get('BASE').($f3->get('BASE') == '' ? '' : '/'));

        $printChat = '';

        if ($alochat['code'] != 1) {
            foreach ($alochat['chat'] as $chatContent) {
                $username = $f3->get('SESSION.username');
                if ($chatContent['username'] == $username) {
                    $who = 'right';
                } else {
                    $who = 'left';
                }
                $printChat .= '<div class="chat-message '.$who.'">
					<img class="message-avatar" src="'.$f3->get('SCHEME').'://'.$f3->get('HOST').($f3->get('PORT') && $f3->get('PORT')!=80 && $f3->get('PORT')!=443?(':'.$f3->get('PORT')):'').$f3->get('BASE').'/assets/img/profile_small.png" alt="" >
						<div class="message">
						<a class="message-author" href="http://aloresal.com/"><strong>'.$chatContent['username'].'</strong></a>
						<span class="message-date"> '.date('D M d Y - H:i:s', $chatContent['date']).' </span>
						<span class="message-content chat-panel-ajax-content">
							'.base64_decode($chatContent['msg']).'
						</span>
					</div>
				</div>';
            }
        }
        echo $printChat;
    }
}
