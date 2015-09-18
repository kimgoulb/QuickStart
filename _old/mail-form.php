<?php
function spamcheck($field) {
  //filter_var() sanitizes the e-mail
  //address using FILTER_SANITIZE_EMAIL
  $field=filter_var($field, FILTER_SANITIZE_EMAIL);

  //filter_var() validates the e-mail
  //address using FILTER_VALIDATE_EMAIL
  if(filter_var($field, FILTER_VALIDATE_EMAIL)) {
    return TRUE;
  } else {
    return FALSE;
  }
}

if (isset($_REQUEST['Email'])) {
  //if "email" is filled out, proceed

  //check if the email address is invalid
  $mailcheck = spamcheck($_REQUEST['Email']);

  if ($mailcheck==FALSE) {
      echo "Invalid input";
  } else {
      //send email
      $name = $_REQUEST['Name'] ;
      $email = $_REQUEST['Email'] ;
      $message = $_REQUEST['Message'] ;
      //to, subject,message, headers
      mail("kyedesign@gmail.com", "DPSF Message from: $name", $message, "From: $email" );
      header('Location: http://dunrobinprepstudentfoundation.org/thanks-contact.html');
  }

} else {
  //if "email" is not filled out, display the form
    header('Location: http://dunrobinprepstudentfoundation.org/');
}

?>