<?php
include '../konfig.php';
$selectvalue = $_GET['departemen'];
 

$result = $pdo->query("SELECT departemen, tarif FROM tbl_tarif_rj WHERE departemen = '$selectvalue'");
 
while($row = $result->fetch())
  {
    echo $row['tarif'];
  }
 

 
?>