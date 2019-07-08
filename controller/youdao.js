
const youdao= require("../service/youdao");
const youdaoSql= require("../sql/youdao");

module.exports= async(ctx,next)=>{
    try{
        ctx.set("Access-Control-Allow-Origin","*");
        ctx.set("Access-Control-Allow-Credentials",true);
        console.log(ctx.query)
        let query= ctx.query.query;
        let res= await youdao.translateText(ctx,query);//调用service
        let qres= await ctx.$utils.query(youdaoSql.queryHistory);//查数据库
        
        ctx.body={
            success: true,
            result: res,
            rows:qres
        }
       

    }catch(err){
        console.log(err)
        ctx.body={
            success: false,
            msg: err.message
        }
    }
}
