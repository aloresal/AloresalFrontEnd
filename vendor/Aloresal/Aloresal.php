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

namespace Aloresal;

class Aloresal
{
    protected $apikey;
    protected $protocol = 'http';
    protected $returnType = 0; // 0 = json;
                               // 1 = array ($code, $msg);

    // account checker
    protected $email;
    protected $password;

    // card checker
    protected $cc_number;
    protected $cc_month;
    protected $cc_year;
    protected $cc_cvv;
    protected $stripe_api;

    // general
    protected $server;
    protected $socks5;
    protected $method;
    protected $tld;
    protected $geolocation;
    protected $token;
    public $output;

    /**
     * Instantiate class
     *
     * @param string apikey
     */
    public function __construct($apikey)
    {
        $this->$apikey = $apikey;
        Helper::setApikey($apikey);
    }

    /**
     * Set the value of Return Type
     *
     * @param int returnType
     */
    public function setReturnType($returnType)
    {
        $this->returnType = $returnType;
    }

    /**
     * Set the value of Email
     *
     * @param string email
     */
    public function setEmail($email)
    {
        $this->email = $email;
    }

    /**
     * Set the value of Password
     *
     * @param string password
     */
    public function setPassword($password)
    {
        $this->password = $password;
    }

    /**
     * Set the value of Cc Number
     *
     * @param string cc_number
     */
    public function setCcNumber($cc_number)
    {
        $this->cc_number = $cc_number;
    }

    /**
     * Set the value of Cc Month
     *
     * @param string cc_month
     */
    public function setCcMonth($cc_month)
    {
        $this->cc_month = $cc_month;
    }

    /**
     * Set the value of Cc Year
     *
     * @param string cc_year
     */
    public function setCcYear($cc_year)
    {
        $this->cc_year = $cc_year;
    }

    /**
     * Set the value of Cc Cvv
     *
     * @param string cc_cvv
     */
    public function setCcCvv($cc_cvv)
    {
        $this->cc_cvv = $cc_cvv;
    }

    /**
     * Set the value of Stripe Api
     *
     * @param string stripe_api
     */
    public function setStripeApi($stripe_api)
    {
        $this->stripe_api = $stripe_api;
    }

    /**
     * Set the value of Server
     *
     * @param string server
     */
    public function setServer($server)
    {
        $this->server = $server;
    }

    /**
     * Set the value of Socks
     *
     * @param string socks5
     */
    public function setSocks5($socks5)
    {
        $this->socks5 = $socks5;
    }

    /**
     * Set the value of Method
     *
     * @param int method
     */
    public function setMethod($method)
    {
        $this->method = $method;
    }

    /**
     * Set the value of Tld
     *
     * @param string tld
     */
    public function setTld($tld)
    {
        $this->tld = $tld;
    }

    /**
     * Set the value of Geolocation
     *
     * @param mixed geolocation
     */
    public function setGeolocation($geolocation)
    {
        $this->geolocation = $geolocation;
    }

    /**
     * Set the value of Token
     *
     * @param string token
     */
    public function setToken($token)
    {
        $this->token = $token;
    }

    /**
     * Get the value of Output
     *
     * @return mixed output
     */
    public function getOutput()
    {
        $this->output = $output;
    }


    /**
     * Set the value of Protocol
     *
     * @param int protocol
     */
    public function useSecureProtocol($protocol)
    {
        if($protocol == true)
        {
            $this->protocol = 'https';
        }
        else
        {
            $this->protocol = 'http';
        }
    }

}
