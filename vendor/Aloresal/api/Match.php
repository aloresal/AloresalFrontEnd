<?php
/*
* Product   : Aloresal Library for PHP
* Author    : -
*             -
*             -
* Web       : aloresal.com
* Revision  : 1.0.0
*
*/

namespace Aloresal\Api;

use Aloresal\Aloresal;
use Aloresal\Helper;

class Match extends Aloresal
{

    public function __construct($apikey)
    {
        parent::__construct($apikey);
        $this->apikey = $apikey;
    }

    /*
     * The main method for this class
     * Check the Match account and grab its data
     */
    public function exec()
    {
        $params = '&email=' . $this->email .
                  '&password=' . $this->password .
                  ((isset($this->geolocation)) ? '&geolocation='.$this->geolocation : '') .
                  ((isset($this->socks5)) ? '&socks5='.$this->socks5 : '');
        $result = Helper::pipe($this->protocol . '://'.$this->server.'/api/match?api=' . $this->apikey . $params);
        $result = json_decode($result, true);

        if($this->returnType === 0)
        {
            $this->output = json_encode($result);
        }
        else if($this->returnType === 1)
        {
            $print = array();

            switch ($result['code']) {
                case 0:
                    $print['code'] = 0;
                    break;
                case 1:
                    $print['code'] = 400;
                    break;
                case 3:
                case 4:
                    $print['code'] = 2;
                    break;
                case 2:
                    $print['code'] = 3;
                    break;
                case 5:
                case 6:
                default:
                    $print['code'] = 4;
                    break;
            }

            $print['msg'] = ($result['code'] === 0 ?
                                        Helper::color('<b>LIVE</b>', '@Green') :
                                        ($result['code'] == 2 ?
                                            Helper::color('<b>SOCKS DIE</b>', '@Yellow') :
                                            ($result['code'] == 3 ?
                                                Helper::color('<b>DIE</b>', '@Red') :
                                                ($result['code'] == 4 ?
                                                    Helper::color('<b>ACCOUNT LOCKED</b>', '@Orange') :
                                                    ($result['code'] == 5 ?
                                                        Helper::color('<b>FAILED TO START SESSION </b>', '@Olive') :
                                                        ($result['code'] == 6 ?
                                                            Helper::color('<b>Unk</b>', '@Blue') :
                                                            '')))))).' | ';


            $print['msg'] .=
                            (empty($this->socks5) ? '' : Helper::color($this->socks5.' | ', '@Black')) .
                            (isset($this->email) == true ? Helper::color($this->email, '@Black').' | ' : '') .
                            (isset($this->password) == true && $this->password != '' ? Helper::color($this->password, '@Black').' | ' : '');

            if ($result['code'] === 0) {

                $print['msg'] .=
                                Helper::color('subscribe : '. ($result['data']['subscribed'] == true ? 'true' : ($result['data']['subscribed'] === null ? 'unknown' : 'false' ) ), '@DarkGoldenRod').' | ' .
                                //(isset($result['data']['subscribe']) == true ? Helper::color('subscribe : '.$result['data']['subscribe'], '@DarkGoldenRod').' | ' : '') .
                                (isset($result['data']['name']) == true ? Helper::color('name : '.$result['data']['name'], '@Black').' | ' : '').
                                (isset($result['data']['nickname']) == true ? Helper::color('nickname : '.$result['data']['nickname'], '@Black').' | ' : '').
                                (isset($result['data']['gender']) == true ? Helper::color('gender : '.$result['data']['gender'], '@SaddleBrown').' | ' : '').
                                (isset($result['data']['age']) == true ? Helper::color('age : '.$result['data']['age'], '@Red').' | ' : '')  .
                                (isset($result['data']['photos']) == true ? Helper::color('photos : '.$result['data']['photos'], '@Black').' | ' : '') .
                                (isset($result['data']['relationship']) == true ? Helper::color('relationship : '.$result['data']['relationship'], '@Black').' | ' : '').
                                (isset($result['data']['location']) == true ? Helper::color('location : '.$result['data']['location'], '@Black').' | ' : '')  .
                                (isset($result['data']['faith']) == true ? Helper::color('faith : '.$result['data']['faith'], '@Black').' | ' : '')  .
                                (isset($result['data']['religion']) == true ? Helper::color('religion : '.$result['data']['religion'], '@Black').' | ' : '')  .
                                (isset($result['data']['connections']) == true ? Helper::color('connections : '.$result['data']['connections'], '@Black').' | ' : '')  .
                                (isset($result['data']['inbox']) == true ? Helper::color('inbox : '.$result['data']['inbox'], '@Black').' | ' : '')  .
                                (isset($result['data']['messages']) == true ? Helper::color('messages : '.$result['data']['messages'], '@Black').' | ' : '')  .
                                (isset($result['data']['winks']) == true ? Helper::color('winks : '.$result['data']['winks'], '@Black').' | ' : '')  .
                                (isset($result['data']['visits']) == true ? Helper::color('visits : '.$result['data']['visits'], '@Black').' | ' : '')  .
                                (isset($result['data']['viewer']) == true ? Helper::color('viewer : '.$result['data']['viewer'], '@Black').' | ' : '');
            }

            if (!empty($result['msg'])) {
                $print['msg'] .= Helper::color('message: '.$result['msg'], '@Black').' | ';
            }

            if ($result['code'] === 0) {
                $print['msg'] .= Helper::color('[API: '.$result['data']['API'].'] '.'[Server: '.$result['account']['API_Server'].']', '@Gray');
            }

            $this->output = $print;

        }

    }

}
