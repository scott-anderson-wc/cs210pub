<?php

/*

This PHP script sends an email message to an address specified
"statically."  It was built with a procedure that took a generic
"template" PHP script and hard-coded the destination address.

The purpose of having a static destination address is that this script is
then of no use to spammers.  Spammers could exploit a generic email script
to send email to millions of victims, but this script can't do that.  One
could use this to fill up the inbox of the hard-coded recipient, but
that's just a denial of service attack, and that's less interesting. This
script also includes its current location in the email, so that if it is
used for a DOS attack, the victim can contact the sysadmin of the
malicious server and shut this script down.

The inputs to the script are in the _POST superglobal and are all the
usual parts of an email message:

$_POST['from_name'];   like 'Barack Obama'
$_POST['from_email'];  like 'president@whitehouse.gov'
$_POST['subject'];     like 'state of the union'
$_POST['body'];        

These can also be given hard-coded default values.  It might be quite
common to hard-code these for different purposes, such as "order form" on
an e-commerce site.

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

$recipient = 'scott.anderson@wellesley.edu';

$from_name  = isset($_POST['from_name'])   ? $_POST['from_name']  : 'unknown';
$from_email = isset($_POST['from_email'])  ? $_POST['from_email'] : 'unknown';
$subject    = isset($_POST['subject'])     ? $_POST['subject']    : 'mail from /~cs110/php/make-eform.php';
$body       = isset($_POST['body'])        ? $_POST['body']       : 'mail from /~cs110/php/make-eform.php';

$body .= "\n\nSent from {$_SERVER['PHP_SELF']}.\n";

$headers = "From: $from_name <$from_email> \r\n";
if(mail($recipient, $subject, $body, $headers)) {
    echo json_encode(array('status' => 'ok'));
} else {
    echo json_encode(array('status' => 'fail'));
}
  
?>
