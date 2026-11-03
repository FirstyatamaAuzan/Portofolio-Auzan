<?php

include '../konfig.php';
extract($_POST);
$query = "insert into tbl_obat values(null, '$nama_obat','$satuan', '$deskripsi', '$harga')";
$pre=$pdo->prepare($query);
$pre->execute();