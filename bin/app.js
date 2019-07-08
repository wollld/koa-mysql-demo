/**
 * Created by land on 16/4/9.
 */

// Koa application is now a class and requires the new operator.
const Koa=require("koa");
const app = new Koa();
const path = require('path');
const statics= require("koa-static");
const convert=require("koa-convert");
const router= require('../router');//路由系统

app.context.$utils= require("../utils");
app.context.$config=require("../config.js")

global.CACHE_ACCESS_TOKEN="";
global.LAST_MODIFY_TIME_STAMP=0;

//模版
/*
 const views=require("koa-views");
 app.use(views(__dirname + '/views', {
    extension: 'ejs'}
));
 */

const json =require("koa-json")();
//请求中对post参数进行解析
const bodyparser= require("koa-bodyparser")({
    formLimit: 10485760
});
//控制台打印请求信息
const logger= require("koa-logger")();

app.use(bodyparser);
app.use(convert(json));
app.use(logger);

var publicUrl= path.resolve(__dirname,"../public");
app.use( convert(statics( publicUrl ) ) );


app.use( router.routes() );
app.use( router.allowedMethods() );

//注册错误事件
app.on("error",function(err,ctx){
    console.log(err)

});

app.listen(app.context.$config.port, function () {
    console.log("server on "+ app.context.$config.port);
});
