<?php
        include 'db.php';
       $name=$_POST['name'];
       $pass=MD5($_POST['pass']);
       $type=$_POST['type'];
       $code=$_POST['code'];
//       $sql="select * from manger";
       $data=$mysql->query("SELECT * FROM $type")->fetch_all(1);
       for($i=0;$i<count($data);$i++){
       	if($data[$i]['mname']==$name){
       	    if($data[$i]['mpass']==$pass){
       	        session_start();
       	        $_SESSION['user']=$name;
                $_SESSION['isLogin']='yes';
                if($_SESSION['code']==$code) {
                    if ($type == 'student') {
                        $_SESSION['cname'] = $data[$i]['cname'];
                        $_SESSION['uid'] = $data[$i]['uid'];
                    }
                    echo "1";
                    exit();
                }
                echo '4';
                exit();
            }else{
                echo "2";
                exit();
            }
       	}
       }
       echo "3";