const sha256 = require('js-sha256');
const axios= require('axios');


const from = 'zh-CHS';
const to = 'en';

function getInput(input){
	if (input.length == 0) {
		return null;
	}
	var result;
	var len = input.length;
	if(len <= 20){
		result = input;
	}else{
		var startStr = input.substring(0,10);
		var endStr = input.substring(len-10,len);
		result = startStr + len +endStr;
	}
	return result;

}

/**
 * 通过文本查找翻译
 * @param ctx
 * @param queryText
 */
exports.translateText= async(ctx,queryText)=>{

    let appKey= ctx.$config.appKey,
    	key= ctx.$config.key,
    	salt = new Date().getTime(),
		curtime=Math.round(new Date().getTime()/1000),
		str1 = appKey + getInput(queryText) + salt + curtime +key,
	    sign = sha256(str1);
	  
	let res= await axios.get('http://openapi.youdao.com/api',{
				params:{
					q: queryText,
			        appKey: appKey,
			        salt: salt,
			        from: from,
			        to: to,
					curtime: curtime,
			        sign: sign,
					signType: "v3"
				}
			});
	
	return  res.data.translation;

};