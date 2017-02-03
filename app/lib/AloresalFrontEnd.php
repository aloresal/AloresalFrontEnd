<?php

if (!defined('_ALORESAL_')) {
    exit;
}

/*
 * aloresal.com
 *
 * version 1.1.5
*/

class AloresalFrontEnd
{
    protected $db;

    //! Instantiate class
    public function __construct()
    {
        $f3 = Base::instance();
    }

    //! HTTP route pre-processor
    public function beforeroute($f3)
    {
        if (!($f3->get('SESSION.apikey') || $f3->get('SESSION.crypt'))
            && $f3->get('PARAMS')[0] != '/session'
            && $f3->get('PARAMS')[0] != '/register') {
            // Invalid session
            $f3->reroute('/session');
        }
    }

    //! Process login form
    public function auth($f3)
    {
        if (!$f3->exists('POST.apikey') || !strlen($f3->get('POST.apikey'))) {
            $f3->set('ESCAPE', false);
            $f3->set('message', '<div class="alert alert-danger">Please fill out all field!');
            include 'app/controllers/session.php';
        } else {
            $session = json_decode(AloresalFrontEnd::pipe($f3->get('aloresal_portal_server')."/api/account?api=". str_replace(' ', '', $f3->get('POST.apikey'))), true);
            
            //echo dump($session);
            if($session['code'] == '0'){
                //$f3->clear('COOKIE.sent');
                $f3->set('SESSION.username', $session['account']['username']);
                $f3->set('SESSION.apikey', $f3->get('POST.apikey'));
                $f3->set('SESSION.crypt', crypt($f3->get('POST.apikey')));
                $f3->set('SESSION.user_role', $session['account']['role']);
                $f3->set('SESSION.lastseen', time());

                $f3->reroute('/');
            }else {
                $f3->set('message', '<div class="alert alert-danger"><strong>Invalid API Key</strong></a>');

                $f3->set('ESCAPE', false);
                include 'app/controllers/session.php';
            }
        }
    }

    //! Start session
    public function login($f3)
    {
        // Reset session in case someone else is logged in
        $f3->clear('SESSION');
        // Render template
        include 'app/controllers/session.php';
    }

    //! Terminate session
    public function logout($f3)
    {
        $f3->clear('SESSION');
        $f3->reroute('/');
    }

    //! View error log
    public function errorlog($f3)
    {
        if ($f3->get('GET.access') != $f3->get('secret')) {
            $f3->reroute('/session');
        }
        include 'error-log.php';
    }

    public static function error($f3)
    {
        switch ($f3->get('ERROR.code')) {
        case 404:{
                $f3->set('content', 'error.404.php');
            }
            break;
        case 500:{
                $f3->set('content', 'error.500.php');
            }
            break;
        default:{
            $f3->set('content', 'error.404.php');
            }
            break;
        }
        include 'app/controllers/error.php';
    }

    public static function pipe($url, $fields_string = false, $fields = false, $httpQuery = false)
    {
        $time = 60;
        $response = '';
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        if ($fields_string) {
            curl_setopt($ch, CURLOPT_POST, count($fields_string));
            if ($httpQuery) {
                curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($fields));
            } else {
                curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
            }
        }
        curl_setopt($ch, CURLOPT_TIMEOUT, $time);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $time);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        try {
            $response = curl_exec($ch);
        } catch (Exception $e) {
            $response['code'] = 1;
            $response['msg'] = $e;
        }
        curl_close($ch);
        if ($response == '') {
            $response['code'] = 1;
            $response['msg'] = 'Operation time out and terminated';

            return json_encode($response);
        } else {
            return $response;
        }
    }
}
