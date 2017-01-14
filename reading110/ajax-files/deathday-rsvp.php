<?php
  // read the values of the form sent by the POST method
$name = $_POST['from_name'];
$email = $_POST['from_email'];

  // define variables needed to populate the email template response 
$to = $email;
$subject = "Thanks for your RSVP";
 
$message = "Dear $name, \n\nThanks for coming to my Deathday party.\n\n";
$message .= "-- Nearly Headless Nick";
     
  if (filter_var($email, FILTER_VALIDATE_EMAIL)) { 
    //This method generates and then sends the mail.
    mail($to, $subject, $message); 
    echo "<p style='color: red'>Your RSVP was received, check your email.</p>";
  }
?>