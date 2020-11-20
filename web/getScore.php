<?php
//AINDA NÃO ESTA SENDO USADO
	include_once('connection.php');
    
    if($_POST['game'] == 'frogger'){
        $sql = "SELECT * FROM frogger ORDER BY timeScore";
        $result = mysqli_query($conn, $sql);
    }
	
    if($_POST['game'] == 'memoria'){
        $sql = "SELECT * FROM memoria ORDER BY timeScore";
        $result = mysqli_query($conn, $sql);
    }