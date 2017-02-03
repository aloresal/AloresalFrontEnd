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

class Stripe extends Aloresal
{

    public function __construct($apikey)
    {
        parent::__construct($apikey);
        $this->apikey = $apikey;
    }

    /*
     * The main method for this class
     * Check the validation of card
     */
    public function exec()
    {
        $params = '&number=' . $this->cc_number .
                  '&month=' . $this->cc_month .
                  '&year=' . $this->cc_year .
                  '&cvv=' . $this->cc_cvv .
                  '&stripe_api=' . $this->stripe_api .
                  ((isset($this->socks5)) ? '&socks5='.$this->socks5 : '');

        $result = Helper::pipe($this->protocol . '://' . $server . '/api/stripe?api='.$this->apikey. $params);

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
                                        Helper::color('<b>Stripe API key Expired</b>', '@Yellow') :
                                        ($result['code'] == 3 ?
                                            Helper::color('<b>Failed to create token</b>', '@Red') :
                                            ($result['code'] == 4 ?
                                                Helper::color('<b>Bad request</b>', '@Yellow') :
                                                ($result['code'] == 5 ?
                                                    Helper::color('<b>No valid Stripe API key provided</b>', '@Orange') :
                                                    ($result['code'] == 6 ?
                                                        Helper::color('<b>DIE</b>', '@Red') :
                                                        ($result['code'] == 7 ?
                                                            Helper::color('<b>Connection Error</b>', '@Orange') :
                                                            ($result['code'] == 8 ?
                                                                Helper::color('<b>Unknown error</b>', '@Orange') :
                                                                '')))))))).' | ';

            $print['msg'] .= (empty($this->socks5) ? '' : Helper::color($this->socks5.' | ', '@Black'));

            if ($result['code'] === 0) {
                $print['msg'] .=
                    (isset($result['data']['number']) == true ? Helper::color($result['data']['number'], '@Black').' | ' : '').
                    (isset($result['data']['month']) == true ? Helper::color($result['data']['month'], '@Black').' | ' : '').
                    (isset($result['data']['year']) == true ? Helper::color($result['data']['year'], '@Black').' | ' : '').
                    (isset($result['data']['cvv']) == true ? Helper::color($result['data']['cvv'], '@Black').' | ' : '').
                    (isset($result['data']['BIN']['brand']) == true ? Helper::color($result['data']['BIN']['brand'], '@Black').' | ' : '').
                    (isset($result['data']['BIN']['bank']) == true ? Helper::color($result['data']['BIN']['bank'], '@Black').' | ' : '').
                    (isset($result['data']['BIN']['card_type']) == true ? Helper::color($result['data']['BIN']['card_type'], '@Black').' | ' : '').
                    (isset($result['data']['BIN']['country_name']) == true ? Helper::color($result['data']['BIN']['country_name'], '@Black').' | ' : '').
                    (isset($result['data']['BIN']['card_category']) == true ? Helper::color($result['data']['BIN']['card_category'], '@Black').' | ' : '');
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
