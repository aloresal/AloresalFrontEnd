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

class Jdate extends Aloresal
{

    public function __construct($apikey)
    {
        parent::__construct($apikey);
        $this->apikey = $apikey;
    }

    /*
     * The main method for this class
     * Check the Jdate account and grab its data
     */
    public function exec()
    {
        $params = '&email=' . $this->email .
                  '&password=' . $this->password .
                  ((isset($this->socks5)) ? '&socks5='.$this->socks5 : '');
        $result = Helper::pipe($this->protocol . '://'.$this->server.'/api/jdate?api=' . $this->apikey . $params);
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
                default:
                    $print['code'] = 1;
                    break;
            }

            $print['msg'] = ($result['code'] === 0 ?
                                Helper::color('<b>LIVE</b>', '@Green') :
                                ($result['code'] == 2 ?
                                    Helper::color('<b>SOCKS DIE</b>', '@Yellow') :
                                    ($result['code'] == 3 ?
                                        Helper::color('<b>DIE</b>', '@Red') :
                                        ($result['code'] == 4 ?
                                            Helper::color('<b>NO RESPONSE</b>', '@Olive') :
                                            ($result['code'] == 5 ?
                                                Helper::color('<b>Unk</b>', '@Blue') :
                                                ''))))).' | ';


            $print['msg'] .=
                            (empty($this->socks5) ? '' : Helper::color($this->socks5.' | ', '@Black')) .
                            (isset($this->email) == true ? Helper::color($this->email, '@Black').' | ' : '') .
                            (isset($this->password) == true && $this->password != '' ? Helper::color($this->password, '@Black').' | ' : '');

            if ($result['code'] === 0) {

                $print['msg'] .=
                                Helper::color('subscribe : '. ($result['data']['subscribed'] == true ? 'true' : ($result['data']['subscribed'] === null ? 'unknown' : 'false' ) ), '@DarkGoldenRod').' | ' . //(isset($result['data']['subscribe']) == true ? Helper::color('subscribe : '.$result['data']['subscribe'], '@DarkGoldenRod').' | ' : '') .
                                (isset($result['data']['memberid']) == true ? Helper::color('memberid : '.$result['data']['memberid'], '@Black').' | ' : '').
                                (isset($result['data']['gender']) == true ? Helper::color('gender : '.$result['data']['gender'], '@SaddleBrown').' | ' : '').
                                (isset($result['data']['age']) == true ? Helper::color('age : '.$result['data']['age'], '@Red').' | ' : '')  .
                                (isset($result['data']['photocount']) == true ? Helper::color('photos : '.$result['data']['photocount'], '@Black').' | ' : '') .
                                (isset($result['data']['location']) == true ? Helper::color('location : '.$result['data']['location'], '@Black').' | ' : '')  .
                                (isset($result['data']['religion']) == true ? Helper::color('religion : '.$result['data']['religion'], '@Black').' | ' : '');
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
