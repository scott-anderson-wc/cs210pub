<?php
  // read the values of the form sent by the POST method
  $name = $_POST['from_name'];
  $email = $_POST['from_email'];

  // define variables needed to populate the email template response 
  $to = $email;
  $subject = "Your information was received";
 
  $message = "Dear $name, \n\nThanks for RSVP-ing. We'll send more info soon.\n";
  $message .= "\nThe Wushu Team";
     
  if (filter_var($email, FILTER_VALIDATE_EMAIL)) { 
    //This method generates and then sends the mail.
    mail($to, $subject, $message); 
    echo "<p style='color: red'>Your RSVP was received, check your email.</p>";
  }
?>