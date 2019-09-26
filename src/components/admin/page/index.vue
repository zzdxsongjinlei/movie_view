<template>
<div class="main">
	<div class="user">
		<div class="userImg">
			<img :src="user.userImg">
		</div>
		
		<div class="userInfo">
			<p><span>姓名:</span>{{user.username}}</p>
			<p><span>邮箱:</span>{{user.userMail}}</p>
			<p><span>电话:</span>{{user.userPhone}}</p>
			<p><span>个人描述:</span>{{user.userDescription}}</p>
		</div>
		
	</div>
	<div class="website">
		<h3>网站说明:</h3>
		<ul>
			<li>
	              1.这个网站的前台架构搭建基于vue-cli，页面基于vue，数据交互基于axios，跨域使用了nginx做了反代理，路由管理基于router，也使用到了vuex，页面布局使用element-ui；关于后台，架构搭建基于express，文件的存储使用multer，数据库使用的是mongoDB；数据库存储数据，当加载页面时，前台通过调用api获取数据库数据对前台进行渲染；当用户操作时，前台通过调用api对数据库数据进行修改
            </li>
			<li>
                  2.这个网站的前台实现了电影页面、文章页面、个人主页、站内信等页面的展示；实现了用户的注册、登录、修改密码，用户可以在前台对电影进行评分、点赞、评论，对文章进行评论、评分、点赞，对用户进行主页浏览、主页留言、添加关注、加入黑名单等，浏览站内信、删除站内信、发送站内信、移除黑名单、移除关注列表等；用户也可以在个人主页界面对自己头像、座右铭、简介、标签进行编辑；后台实现了管理员的登录、对用户状态的管理、用户的添加、用户的编辑、用户的删除等功能，实现了对站内通信的一个管理、对站内信的一个删除、对文章评论、电影评论、个人主页评论的审核和删除，实现了对网站首页轮播图、网站首页公告一个删除、编辑、添加，实现了对后台文章的一个删除、添加、编辑，实现了对电影信息的添加、删除、编辑；当然这些编辑的信息并不会修改用户点赞等信息；
            </li>
            <li>   	
                  3.这个网站还有许多的需要改进的地方，如购票方面没有设计，如各种电影，文章类型分的不彻底等，数据库数据为个人添加，所以数据量较少且不全面，还有其他的一些细节，性能的优化，慢慢会完善；
            </li>
            <li>
                  4.如果此开源项目对你有所帮助的话，请到给个star，也算给新人的一个鼓励，未来一起加油吧……  
            </li>
		</ul>
		
	</div>
</div>
</template>
<script>
	export default{
		name:'index',
		data(){
			return{
				user:''
			}
		},
		created(){
			this.getData();	
		},
		methods:{
			getData(){
				this.axios.post('api/users/userDetail',{user_id:localStorage._id}).then(response=>{
					if(response.data.status==0){
						this.user=response.data.data[0];
					}
					else{
						this.mes.errorMessage(response.data.message);

					}
				})
			}
		
		}

	}
</script>
<style scoped lang="scss">
.main{
	display:flex;
	flex-direction:column;
	padding:20px 10px;
	.user{
		height:150px;
		display:flex;
		.userImg{
			width:200px;
			display:flex;
			justify-content:center;
			align-items:center;
			img{
				width:100px;
				border-radius:50%;
			}
		}
		.userInfo{
			flex:1;
			display:flex;
			flex-direction:column;
			justify-content:center;
			p{
				font-size:14px;
				span{
					display:inline-block;
					width:60px;
					text-align:right;
					margin-right:10px;
					line-height:26px;
				}
			}

		}

	}
	.website{
		flex:1;
		background:#eef1f6;
		padding:30px 15px 10px 15px;
		h3{
			line-height:26px;
			height:26px;
		}
		ul{
			margin-left:15px;
			list-style:none;
			li{

				margin-top:8px;
				line-height:24px;
				font-size:16px;

			}
		}
	}
}

</style>