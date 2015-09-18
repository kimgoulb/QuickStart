<html>
<body>

<?php
if (isset($_REQUEST['Email']))
//if "email" is filled out, send email
  {
  //send email
  $name = $_REQUEST['Name'] ;
  $email = $_REQUEST['Email'] ;
  $message = $_REQUEST['Message'] ;
  //to, subject,message, headers
  mail("kyedesign@gmail.com", "Message from: $name", "Message: $message", "From: $email" );
  echo "Thank you for using our mail form";
  }
else
//if "email" is not filled out, display the form
  {
    header('Location: http://dunrobinprepstudentfoundation.org/');
    /*
  echo "<form method='post' action='mailform.php'>
  Email: <input name='email' type='text'><br>
  Subject: <input name='subject' type='text'><br>
  Message:<br>
  <textarea name='message' rows='15' cols='40'>
  </textarea><br>
  <input type='submit'>
  </form>";*/
  }
?>

</body>
</html>