var express = require('express');
var router = express.Router();
var user=require('../models/user.js');
var comment=require('../models/comment.js');
var movie=require('../models/movie.js');
var mail=require('../models/mail.js');
var message=require('../models/message.js');
var article=require('../models/article.js');
var crypto =require('crypto');
const init_token='TKL02o';
function getMD5Password(id){
	var md5=crypto.createHash('md5');
	var token_before=id+init_token;
	return md5.update(token_before).digest('hex');

};

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond ');
});


//用户登陆接口,  login页面使用；注册界面使用
router.post('/login',function(req,res,next){
	user.findUserLogin(req.body.username,req.body.password,function(error,userSave){
		if(userSave.length!=0){
			var token_after=getMD5Password(userSave[0]._id);
			res.json({status:0,data:{user:userSave,token:token_after},message:'用户成功登陆'});
		}
		else{
			res.json({status:1,data:{user:userSave},message:'用户名或者密码错误'});
		}

	});
});


//用户注册接口 主页界面使用，用户注册账号
router.post('/register',function(req,res,next){
	var registerUser=new user({
		username:req.body.username,
		password:req.body.password,
		userMail:req.body.userMail,
		userPhone:req.body.userPhone,
		userImg:'http://localhost:3000/uploads/user/default.jpeg',
		userMotto:'请编辑个人座右铭',
		userLabel:'',
		userCity:'未分类',
		userFllow:'',
		userBlack:'',
		userJoinTime:Date.now(),
		userDescription:'请编辑个人介绍',
		userAdmin:0,
		userPower:0,
		userStop:0
	});
	registerUser.save(function(){
		res.json({status:0,message:'注册成功'});
	});
});
//用户提交电影和文章评论 文章详情界面使用,电影详情界面使用
router.post('/postComment',function(req,res,next){
	if(!req.body.context){
		res.json({status:1,message:'评论内容为空'});
	}
	if(req.body.movie_id){
		var saveComment =new comment({
			movie_id:req.body.movie_id,
			username:req.body.username,
			context:req.body.context,
			movieMark:req.body.movieMark,
			commentTime:Date.now(),
			commentNumSuppose:0,
			check:true
		});
	}
	if(req.body.article_id){
		var saveComment=new comment({
			article_id:req.body.article_id,
			username:req.body.username,
			context:req.body.context,
			movieMark:req.body.movieMark,
			commentTime:Date.now(),
			commentNumSuppose:0,
			check:true

		})
	}
	saveComment.save(function(error){
		if(error){
			res.json({status:1,message:error});
		}
		else{
			res.json({status:0,message:'评论成功'});
		}
	});

});
//用户文章和电影点赞，文章详情界面使用，电影详情界面使用
router.post('/support',function(req,res,next){
	if(req.body.movie_id){
		movie.findById(req.body.movie_id,function(err,supportMovie){
			movie.update({_id:req.body.movie_id},{movieNumSuppose:supportMovie.movieNumSuppose+1},function(err){
				if(err){
					res.json({status:1,message:'点赞失败',data:err});
				}
				res.json({status:0,message:'点赞成功'});
			});
		});
	}
	if(req.body.article_id){
		 article.findByArticleId(req.body.article_id,function(err,supportArticle){
			article.update({_id:req.body.article_id},{articleNumSuppose:supportArticle[0].articleNumSuppose+1},function(err){
				if(err){
					res.json({status:1,message:'点赞失败',data:err});
				}
				res.json({status:0,message:'点赞成功'});
			})
		 });
	}

});

//用户想看，电影详情界面使用
router.post('/wantsee',function(req,res,next){
	if(!req.body.movie_id){
		res.json({status:1,message:'电影id为空'});
	}
	movie.findById(req.body.movie_id,function(err,wantseeMovie){
		movie.update({_id:req.body.movie_id},{movieNumWantSee:wantseeMovie.movieNumWantSee+1},function(err){
			if(err){
				res.json({status:1,message:'想看失败',data:err});
			}
			res.json({status:0,message:'想看成功'});
		});
	});

});

