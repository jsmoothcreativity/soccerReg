
<?php

$user = 'root';
$password = 'root';
$db = 'RegistrationTake';
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

/* Father */
$fatherFirstName= $_POST['fatherFirstName'];
$fatherLastName= $_POST['fatherLastName'];
$streetFather= $_POST['streetFather'];
$cityFather= $_POST['cityFather'];
$stateFather= $_POST['stateFather'];
$postalCodeFather= $_POST['postalCodeFather'];
$stateFather= $_POST['phoneFather'];
$stateFather= $_POST['emailFather'];
/* Mother */
$motherFirstName= $_POST['motherFirstName'];
$motherLastName= $_POST['motherLastName'];
$streetMother= $_POST['streetMother'];
$cityMother= $_POST['cityMother'];
$stateMother= $_POST['stateMother'];
$postalCodeMother= $_POST['postalCodeMother'];
$phoneMother= $_POST['phoneMother'];
$emailMother= $_POST['emailMother'];

/* Player*/
$playerFirstName=$_POST['playerFirstName'];
$playerLastName=$_POST['playerLastName'];
$playerage=$_POST['playerage'];
$playerHeightFeet=$_POST['playerHeightFeet'];
$playerHeightInches=$_POST['playerHeightInches'];
$playerWeight=$_POST['playerWeight'];
$playerDoctor=$_POST['playerDoctor'];

/* Team */
$teamName=$_POST['teamName'];
$coachName=$_POST['coachName'];
$player=$_POST['player'];
$number=$_POST['number'];
$fieldPosition=$_POST['fieldPosition'];

$mysqli = new mysqli('localhost', $user, $password, $db);

/* check connection */
if ($mysqli->connect_errno) {
    printf("Connect failed: %s\n", $mysqli->connect_error);
    exit();
}

$mysqli->query("INSERT INTO `Parents`(`Parent1Name`, `Parent1LName`, 'Parent1Address', 'Parent1City', 'Parent1State', 'Parent1ZipCode', 'Parent1Numb', 'Parent1Email', 'Parent2Name', 'Parent2LName', 'Parent2Address', 'Parent2City', 'Parent2State', 'Parent2ZipCode', 'Parent2Numb', 'Parent2Email' ) 
VALUES ('". $fatherFirstName ."', '". $fatherLastName ."', '". $streetFather ."', '". $cityFather ."', '". $stateFather ."', '". $postalCodeFather ."', '". $phoneFather ."', '". $emailFather ."', '". $motherFirstName ."', '". $motherLastName ."', '". $streetMother ."', '". $cityMother ."', '". $stateMother ."', '". $postalCodeMother ."', '". $phoneMother ."', '". $emailMother ."')");

$mysqli->query("INSERT INTO `Player`(`PlayerName`, `PlayerLastName`, 'PlayerAge', 'PlayerHeightFeet', 'PlayerHeightInch', 'PlayerWeight', 'PlayerDoctor') 
VALUES ('". $playerFirstName ."', '". $playerLastName ."', '". $playerage ."', '". $playerHeightFeet ."', '". $playerHeightInches ."', '". $playerWeight ."', '". $playerDoctor ."')");

$mysqli->query("INSERT INTO `Team`(`teamName`, `teamCoachName`, 'PlayerNumber', 'PlayerFieldPosition') 
VALUES ('". $teamName ."', '". $coachName ."', '". $number ."',  '". $fieldPosition ."')");

mysql_close($link);
?>