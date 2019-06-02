
<?php

$user = 'root';
$password = 'root';
$db = 'PaymentTake';
$host = 'localhost';
$port = 3306;

$link = mysql_connect(
   "$host:$port", 
   $user, 
   $password
);
$db_selected = mysql_select_db(
   $db, 
   $link
);
if (!$link) {
    die('Could not connect: ' . mysql_error());
}
$name= $_POST['name'];
$email= $_POST['email'];
$address= $_POST['address'];
$postcode= $_POST['postcode'];
$cardtype= $_POST['cardtype'];
$cardnumber= $_POST['cardnumber'];
$secure= $_POST['secure'];
$namecard= $_POST['namecard'];

$mysqli = new mysqli('localhost', $user, $password, $db);

/* check connection */
if ($mysqli->connect_errno) {
    printf("Connect failed: %s\n", $mysqli->connect_error);
    exit();
}
echo 'Thank you for submiting your payment information!!';

$mysqli->query("INSERT INTO `Payment`(`PayeeName`, `PayeeEmail`, `PayeeAddress`, `PayeePostCode`, `PayeeCardType`, `PayeeCardNum`, `PayeeCode`, `PayeeExpDate` ) 
VALUES ('". $name ."', '". $email ."', '". $address ."', '". $postcode ."', '". $cardtype ."', '". $cardnumber ."', '". $secure
 ."', '". $namecard ."')");

mysql_close($link);
?>