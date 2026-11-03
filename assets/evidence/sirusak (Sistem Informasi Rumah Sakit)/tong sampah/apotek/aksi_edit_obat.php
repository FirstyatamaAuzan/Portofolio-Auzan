<?php
include '../konfig.php';
extract($_POST);
$query = "update tbl_obat set nama_obat='$nama_obat', satuan='$satuan', deskripsi = '$deskripsi', harga = '$harga' where id_obat='$id_obat' ";
$pre=$pdo->prepare($query);
$pre->execute();  