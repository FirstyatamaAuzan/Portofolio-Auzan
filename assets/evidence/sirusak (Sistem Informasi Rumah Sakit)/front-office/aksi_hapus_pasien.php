<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
include 'konfig.php';
$id_pasien = $_GET['id_pasien'];
$query = "delete from tbl_pasien where id_pasien='$id_pasien'";
$hapus=$pdo->prepare($query);
$hapus->execute();
// header("location:front-office.php?view=tampil_pasien");
?>
<script type="text/javascript">
location.href = 'front-office.php?view=tampil_pasien';
</script>