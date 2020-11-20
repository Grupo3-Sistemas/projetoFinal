<?php
	include_once('connection.php');
	$player = $_POST['player'];
	$timeScore = $_POST['timeScore'];
    
    if($_POST['game'] == 'frogger'){
        $sql = "INSERT INTO frogger(nmPlayer, timeScore) VALUES ('$player', '$timeScore')";
        $result = mysqli_query($conn, $sql);
    }
	
    if($_POST['game'] == 'memoria'){
        $sql = "INSERT INTO memoria(nmPlayer, timeScore) VALUES ('$player', '$timeScore')";
        $result = mysqli_query($conn, $sql);
    }