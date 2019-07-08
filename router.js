/**
 * Created by land on 6/19/16.
 */
var Router=require("koa-router");
var router=new Router();

const youdao = require('./controller/youdao');

//-----------------------api-----------------

//有道查词
router.get("/api/youdao",youdao);//路由分发



module.exports= router;