//用户下载，电影详情界面使用
router.post('/download',function(req,res,next){
	if(!req.body.movie_id){
		res.json({status:1,message:'电影id为空'});
	}
	movie.findById(req.body.movie_id,function(err,downloadMovie){
		movie.update({_id:req.body.movie_id},{movieNumDownload:downloadMovie.movieNumDownload+1},function(err){
			if(err){
				res.json({status:1,message:'点赞失败',data:err});
			}
			else{
				res.json({status:0,message:'下载成功',data:downloadMovie});
			}
		});
	});

});
//用户找回密码  repassword页面使用，用户个人主页，用户账户管理使用；
router.post('/findPassword',function(req,res,next){
	if(req.body.repassword){
		//	当存在新密码，需要验证登陆情况或者验证其code；
		//有登陆状态的时候
		if(req.body.token){
			if(!req.body.user_id){
				res.json({status:1,message:'用户登陆错误'});
			}
			if(!req.body.password){
				res.json({status:1,message:'用户老密码错误'});
			}
			if(req.body.token==getMD5Password(req.body.user_id)){
				user.findOne({_id:req.body.user_id,password:req.body.password},function(err,checkUser){
					if(checkUser){
						user.update({_id:req.body.user_id},{password:req.body.repassword},function(err,userUpdate){
							if(err){
								res.json({status:1,message:'更改失败，请重试',data:err});
							}
							else{
								res.json({status:0,message:'更改成功',data:userUpdate});
							}
						});	
					}	
					else{
						res.json({status:1,message:'用户老密码错误'});
					}
				});
			}
			else{
				res.json({status:1,message:'用户登陆错误'});
			}
		}
		//没有登陆状态的时候

		else{
			//repassword界面不需要再次验证用户信息
			user.findUserPassword(req.body.username,req.body.userMail,req.body.userPhone,function(err,userFound){
				if(userFound.length!=0){

					user.update({_id:userFound[0]._id},{password:req.body.repassword},function(err,userUpdate){
						if(err){
							res.json({status:1,message:'更改失败，请重试',data:err});
						}
						else{
							res.json({status:0,message:'更改成功',data:userUpdate});
						}
					});
				}
				else{
					res.json({status:1,message:'输入的信息错误，无法更改密码'});
				}
			});
		}
	}
	//不存在新密码字段
	else{
		user.findUserPassword(req.body.username,req.body.userMail,req.body.userPhone,function(error,userFound){
			if(error){
				res.json({status:1,message:'出现错误，请重试'});
			}
			if(userFound.length>0){
				res.json({status:0,message:'验证成功，请修改密码',data:userFound});
			}
			else{
				res.json({status:1,message:'用户名、手机号、邮箱有错误'});
			}
		});
		

	}

});


//获取用户详情 被注册界面检验名字使用，被个人用户界面使用，被账户管理界面使用，被发送站内信界面使用，关注的人界面使用
router.post('/userDetail',function(req,res,next){
	//检测用户名是否存在，被注册界面使用
	if(req.body.username){
		user.findByUsername(req.body.username,function(err,toUser){
			if(toUser.length!=0){
				res.json({status:0,message:'对象存在',data:toUser});
			}
			else{
				res.json({status:1,message:'你发送的对象不存在'});
			}
		});
	}
	if(req.body.user_id){
		user.findByUserId(req.body.user_id,function(err,User){
			if(err){
				res.json({status:1,message:'出现错误'});
			}
			else{
				res.json({status:0,message:'获取成功',data:User});

			}

		});
	}
});
//修改用户信息
//更新用户信息，页面个人主页使用，账户管理界面使用，取消关注界面使用
router.post('/updateUser',function(req,res,next){
	if(req.body.flay==0){
		user.update({_id:req.body.user_id},{userFllow:req.body.userFllow},function(err,updateUser){
			if(err){
				res.json({status:1,message:'出现错误'});
			}
			else{
				res.json({status:0,message:'更新成功',data:updateUser});
			}
		});	
	}
	if(req.body.flay==1){
		user.update({_id:req.body.user_id},{userBlack:req.body.userBlack},function(err,updateUser){
			if(err){
				res.json({status:1,message:'出现错误'});
			}
			else{
				res.json({status:0,message:'更新成功',data:updateUser});
			}
		});	
	}
	if(req.body.flay==2){
		user.update({_id:req.body.user_id},{userCity:req.body.userCity},function(err,updateUser){
			if(err){
				res.json({status:1,message:'出现错误'});
			}
			else{
				res.json({status:0,message:'更新成功',data:updateUser});
			}
		});
	}
	if(req.body.flay==3){
		user.update({_id:req.body.user_id},{userLabel:req.body.userLabel},function(err,updateUser){
			if(err){
				res.json({status:1,message:'出现错误'});
			}
			else{
				res.json({status:0,message:'更新成功',data:updateUser});
			}
		});
	}
	if(req.body.flay==4){
		user.update({_id:req.body.user_id},{userDescription:req.body.userDescription},function(err,updateUser){
			if(err){
				res.json({status:1,message:'出现错误'});
			}
			else{
				res.json({status:0,message:'更新成功',data:updateUser});
			}
		});
	}
	if(req.body.flay==5){
		user.update({_id:req.body.user_id},{userMotto:req.body.userMotto},function(err,updateUser){
			if(err){
				res.json({status:1,message:'出现错误'});
			}
			else{
				res.json({status:0,message:'更新成功',data:updateUser});
			}
		});
	}
	if(req.body.flay==6){
		user.update({_id:req.body.user_id},{userImg:req.body.userImg},function(err,updateUser){
			if(err){
				res.json({status:1,message:'出现错误'});
			}
			else{
				res.json({status:0,message:'更新成功',data:updateUser});
			}
		});
	}
	else{
		user.update({_id:req.body._id},{
					userImg:req.body.userImg,
				 	username:req.body.username,
				 	userPhone:req.body.userPhone,
				 	userCity:req.body.userCity,
				 	userMotto:req.body.userMotto,
				 	userDescription:req.body.userDescription,
				 	userLabel:req.body.userLabel},function(err,updateUser){
			if(err){
				res.json({status:1,message:'出现错误'});
			}
			else{
				res.json({status:0,message:'更新成功',data:updateUser});
			}

		});
	}		
});

