var light=require("ueklight");
var router=light.Router();
var md5=require('../md5');
var access=require('../access');
var mysql=require('../mysql');
var fs=require('fs');
var path=require('path');
router.get('/home/nesShow',function (req,res) {
    var degs=req.query.degs;
    var deg=req.query.deg;
    mysql.query(`select * from newper limit ${degs},${deg}`,function (err,result) {
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
});
router.get('/home/shownes',function (req,res) {
    var nid=req.query.nid;
    mysql.query('select * from newper where nid='+nid,function (err,result) {
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
});
router.get('/home/telshow',function (req,res) {
    mysql.query('select * from user',function (err,result) {
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
});
router.get('/home/SelectUser',function (req,res) {
    mysql.query('select user.*,part.* from user,part where user.pid=part.pid',function (err,result) {
        if(err){
            res.end('err')
        }else {
            if(result.length>0){
                res.end(JSON.stringify(result))
            }else{
                res.end(JSON.stringify(result))
            }
        }
    })
});
router.post('/home/clitloing',function (req,res) {
    var phone=req.body.phone.replace(/['"]/g,"");
    var upass=md5(req.body.pass);
    console.log(phone,upass)
    mysql.query(`select * from user where phone='${phone}' and upass='${upass}'`,function (err,result) {
        if(err){
            res.end(JSON.stringify({massage:'err'}));
        }else {
            if(result.length>0){
                res.send(JSON.stringify({result:result[0],massage:"yes"}))
            }else {
                res.end(JSON.stringify({massage:'err'}));
            }
        }
    })
});
router.get('/home/suse',function (req,res) {
    var uid=req.query.uid;
    mysql.query('select * from user where uid='+uid,function (err,result) {
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
});
/////////日志///////////////////
router.get('/home/addlogs',function (req,res) {
    var uid1=req.query.uid1;
    var uid2=req.query.uid2;
    var title=req.query.title;
    var con=req.query.con;
    mysql.query(`insert into logr (uid1,uid2,title,con) values ('${uid1}','${uid2}','${title}','${con}')`,function (err,result) {
        if(err){
            res.end('err');
        }else {
            if(result.affectedRows>0){
                res.end('yes')
            }else{
                res.end('err')
            }
        }
    })
});
router.get('/home/showlogr',function (req,res) {
    var type=req.query.type;
    var sql='';
    var uid=req.query.uid;
    if(type=='accept') {
        sql=`select logr.*,user.photo,user.uname from logr,user where logr.uid2=${uid} and user.uid=logr.uid1 `;
    }else{
        sql=`select logr.*,user.photo,user.uname from logr,user where logr.uid1=${uid} and user.uid=logr.uid2`;
    }
    mysql.query(sql,function (err,result) {
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
})
//////////信息修改//////////////////
router.get('/home/upphoto',function (req,res) {
    var photo=req.query.photo;
    var uid=req.query.uid;
    mysql.query(`update user set photo='${photo}' where uid=${uid}`,function (err,result) {
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
router.get('/home/saveupass',function (req,res) {
    var upass=md5(req.query.upass);
    var uid=req.query.uid;
    mysql.query(`update user set upass='${upass}' where uid=${uid}`,function (err,result) {
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
})