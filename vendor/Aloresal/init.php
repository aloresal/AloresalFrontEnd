<?php

// Manual Autoload

// Aloresal singleton
require(dirname(__FILE__) . '/Aloresal.php');

// Utilities
require(dirname(__FILE__) . '/Helper.php');

// Aloresal API Resources
require(dirname(__FILE__) . '/api/Stripe.php');
require(dirname(__FILE__) . '/api/Paypal.php');
require(dirname(__FILE__) . '/api/Uber.php');
require(dirname(__FILE__) . '/api/Match.php');
require(dirname(__FILE__) . '/api/Jdate.php');
