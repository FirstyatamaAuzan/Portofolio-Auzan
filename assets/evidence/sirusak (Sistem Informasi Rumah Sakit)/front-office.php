<?php

include './konfig.php';
session_start();
if ($_SESSION['hak_akses'] == 'Front Office') {
    ?>
    <html>
        <head>
            <title>Halaman Front Office</title>
            <script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
            <script type="text/javascript" src="js/jquery.dataTables.min.js"></script>
            <script type="text/javascript" src="js/bootstrap.min.js"></script>
            <link rel="stylesheet" href="css/bootstrap.min.css">
              <!-- Bootstrap core CSS -->
            <!-- <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet"> -->
            <link rel="stylesheet" href="font-awesome-4.1.0/css/font-awesome.min.css">
            <link rel="stylesheet" href="css/jquery.dataTables.min.css">
            <link rel="stylesheet" type="text/css" media="all" href="jsdatepick-calendar/jsDatePick_ltr.min.css" />
            <script type="text/javascript" src="jsdatepick-calendar/jsDatePick.jquery.min.1.3.js"></script>
            <style type="text/css">
                /*	#searchid
                        {
                                width:500px;
                                border:solid 1px #000;
                                padding:10px;
                                font-size:14px;
                        }*/
                #result
                {
                    position:absolute;
                    width:300px;
                    padding:5px;
                    display:none;
                    margin-top:40px;
                    border-top:0px;
                    overflow:hidden;
                    border:1px #CCC solid;
                    background-color: white;
                    z-index: 10;
                    font-size: 14px;
                    border-radius: 2px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                    -webkit-box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }
                .show
                {
                    padding:10px; 
                    border-bottom:1px #999 dashed;
                    /*		font-size:12px; */
                    height:50px;
                }
                .show:hover
                {
                    background:#428bca;
                    color: #fff;
                    cursor:pointer;
                }

                body {margin:0;}

.navbar {
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
}

.main {
  padding: 20px;
  margin-top: 30px;

  height: auto; /* Used in this example to enable scrolling */
}

            </style>
            <script type="text/javascript">
                $(document).ready(function () {
                    $('#datatable').dataTable();
                });
                
            </script>
        </head>

        <body>

            <nav class="navbar navbar-default bg-dark fixed-top" role="navigation"  style="-webkit-box-shadow: 0px 0px 10px #888888;">
                <div class="navbar-header">
                    <a class="navbar-brand" href="#">Sistem Informasi Rumah Sakit</a>
                </div>
                <div>
                    <ul class="nav navbar-nav">
                        <li <?php if (isset($_GET['view'])) {
        echo $_GET['view'] == 'tampil_pasien' || $_GET['view'] == 'tampil_ubah_pasien' ? 'class="active"' : '';
    } ?>><a href="front-office.php?view=tampil_pasien">Pasien &nbsp;
                                <span class="label label-success" style="border-radius: 50px;"> 
                                    <?php
                                    $hitung_pasien = $pdo->query("select * from tbl_pasien");
                                    echo $hitung_pasien->rowCount();
                                    ?></span></a>
                        </li>  
                        <li <?php if (isset($_GET['view'])) {
                                        echo $_GET['view'] == 'tampil_prj' || $_GET['view'] == 'tampil_ubah_prj' ? 'class="active"' : '';
                                    } ?>><a href="front-office.php?view=tampil_prj">Pasien Rawat Jalan &nbsp; 
                                <span class="label label-info" style="border-radius: 50px;"> 
                                    <?php
                                    $hitung_pri = $pdo->query("select * from tbl_prj");
                                    echo $hitung_pri->rowCount();
                                    ?>
                                    <li <?php if (isset($_GET['view'])) {
                                                echo $_GET['view'] == 'tampil_pri' || $_GET['view'] == 'tampil_ubah_pri' ? 'class="active"' : '';
                                            } ?>><a href="front-office.php?view=tampil_pri">Pasien Rawat Inap &nbsp;
                                            <span class="label label-warning" style="border-radius: 50px;"> 
    <?php
    $hitung_pri = $pdo->query("select * from tbl_pri");
    echo $hitung_pri->rowCount();
    ?>
                                            </span></a>
                                    </li> 
                                    </ul>
                                    <p class="navbar-text navbar-right"><?php echo $_SESSION['username']; ?> login sebagai <?php echo $_SESSION['hak_akses']; ?> | <a class="btn btn-default btn-xs" href="logout.php"><i class="glyphicon glyphicon-off"></i> Logout</a>  &nbsp;</p>
                                    </div>


                                    </nav>

                                    <div class="container">
                                        <div class="main">
                                             <?php
                                                    if (isset($_GET['view'])) {
                                                        $view = $_GET['view'];
                                                        include 'front-office/' . $view . '.php';
                                                    } else {
                                                        header("location:front-office.php?view=tampil_pasien");
                                                    }
                                                    ?>
                                        </div>
                                       
                                        </body>

                                        </html>
                                        <?php
                                    } else {
                                        echo "<script>
        alert('Forbidden access');
	location.href='index.php';
	</script>";
                                        exit();
                                    }
                                    ?>

