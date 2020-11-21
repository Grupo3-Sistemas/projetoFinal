<?php
	$servidor = "database-1.cary8d937tuw.us-east-1.rds.amazonaws.com";
	$usuario = "admin";
	$senha = "adminadmin";
	$dbname = "banco1";
	
	//Criar a conexão
	$conn = mysqli_connect($servidor, $usuario, $senha, $dbname);

	if($conn->connect_errno){
		echo "Falha ao conectar no BD (".$conn->connect_errno.") ".$conn->connect_error;
	}
?>