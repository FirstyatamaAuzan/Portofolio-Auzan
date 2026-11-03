<?php
include '../konfig.php';
$perawatan =  $_GET['perawatan'];
$pelayanan = $_GET['pelayanan'];
$tipe_kamar = $_GET['tipe_kamar'];

$result = $pdo->query("SELECT * FROM tbl_tarif_ri WHERE perawatan = '$perawatan' and pelayanan = '$pelayanan' and tipe_kamar = '$tipe_kamar' ");
 
while($row = $result->fetch())
  {
    echo '<div>';
    echo '<h3 id="id_tarif">'.$row['id_tarif_ri'].'</h3>';
    echo '<h3 id="tarif">'.$row['tarif'].'</h3>';
    echo '</div>';
  }

 
?>