//用户发送留言 个人界面使用，用来发送留言
router.post('/sendMessage',function(req,res,next){
	if(!req.body.token){
		res.json({status:1,message:'用户登陆状态错误'});
	}
	if(!req.body.user_id){
		res.json({status:1,message:'用户id错误'});
	}
	if(req.body.token==getMD5Password(req.body.user_id)){	
		var newMessage=new message({
			fromUser:req.body.user_id,
			toUser:req.body.toUser,
			context:req.body.context,
			sendTime:Date.now()
		});
		newMessage.save(function(){
			res.json({status:0,message:'发送成功'});
		});
	}
	else{
		res.json({status:1,message:'用户登陆错误'});
	}
});
//用户展示留言 个人主页界面使用，用来展示个人留言
router.post('/showMessage',function(req,res,next){
		if(!req.body.toUser){
			res.json({status:1,message:'请输入送往人'});
		}
		//收到的站内信
		message.findByToUserId(req.body.toUser,function(err,receiveMail){
			res.json({status:0,message:'留言获取成功',data:receiveMail});
		});	

});
//用户发送站内信 被发送站内信界面使用
router.post('/sendEmail',function(req,res,next){
	if(!req.body.token){
		res.json({status:1,message:'用户登陆状态错误'});
	}
	if(!req.body.user_id){
		res.json({status:1,message:'用户id错误'});
	}
	if(req.body.token==getMD5Password(req.body.user_id)){	
		var newMail=new mail({
			fromUser:req.body.user_id,
			toUser:req.body.toUser,
			title:req.body.title,
			context:req.body.context,
			sendTime:Date.now()
		});
		newMail.save(function(){
			res.json({status:0,message:'发送成功'});
		});
	}
	else{
		res.json({status:1,message:'用户登陆错误'});
	}
	
});
//用户删除站内信，站内信界面使用 
router.post('/delEmail',function(req,res,next){
	if(!req.body.mail_id){
		res.json({status:1,message:'未传递邮件id，操作失败'});
	}
	mail.remove({_id:req.body.mail_id},function(err,delMail){
		if(err){
			res.json({status:1,message:'操作失败，请查找原因'});
		}
		else{
			res.json({status:0,message:'操作成功',data:delMail});
		}
	});
});

//展示用户站内信 站内信界面使用，
router.post('/showEmail',function(req,res,next){
	if(!req.body.token){
		res.json({status:1,message:'用户登陆的状态错误'})
	}
	if(!req.body.user_id){
		res.json({status:1,message:'用户的id为空'});
	}
	if(req.body.token==getMD5Password(req.body.user_id)){
		if(req.body.receive==0){
			//发送的站内信
			mail.findByFromUserId(req.body.user_id,function(err,sendMail){
				res.json({status:0,message:'用户发送的站内信获取成功',data:sendMail});
			});
		}
		else{
			//收到的站内信
			mail.findByToUserId(req.body.user_id,function(err,receiveMail){
				res.json({status:0,message:'用户收到的站内信获取成功',data:receiveMail});
			});
		}
	}
	else{
		res.json({status:1,message:'用户登陆错误'});
	}

});

//获取MD5值
module.exports = router;
