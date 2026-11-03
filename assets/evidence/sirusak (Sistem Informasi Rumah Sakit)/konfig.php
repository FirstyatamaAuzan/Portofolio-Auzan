<?php

try{
	$dsn = "mysql:host=localhost;dbname=rumah_sakit;charset=utf8mb4";
	$pdo_user = "root";
	$pdo_pass = "";
	$pdo = new PDO( $dsn, $pdo_user , $pdo_pass);
	$pdo->setAttribute( PDO::ATTR_DEFAULT_FETCH_MODE,PDO::FETCH_LAZY );
	$pdo->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
}catch (PDOException $e) {
    echo $e->getMessage();
}

	 
?>