var mongoose=require('mongoose');
var url='mongodb://localhost:27017/movieServer';
mongoose.connect(url,{useNewUrlParser:true},function(error){
	if(error){
		console.log('connect error:'+error);
	}
	else{
		console.log('连接成功');
	}
});
module.exports=mongoose;