<?php
if(!isset($_POST['submit']))
{
	//This page should not be accessed directly. Need to submit the form.
	echo "Error; You need to submit the form!";
	exit;
}
$fname = $_POST['firstname'];
$lname = $_POST['lastname'];
$visitor_email = $_POST['email'];
$experience = $_POST['experience'];
$message = $_POST['subject'];

//Validate first
if(empty($fname)||empty($lname)||empty($visitor_email))
{
    echo "Please enter your Name and Email.";
    exit;
}

if(IsInjected($visitor_email))
{
    echo "Bad email value!";
    exit;
}
if (filter_var($visitor_email, FILTER_VALIDATE_EMAIL) === false) {
    // invalid emailaddress
		echo "This email address is not valid!";
    exit(0);
}

$email_from = "seaystir@gmail.com";//<== update the email address
$email_subject = "SWMapp Feedback!";
$email_body = "You have received feedback from $fname $lname:
  						\n$message
							\nTheir experience was $experience.
							\n Reply-to:
							\n $visitor_email.";
$to = "seaystir@gmail.com";//<== update the email address
$headers = "Reply-To: $visitor_email \r\n";
//Send the email!
mail($to,$email_subject,$email_body,$headers);
//done. redirect to thank-you page.
header('Location: thank-you.html');


// Function to validate against any email injection attempts
function IsInjected($str)
{
  $injections = array('(\n+)',
              '(\r+)',
              '(\t+)',
              '(%0A+)',
              '(%0D+)',
              '(%08+)',
              '(%09+)'
              );
  $inject = join('|', $injections);
  $inject = "/$inject/i";
  if(preg_match($inject,$str))
    {
    return true;
  }
  else
    {
    return false;
  }
}

?>
