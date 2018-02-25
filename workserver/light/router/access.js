var mysql=require('./mysql');
function access(aid,num,succes,errs) {
    var sql=`select * from admin,role where admin.aid=${aid} and admin.rid=role.rid and find_in_set("${num}",role.lid)`;
    mysql.query(sql,function (err,result) {
        if(err){
            errs();
        }else{
            if(result.length>0){
                succes();
            }else {
                errs();
            }

        }
    })
}
module.exports=access;