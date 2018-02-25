var cheerio=require('cheerio');
var request=require('request');
var fs=require('fs');
var mysql=require('./router/mysql')
var async=require('async');
var md5=require('./router/md5');
var buf=Buffer.alloc(65535);
var link=[];
var datas=[];
var CronJob = require('cron').CronJob;
new CronJob('00 */3 * * * *', function() {
    console.log('开始爬取......')
    crawl();
}, null, true, 'America/Los_Angeles');
function crawl() {
    async.series([
        function (next) {
            mysql.query('select * from newper',function (err,result1) {
                if(err){
                    console.log(err)
                }else{
                    for(var i=0;i<result1.length;i++){
                        save(result1[i].title,8)
                    }
                    next();
                }
            })
        },function (next) {
            ////////获取列表内容
            request("http://tech.ifeng.com/listpage/803/1/list.shtml",function (err,head,body) {
                var $=cheerio.load(body);
                var arr1=$('.zheng_list h1 a');
                var arr2=$('.zheng_list h2 a');
                var arr3=Array.prototype.slice.call(arr1)
                var arr4=Array.prototype.slice.call(arr2)
                var arr=arr3.concat(arr4)
                arr.forEach(function (item,index) {
                    link.push($(item).attr('href'))
                })
                next()
            })
        },
        function (next) {
            //////获取网页内容

            async.eachSeries(link,function (item,next1) {
                request(item,function (err,head,body) {
                    var arr=[];
                    var $=cheerio.load(body);
                    var title=$('#artical_topic').text();
                    diff(title,8,function () {
                        var con=$('#artical_real').text();
                        var thumb=$('#main_content .detailPic img').attr('src');
                        arr.push(title)
                        arr.push(con);
                        arr.push(thumb)
                        datas.push(arr);
                        console.log(title)
                        next1();

                    },function () {
                        console.log(title+'------>已经存在')
                        next1();
                    })

                })
            },function () {
                next();
            })
        },
        function (next) {
            mysql.query('insert into newper (title,con,thumb) values ?',[datas],function (err,result3) {
                if(err){
                    console.log(err)
                }else {
                    next(null,result3.affectedRows);
                }
            })
        }
    ],function (err,result) {
        if(err){
            console.log(err)
        }else {
            if(result){
                console.log(result)
            }
        }

    })
}






function save(str,num) {
    var md5str=md5(str);
    var nums=32/num;
    for(var i=0;i<32;i+=nums){
        buf[parseInt(md5str.substr(i,nums),16)]=1;
    }
}
function diff(str,num,rest,err) {
    var md5str=md5(str)
    var nums=32/num;
    var flage=true;
    for(var i=0;i<32;i+=nums){

        if(buf[parseInt(md5str.substr(i,nums),16)]==1){
            flage=false;
        }
    }
    if(flage){
        if(rest){
            rest();
        }
    }else {
        if(err){
            err()
        }
    }
}