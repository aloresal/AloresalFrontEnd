<?php

if (!defined('_ALORESAL_')) {
    exit;
}

/*
 *  aloresal.com
 *
 * version 1.1.3
*/

class UI extends AloresalFrontEnd
{
    //! Index
    public function index($f3)
    {
        // Render template
        $f3->set('account_checker', 'index');
        include 'app/controllers/ui.php';
    }

    //! List
    public function lists($f3)
    {
        // Render template
        $f3->set('account_checker', 'lists');
        include 'app/controllers/ui.php';
    }

    //! Template
    public function template($f3)
    {
        //Render template
        $f3->set('account_checker', $f3->get('PARAMS.template'));
        include 'app/controllers/ui.php';
    }
}
