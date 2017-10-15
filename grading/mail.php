<?php

/*

A general purpose mail script using PHP. Note that this could be used by
spammers, so carefully control access to it!

Intended to be used via Ajax, so returns a JSON array.

Inputs are four POST variables:

recipients (can't be empty, can be comma-separated)
from_name  (default "Scott D. Anderson")
from_email (default "scott.anderson@wellesley.edu")
subject (default "no subject")
body (can't be empty)

The response is a JSON object, so this script can easily be executed as an
Ajax request.  The JSON object looks like one of the following:

{"status":"ok"}
{"status":"fail"}

Even if the status is "ok," the sending of the email could fail. It only
means we successfully handed this to the server's mail server, not that it
got to the recipient.

Author: Scott D. Anderson
scott.anderson@acm.org

This script is placed in the public domain.

*/

// The following avoids CORS complaints from local development.
header('Access-Control-Allow-Origin: *');

$from_name  = isset($_POST['from_name'])   ? strip_tags($_POST['from_name'])  : 'Scott D. Anderson';
$from_email = isset($_POST['from_email'])  ? strip_tags($_POST['from_email']) : 'scott.anderson@wellesley.edu';
$subject    = isset($_POST['subject'])     ? strip_tags($_POST['subject'])    : 'no subject';

if( ! isset($_POST['recipients']) ) {
    echo json_encode(array('status' => 'fail', 'reason' => 'email has no recipients'));
    die("recipients must be set");
}
$recipients = $_POST['recipients'];

if( ! isset($_POST['body']) ) {
    echo json_encode(array('status' => 'fail', 'reason' => 'email has empty body'));
    die("Body must be set");
}
$body = $_POST['body'];

$body .= "\n\nSent from {$_SERVER['PHP_SELF']}.\n";

$headers = "From: $from_name <$from_email> \r\n";
// Following from https://css-tricks/sending-nice-html-email-with-php/
$headers .= "CC: scott.anderson@wellesley.edu\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

if(mail($recipients, $subject, $body, $headers)) {
    echo json_encode(array('status' => 'ok'));
} else {
    echo json_encode(array('status' => 'fail'));
}
  
?>
