let forMatTime=value=>{
	var date=new Date(parseInt(value));
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() < 10 ?  '0'+date.getDate()+ ' ' : date.getDate()+ ' ';
    var h = date.getHours() < 10 ? '0'+date.getHours()+ ':' : date.getHours()+ ':';
    var m = date.getMinutes() < 10 ? '0'+date.getMinutes()+ ':' : date.getMinutes()+ ':';
    var s = date.getSeconds()< 10 ? '0'+date.getSeconds() : date.getSeconds();
    return Y+M+D+h+m+s;
}
let forMatDate=value=>{
	var date=new Date(parseInt(value));
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() < 10 ?  '0'+date.getDate()+ ' ' : date.getDate()+ ' ';
    return Y+M+D;
}
let timeHander=function(value){
				//当前时间
	var startTime=value;
	var currTime=(new Date()).getTime();
	var totalTime=currTime-startTime;
	var Y=parseInt(totalTime/parseInt(1000*60*60*24*365));
	totalTime=totalTime%parseInt(1000*60*60*24*365);
	var M=parseInt(totalTime/parseInt(1000*60*60*24*30));
	totalTime=totalTime%parseInt(1000*60*60*24*30);
	var D=parseInt(totalTime/parseInt(1000*60*60*24));
	totalTime=totalTime%parseInt(1000*60*60*24);
	var h=parseInt(totalTime/parseInt(1000*60*60));
	totalTime=totalTime%parseInt(1000*60*60);
	var s=parseInt(totalTime/parseInt(1000*60));
	if(Y>0){
		return Y+'年前发布';
	}
	else if(M>0){
		return M+'月前发布';
	}
	else if(D>0){
		return D+'天前发布';
	}
	else if(h>0){
		return h+'小时前发布';
	}
	else if(s>0){
		return s+'分钟前发布';
	}
	else{
		return '刚刚发布';
	}
}
export {forMatTime,forMatDate};