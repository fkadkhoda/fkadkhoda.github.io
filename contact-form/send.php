<?php

//Your e-mail address goes here: 

$to = '<youremail@yourdomain.com>';
//


//Retrieve form data. 
//GET - user submitted data using AJAX
//POST - in case user does not support javascript, we'll use POST instead
$name = ($_GET['name']) ? $_GET['name'] : $_POST['name'];
$email = ($_GET['email']) ?$_GET['email'] : $_POST['email'];
$subject = ($_GET['subject']) ?$_GET['subject'] : $_POST['subject'];
$comment = ($_GET['comment']) ?$_GET['comment'] : $_POST['message'];

//flag to indicate which method it uses. If POST set it to 1
if ($_POST) $post=1;

//Include email validator
	require 'email-validator.php';
	$validator = new EmailAddressValidator();
	
//Simple server side validation for POST data, of course, you should validate the email
if (!$name) $errors[count($errors)] = 'Please enter your name.';
if (!$email) $errors[count($errors)] = 'Please enter your email.'; 
if (!$comment) $errors[count($errors)] = 'Please enter your comment.'; 

$email = strip_tags($email);

if (!$validator->check_email_address($email)) {
	$errors[count($errors)] = 'Invalid email address.'; 
}

//if the errors array is empty, send the mail
if (!$errors) {

	//sender
	$from = $name . ' <' . $email . '>';
	
	//Structure of the message:
	$subject = 'Message from ' . $name;	
	$message = '
	<!DOCTYPE html>
	<head></head>
	<body>
	<table>
		<tr><td>Name:</td><td>' . $name . '</td></tr>
		<tr><td>Email:</td><td>' . $email . '</td></tr>
		<tr><td>Subject:</td><td>' . $subject . '</td></tr>
		<tr><td>Message:</td><td>' . nl2br($comment) . '</td></tr>
	</table>
	</body>
	</html>';

	//End of the message structure
	
	
	//send the mail
	$result = sendmail($to, $subject, $message, $from);
	
	//if POST was used, display the message straight away
	if ($_POST) {
		if ($result) echo 'Thank you! We have received your message.';
		else echo 'Sorry, unexpected error. Please try again later';
		
	//else if GET was used, return the boolean value so that 
	//ajax script can react accordingly
	//1 means success, 0 means failed
	} else {
		echo $result;	
	}

//if the errors array has values
} else {
	//display the errors message
	for ($i=0; $i<count($errors); $i++) echo $errors[$i] . '<br/>';
	echo '<a href="../contact.html">Back</a>';
	exit;
}


//Simple mail function with HTML header
function sendmail($to, $subject, $message, $from) {
	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";
	$headers .= 'From: ' . $from . "\r\n";
	
	$result = mail($to,$subject,$message,$headers);
	
	if ($result) return 1;
	else return 0;
}

?>