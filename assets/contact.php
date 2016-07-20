<?php

//email config
$mail_to = 'msoliman598@gmail.com';
$subject = 'info from my sit';

//recive info
$name =$_POST['name'];
$email =$_POST['email'];
$subject =$_POST['subject'];
$comment =$_POST['comment'];
$submit =$_POST['submit'];


$message = "Name: " .$name."\n";
$messag .= "Email: " .$email."\n";
$message .= "Subject: " .$subject."\n";
$message .="Comment: " .$comment."\n";
$message .="submit: " .$comment."\n";

?>


<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Untitled Document</title>
</head>

<body>
<?php 
if(mail($mail_to,$subject ,$message)){
        echo "Thank you";
    }else{
        echo "Email failed";
    } ?>
</body>
</html>