<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
include '../konfig.php';
extract($_POST);
$query = "insert into tbl_prj values(null,'$id_dokter','$id_pasien', '$departemen', curtime(), '$keluhan', null, '$biaya', '$bayar', null)";
$insert=$pdo->prepare($query);
$insert->execute();
?>
<script type="text/javascript">
location.href = 'front-office.php?view=tampil_prj';
</script>
