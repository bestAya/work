var light=require("ueklight");
var router=light.Router();
var md5=require('./md5');
var access=require('./access');
var mysql=require('../router/mysql');
var xlsx=require('node-xlsx');
var fs=require('fs');
var path=require('path');
var async=require('async');
router.post('/home/upfile',function (req,res) {
    const workSheetsFromFile = xlsx.parse(res.upInfo.path);
    var data=workSheetsFromFile[0].data;
    var tableData=[];
    for(var i=1;i<data.length;i++){
        if(data[i].length>0){
            tableData.push(data[i][2]);
        }else{
            data.splice(i,1)
        }
    }
    var obj=new Set(tableData);
    var newarr=Array.from(obj);
    var Datas=[];
    async.series([
        function (next) {
            mysql.query('select * from part',function (err,result) {
                if(err){
                    res.end('err');
                    next()
                }else {
                    Datas=result;
                    next();
                }
            })
        },
        function (next){
            function min(Datas) {
                var arr=[];
                for(var j=0;j<Datas.length;j++){
                    var flage=true;
                    for(var k=0;k<Datas.length;k++){
                        if(Datas[j].pid==Datas[k].parent){
                            flage=false;
                            break;
                        }
                    }
                    if(flage){
                        arr.push(Datas[j])
                    }
                }
                return arr;
            }

            next(null,min(Datas))
        }
        ],function (err,result) {
        if(err){
            res.end('err')
        }else {
            var message=[];
            var same={};
            for(var i=0;i<newarr.length;i++){
                var falge=true;
                for(var j=0;j<result[1].length;j++){
                    if(newarr[i]==result[1][j].pname){
                        same[result[1][j].pname]=result[1][j].pid;
                        falge=false;
                        break;
                    }
                }
                if(falge) {
                    message.push(newarr[i])
                    res.end(JSON.stringify(message))
                }
            }
            if(message.length>0){
                res.end(JSON.stringify(message))
            }else {
                data.shift(1);
                var newdata=[];
                for(var i=0;i<data.length;i++){
                    if(data[i].length>0){
                    var max=[];
                        max.push(md5('123456'))
                        max.push(data[i][0]);
                        max.push(data[i][1]);
                        max.push(same[data[i][2]]);
                        max.push('upload/151746297078111.png');
                        newdata.push(max)
                    }
                }
                mysql.query('replace into user (upass,uname,phone,pid,photo) values ?',[newdata],function (err,reuslt1) {
                    if(err){
                        res.end('err')
                    }else {
                        if(reuslt1.affectedRows>0){
                            res.end('yes')
                        }else {
                            res.end('err')
                        }
                    }
                })

            }

        }
    })
    fs.unlinkSync(path.resolve(res.upInfo.relPath));
})
