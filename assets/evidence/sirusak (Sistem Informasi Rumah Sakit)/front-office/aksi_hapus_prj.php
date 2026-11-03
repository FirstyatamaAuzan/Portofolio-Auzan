<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
include 'konfig.php';
$id = $_GET['no_rj'];
$query = "delete from tbl_prj where no_rj='$id' ";
$hapus=$pdo->prepare($query);
$hapus->execute();
// header("location:front-office.php?view=tampil_prj");
?>
<script type="text/javascript">
location.href = 'front-office.php?view=tampil_prj';
</script>
