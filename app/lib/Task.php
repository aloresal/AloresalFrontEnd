<?php

if (!defined('_ALORESAL_')) {
    exit;
}

/*
 *  aloresal.com
 *
 * version 1.1.5
*/

class Task extends AloresalFrontEnd
{
    private $apikey;
    private $email;
    private $password;
    private $socks5;
    private $token;
    private $method;
    private $tld;
    private $geolocation;

    public function __construct($f3)
    {
        $this->returnType = 1;
        $this->apikey = $f3->get('SESSION.apikey');

        if ($f3->exists('GET.email')) $this->email = $f3->get('GET.email');
        if ($f3->exists('GET.password')) $this->password = $f3->get('GET.password');
        if ($f3->exists('GET.socks5')) $this->socks5 = ($f3->get('GET.socks5') == '127.0.0.1:8080' ? '' : $f3->get('GET.socks5'));
        if ($f3->exists('GET.method')) $this->method = $f3->get('GET.method');
        if ($f3->exists('GET.tld')) $this->tld = $f3->get('GET.tld');
        if ($f3->exists('GET.geolocation')) $this->geolocation = $f3->get('GET.geolocation');
        if ($f3->exists('GET.token')) $this->token = $f3->get('GET.token');
        //if ($f3->exists('GET.output')) $this->output = $f3->get('GET.output');
    }

    public function server()
    {
        $serverlistfile = fopen("serverlists.json", "w") or die("Unable to open file!");
        if(time() - json_decode(file_get_contents('serverlists.json'), true)['last_update'] > (60 * 60)){
            fwrite($serverlistfile, file_get_contents('http://cdn.aloresal.com/serverlists.json'));
        }
        fclose($serverlistfile);
        $serverlists = json_decode(file_get_contents('serverlists.json'), true);
        $server = $serverlists['data'][rand(0, $serverlists['total']-1)]['url'];

        return $server;
    }

    //! Paypal_isregistered
    public function paypal_isregistered($f3)
    {
        $aloresal = new \Aloresal\Api\Paypal($this->apikey);

        $aloresal->setServer($this->server());
        $aloresal->useSecureProtocol(false);
        $aloresal->setReturnType(1);
        $aloresal->setSocks5($this->socks5);
        $aloresal->setMethod($this->method);
        $aloresal->setEmail($this->email);
        $aloresal->isRegistered();
        
        header('Content-Type: application/json');
        echo json_encode($aloresal->output);
    }

    //! Paypal
    public function paypal($f3)
    {
        $aloresal = new \Aloresal\Api\Paypal($this->apikey);
        $aloresal->setServer($this->server());
        $aloresal->useSecureProtocol(false);
        $aloresal->setReturnType(1);
        $aloresal->setSocks5($this->socks5);
        $aloresal->setEmail($this->email);
		$aloresal->setPassword($this->password);
        $aloresal->setToken($this->token);
        $aloresal->exec();
        
        header('Content-Type: application/json');
        echo json_encode($aloresal->output);
    }

    //! Match
    public function match($f3)
    {
        $aloresal = new \Aloresal\Api\Match($this->apikey);
        $aloresal->setServer($this->server());
        $aloresal->useSecureProtocol(false);
        $aloresal->setReturnType(1);
        $aloresal->setSocks5($this->socks5);
        $aloresal->setEmail($this->email);
		$aloresal->setPassword($this->password);
        $aloresal->setGeolocation($this->geolocation);
        $aloresal->exec();
        
        header('Content-Type: application/json');
        echo json_encode($aloresal->output);
    }


}
