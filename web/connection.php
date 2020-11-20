<?php
	$servidor = "localhost";
	$usuario = "root";
	$senha = "";
	$dbname = "unijogos";
	
	//Criar a conexão
	$conn = mysqli_connect($servidor, $usuario, $senha, $dbname);

	if($conn->connect_errno){
		echo "Falha ao conectar no BD (".$conn->connect_errno.") ".$conn->connect_error;
	}
?>