var light=require("ueklight");
var router=light.Router();
var md5=require('./md5');
var access=require('./access');
var mysql=require('../router/mysql');
var fs=require('fs');
var path=require('path');
///////////////////管理员操作部分///////////////////////////////
router.get('/',function (req,res) {
    res.render('client.html',{name:'title'})
})
router.get('/adminlogin',function (req,res) {
    res.render('index.html',{name:'title'})
})
router.get("/home/admin",function(req,res){
    var aid=req.query.aid;
    var rid=req.query.rid;
    if(rid=='1'){
        mysql.query('select admin.*,role.rname,role.lid from admin,role where admin.rid=role.rid',function (err,result) {
            if(err){
                res.end('err');
            }else{
                var data={lid:'1,2,3,4',result}
                res.send(JSON.stringify(data));
            }
        })
    }else{
        mysql.query('select admin.*,role.rname,role.lid from admin,role where admin.rid=role.rid and role.rid='+rid,function (err,result) {
            if(err){
                res.end('err');
            }else{
                var data={lid:result[0].lid,result};
                res.send(JSON.stringify(data))
            }
        })
    }

});
router.post('/home/adminlogin',function (req,res) {
    var aname=req.body.aname.replace(/['"]/g,"");
    var apass=md5(req.body.apass);
    mysql.query(`select * from admin where aname='${aname}' and apass='${apass}'`,function (err,result) {
        if(err){
            res.end(JSON.stringify({massage:'err'}));
        }else {
            if(result.length>0){
                res.send(JSON.stringify({aid:result[0].aid,massage:"ok",rid:result[0].rid}))
            }else {
                res.end(JSON.stringify({massage:'err'}));
            }
        }
    })

});
router.get('/home/editadmin',function (req,res) {
    var aname=req.query.aname;
    var photo=req.query.photo;
    var rid=req.query.rid;
    var aid=req.query.aid;

    var sql=`update admin set aname='${aname}',photo='${photo}',rid=${rid} where aid=${aid}`;
    mysql.query(sql,function (err,result) {
        if(err){
            res.end('err')
        }else {
            if(result.affectedRows>0){
                res.end('yes')
            }else {
                res.end('err')
            }
        }
    })
});
router.get('/home/adminAdd',function (req,res) {
    var aname=req.query.aname;
    var rid=req.query.rid;
    var photo=req.query.photo;
    var apass=md5(req.query.apass);
    var sql=`insert into admin (aname,rid,photo,apass) values ('${aname}',${rid},'${photo}','${apass}')`;
    mysql.query(sql,function (err,result) {
        if(err){
            res.end('err')
        }else {
            if(result.affectedRows>0){
                res.send('yes')
            }else {
                res.send('err')
            }
        }
    })
});
router.get('/home/admindel',function (req,res) {
    var aid=req.query.aid;
    var naid=req.query.naid;
    access(naid,1,function () {
        mysql.query('select * from admin where aid='+aid,function (err,result) {
            if(err){
                res.end('err');
            }else{

                if(result.length>0){
                    for(var i=0;i<result.length;i++){
                        var photo=result[i].photo;
                        fs.unlinkSync(path.resolve(photo));
                    }
                    mysql.query('delete from admin where aid='+aid,function (err,result1) {
                        if(err){
                            res.end('err')
                        }else {
                            if(result1.affectedRows>0){
                                res.end("yes")
                            }else {
                                res.end("err")
                            }
                        }
                    })
                }
            }
        })
    },function () {
        res.end('no')
    })
});
///////////////////修改密码部分////////////////////////////////
router.post('/home/uppass',function (req,res) {
    var aid=req.body.aid;
    var apass=req.body.apass;
    mysql.query('select apass from admin where aid='+aid,function (err,result) {
        if(err){
            res.end('err');
        }else {
            if(result[0].apass==md5(apass)){
                res.end('yes');
            }else {
                res.end('err')
            }
        }
    })
});
router.post('/home/checkPass',function (req,res) {
    var aid=req.body.aid;
    var apass=md5(req.body.apass);
    mysql.query(`update admin set apass='${apass}' where aid=${aid}`,function (err,result) {
        if(err){
            res.end('err')
        }else {
            if(result.affectedRows>0){
                res.end('yes')
            }else {
                res.end('err')
            }
        }
    })
});
//////////////////权限操作部分/////////////////////////////////
router.get('/home/leveadd',function (req,res) {
    var lname=req.query.lname;
    var lnum=req.query.lnum;
    mysql.query(`insert into leve (lname,num) values ('${lname}','${lnum}')`,function (err,result) {
        if(err){
            res.end("end");
        }else {
            if(result.affectedRows>0){
                res.send("yes")
            }else {
                res.send("err")
            }
        }
    })
});
router.get('/home/leveshow',function (req,res) {
    mysql.query("select * from leve",function (err,result) {
        if(err){
            res.end('err');
        }else {
                res.send(JSON.stringify(result))
        }
    })
});
router.get('/home/leveup',function (req,res) {
    var lid=req.query.lid;
    var lname=req.query.lname;
    var num=req.query.lnum;
    mysql.query(`update leve set lname='${lname}',num='${num}' where lid=${lid}`,function (err,result) {
        if(err){
            res.end("err");
        }else{
            if(result.affectedRows>0){
                res.end("yes");
            }else {
                res.end("err");
            }
        }
    })
});
router.get('/home/levedel',function (req,res) {
    var lid=req.query.lid;
    var aid=req.query.aid;
    access(aid,1,function () {
        mysql.query("delete from leve where lid="+lid,function (err,result) {
            if(err){
                res.end("err")
            }else {
                if(result.affectedRows>0){
                    res.send('yes');
                }else {
                    res.send('err');
                }
            }
        })
    },function () {
        res.end('no')
    })
});
//////////////////角色操作部分/////////////////////////////////
router.get('/home/roleadd',function (req,res) {
    var rname=req.query.rname;
    var lid=(req.query.lid);
    mysql.query(`insert into role (rname,lid) values ('${rname}','${lid}')`,function (err,result) {
        if(err){
            res.end('err');
        }else{
            if(result.affectedRows>0){
                res.send('yes');
            }else {
                res.send('err');
            }
        }
    })
});
router.get('/home/roleshow',function (req,res) {
    mysql.query("select * from role",function (err,result) {
        if(err){
            res.end("err");
        }else {
            mysql.query("select * from leve",function (err,leves) {
                if(err){
                    res.end("err")
                }else {
                    for(var i=0;i<result.length;i++){
                        var ls=(result[i].lid).split(',');
                        for(var j=0;j<ls.length;j++){
                            for(var k=0;k<leves.length;k++){
                                if(ls[j]==leves[k].num){
                                    var obj={};
                                    obj={lid:leves[k].num,lname:leves[k].lname}
                                    ls[j]=obj;
                                }
                            }
                        }
                        result[i].lid=ls;
                        result[i].leves=leves;
                    }
                    res.send(JSON.stringify(result))
                }
            })
        }
    })
});
router.get('/home/roledel',function (req,res) {
    var rid=req.query.rid;
    var aid=req.query.aid;
    access(aid,1,function () {
        mysql.query('select * from admin where admin.rid='+rid,function (err,result1) {
            if(err){
                res.end('err')
            }else {
                if(result1.length>0){
                    for(var i=0;i<result1.length;i++){
                        var photo=result1[i].photo;
                        fs.unlinkSync(path.resolve(photo));
                    }
                    mysql.query('delete from admin where rid='+rid,function (err,result2) {
                        if(err){
                            res.end('err')
                        }else {
                            if(result2.affectedRows>0){
                                mysql.query("delete from role where rid="+rid,function (err,result) {
                                    if(err){
                                        res.end("err")
                                    }else {
                                        if(result.affectedRows>0){
                                            res.send('yes');
                                        }else {
                                            res.send('err');
                                        }
                                    }
                                })
                            }
                        }
                    })
                }else {
                    mysql.query("delete from role where rid="+rid,function (err,result) {
                        if(err){
                            res.end("err")
                        }else {
                            if(result.affectedRows>0){
                                res.send('yes');
                            }else {
                                res.send('err');
                            }
                        }
                    })
                }
            }
        })
    },function () {
        res.send('no');
    })

});
router.get('/home/roleup',function (req,res) {
    var rid=req.query.rid;
    var rname=req.query.rname;
    var lid=req.query.lid;
    mysql.query(`update role set rname='${rname}',lid='${lid}' where rid=${rid}`,function (err,result) {
        if(err){
            res.end("err");
        }else{
            if(result.affectedRows>0){
                res.end("yes");
            }else {
                res.end("err");
            }
        }
    })
});
router.get('/home/Shrole',function (req,res) {
    mysql.query('select * from role',function (err,result) {
        if(err){
            res.end('err');
        }else {
            res.send(JSON.stringify(result))
        }
    })
});
//////////////////部门操作部分/////////////////////////////////
router.get('/home/portshow',function (req,res) {
    mysql.query('select * from part',function (err,result) {
        if(err){
            res.end('err')
        }else{
            if(result.length>0){
                res.end(JSON.stringify(result))
            }else {
                res.end('err')
            }
        }

    })
});
router.get('/home/portadd',function (req,res) {
    var parent=req.query.parent;
    var pname=req.query.pname;
    mysql.query(`insert into part (pname,parent) values ('${pname}',${parent})`,function (err,result) {
        if(err){
            res.end('err')
        }else {
            if(result.affectedRows>0){
                res.send('yes')
            }else {
                res.end('err')
            }
        }
    })
});
router.get('/home/portdel',function (req,res) {
    var pid=req.query.pid;
    var parent=req.query.parent;
    var aid=req.query.aid;
    var obj={};
    obj.pid=[];
    del(pid,parent,aid)
    function del(pid,parent,aid) {
        mysql.query('select * from part where parent='+pid,function (err,result1) {
            if(result1.length>0){
                access(aid,1,function () {
                    mysql.query("delete from part where pid="+pid,function (err,result2) {
                        if(err){
                            res.end('err')
                        }else {
                            if(result2.affectedRows>0){

                                obj.pid.push(pid);
                                obj.message='yes';
                                res.end(JSON.stringify(obj))
                            }else {
                                obj.message='err';
                                res.end(JSON.stringify(obj))
                            }
                        }
                    });
                },function () {
                    res.end(JSON.stringify({message:'no'}))
                })
                for(var i=0;i<result1.length;i++){
                    obj.pid.push(result1[i].pid)
                    del(result1[i].pid,result1[i].parent,aid)
                }
            }else {
                access(aid,1,function () {
                    mysql.query("delete from part where pid="+pid,function (err,result2) {
                        if(err){
                            res.end('err')
                        }else {
                            if(result2.affectedRows>0){

                                obj.pid.push(pid);
                                obj.message='yes';
                                res.end(JSON.stringify(obj))
                            }else {
                                obj.message='err';
                                res.end(JSON.stringify(obj))

                            }
                        }
                    });
                },function () {
                    obj.message='err';
                    res.end(JSON.stringify(obj))
                })
            }

        })
    }
});
router.get('/home/editPort',function (req,res) {
    var parent=req.query.parent;
    var pname=req.query.pname;
    var pid=req.query.pid;
    mysql.query(`update part set pname='${pname}',parent='${parent}' where pid=${pid}`,function (err,result) {
        if(err){
            res.end('err');
        }else {
            if(result.affectedRows>0){
                res.end('yes')
            }else {
                res.end('err')
            }
        }
    })
});
/////////////////用户操作部分/////////////////////////////////
router.get('/home/usershow',function (req,res) {
    var pid=req.query.pid;
    if(pid>=0){
        mysql.query('select user.*,part.* from user,part where user.pid=part.pid and part.pid='+pid,function (err,result) {
            if(err){
                res.end('err')
            }else {
                if(result.length>0){
                    res.end(JSON.stringify(result))
                }else {
                    res.end(JSON.stringify(result))
                }
            }
        })

    }else {
        mysql.query('select user.*,part.* from user,part where user.pid=part.pid',function (err,result) {
            if(err){
                res.end('err')
            }else {
                if(result.length>0){
                    res.end(JSON.stringify(result))
                }else {
                    res.end(JSON.stringify(result))
                }
            }
        })

    }
});
router.get('/home/useradd',function (req,res) {
    var uname=req.query.uname;
    var upass=md5('123456');
    var phone=req.query.phone;
    var pid=req.query.pid;
    mysql.query(`replace into user (uname,upass,photo,phone,pid) values ('${uname}','${upass}','upload/151746297078111.png','${phone}',${pid})`,function (err,result) {
        if(err){
            res.end('err')
        }else {
            if(result.affectedRows>0){
                res.end('yes')
            }else {
                res.end('err')
            }
        }

    })
});
router.post('/home/edituser',function (req,res) {
    var uname=req.body.uname;
    var upass=md5(req.body.upass);
    var photo=req.body.photo;
    var phone=req.body.phone;
    var pid=req.body.pid;
    var uid=req.body.uid;
    var sql=`update user set uname='${uname}',upass='${upass}',photo='${photo}',phone='${phone}',pid=${pid} where uid=${uid}`;
    mysql.query(sql,function (err,result) {
        if(err){
            res.end('err')
        }else {
            if(result.affectedRows>0){
                res.end('yes')
            }else {
                res.end('err')
            }
        }

    })
});
router.get('/home/userdel',function (req,res) {
    var aid=req.query.aid;
    var uid=req.query.uid;
    access(aid,1,function () {
        mysql.query('select * from user where uid='+uid,function (err,result1) {
            if(err){
                res.end('err')
            }else{
                if(result1[0].photo){
                    fs.unlinkSync(path.resolve(result1[0].photo));
                }
                mysql.query('delete from user where uid='+uid,function (err,result) {
                    if(err){
                        res.end('err');
                    }else {
                        if(result.affectedRows>0){
                            res.end('yes')
                        }else {
                            res.end('err')
                        }
                    }
                })
            }
        })
    },function () {
        res.end('no')
    })

});
////////////////banner管理部分////////////////////////////////
router.post('/home/badd',function (req,res) {
    var img = req.body.photo;
    var sql=`insert into banner (img) values ('${img}')`;
    mysql.query(sql,function (err,result) {
        if(err){
            res.end('err')
        }else{
            if(result.affectedRows){
                res.end('yes')
            }else {
                res.end('err')
            }
        }
    })
});
router.get('/home/banner',function (req,res) {
    mysql.query('select * from banner',function (err,result) {
        if(err){
            res.end('err')
        }else {
            if(result.length>0){
                res.end(JSON.stringify(result))
            }
            res.end(JSON.stringify(result))
        }
    })
});
router.get('/home/bannerdel',function (req,res) {
    var aid=req.query.aid;
    var bid=req.query.bid;
    access(aid,1,function () {
        mysql.query('select img from banner where bid='+bid,function (err,result) {
            if(err){
                res.end('err')
            }else {
                if(result.length>0){
                    fs.unlinkSync(path.resolve(result[0].img));
                    mysql.query('delete from banner where bid='+bid,function (err,result1) {
                        if(err){
                            res.end('err')
                        }else {
                            if(result1.affectedRows>0){
                                res.end('yes')
                            }else {
                                res.end('err')
                            }
                        }
                    })
                }else {
                    res.end('err')
                }
            }
        })
    },function () {
        res.end('no')
    })
});