 <template>
	<div class="container">
		<div>
			<movie-index-header/>
		</div>
		<div class="userMessage">
			<user-message />
		</div>
		<div class="contentMain">
			<el-row :gutter="60">
				<el-col :span="16" class="main">
					<!-- 用户头部信息 -->
					<div class="user">
						<img :src="list.userImg">
						<div>
							<h3>{{list.username}}</h3>
							<div class="userMotto">
								<span ref="userMotto" @blur="blurUserMotto"> {{list.userMotto}}</span> 
								<i  v-if="falg" class="el-icon-edit icon_edit" @click="onUserMotto"></i> 
							</div> 
						</div>	
					</div>
					<!-- 用户nav部分 -->
					<div class="user_nav">
						<router-link :to="{path:'/userInfo/'+user_id}">个人主页</router-link>
						<router-link :to="{path:'/userInfo/'+user_id+'/diary'}">日记</router-link>
						<router-link :to="{path:'/userInfo/'+user_id+'/article'}">文章</router-link>
						<router-link :to="{path:'/userInfo/'+user_id+'/square'}">广场</router-link>
					</div>
					<!-- 用户文章等界面 -->
					<div class="user_content">
						<router-view>
						</router-view>
					</div>
				</el-col>
				<el-col :span="8" class="side">
					<!-- 用户详情界面 -->
					<div class="user_detail">
						<div>
							<div style="overflow:hidden;margin-bottom:10px">
								<!-- 更换头像部分 -->
								<el-form class="user_img">
									<el-form-item  v-if="falg">
									    <el-upload class="avatar-uploader" name="file" action="api/upload/user" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
										    <img v-if="list.userImg" :src="list.userImg" class="avatar">
										    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
										</el-upload>
										<span >点击更换</span>
									</el-form-item>
									<el-form-item v-else>
										<img :src="list.userImg" class="avatar">
									</el-form-item>
								</el-form>
								<!-- 用户详情部分 -->
								<div class="user_des">
									<p>常居:
										<span ref="userCity" @blur="blurUserCity"> {{list.userCity}}</span> 
										<i v-if="falg" class="el-icon-edit icon_edit" @click="onUserCity"></i> 
									</p>
									<p>注册:<span>{{list.userJoinTime|forMatTime}}</span></p>
									<p>标签:
										<span>
											<span v-if="userLabel==undefined || userLabel.length<=0?false:true">
												<el-tag  v-for="(item,key) in userLabel" :key="key" :closable="falg" @close="userLabelClose(item)" size="mini">{{item}}</el-tag>
											</span>
											<div style="display:inline" v-if="falg">
												<el-input size="mini" type="text" v-if="flagUserLabel" v-model="userLabelValue" ref="userLabelInput" @keyup.enter.native="userLabelAdd" @blur="userLabelAdd" style="width:90px;" >
												</el-input>
												<el-tag v-else  size="mini" @click="showUserLabel">+添加标签
												</el-tag>
												
											</div>
										</span>
									</p>
								</div>
							</div>
							<p class="send_email"> 
								<button @click="sendEmail">发送站内信</button>
								<button @click="showeUserPassword" v-show="!showRePassword" v-if="falg"> 修改密码 </button>
								<button @click="addFllow" v-else>添加关注</button>
								<div  v-show="showRePassword"  class="send_password">
									<el-form label-width="120px" size="mini">
										<el-form-item label="输入旧密码">
											<el-input  type="password" v-model="password" ref="password" />
										</el-form-item>
										<el-form-item label="输入新密码">
											<el-input  type="password" v-model="repassword" ref="repassword"/>
										</el-form-item>
										<el-form-item >
											<el-button   type="primary" @click="changeUserPassword">修改密码</el-button>
										</el-form-item>
									</el-form>
								</div>
							</p>
							<div class="user_description">
								<span ref="userDescription" @blur="blurUserDescription"> {{list.userDescription}}</span> 
								<i   v-if="falg" class="el-icon-edit icon_edit" @click="onUserDescription"></i> 
							</div>
						</div>
						
					</div>
					<!-- 用户关注界面 -->
					<div class="user_fllow">
						<h3>我关注的人</h3>
						<div class="fllow"  v-if="userfllow==undefined || userfllow.length<=0?false:true">
							<div v-for="(item,key) in userfllow" :key="key">
								<img :src="item.userImg" >
								<p>
									<router-link :to="{path:'/userInfo/'+item._id}">
										{{item.username}}
									</router-link>
								</p>
							</div>
						</div>
						<div v-else class="unfllow">
							您暂未关注任何人
						</div>
					</div>

				</el-col>
			</el-row>	
		</div>
		<div>
			<common-footer/>
		</div>

	</div>
</template>
<script>
	import MovieIndexHeader from '../components/MovieIndexHeader.vue';
	import CommonFooter from '../components/CommonFooter.vue';
	import UserMessage from '../components/UserMessage.vue';
	export default{
		data(){
			return{
				//用户id
				user_id:'',
				//判断是否进入自己主页，进入自己主页，可以编辑座右铭，简介，常居地址，标签等；
				falg:'',
				//展示修改密码界面，
				showRePassword:false,
				password:'',
				repassword:'',
				//用户的基本信息
				list:'',
				//用户的关注的人列表
				userfllow:[],
				//用户标签列表
				userLabel:[],
				//判断添加标签表格是否显示
				flagUserLabel:false,
				//添加标签时的添加值
				userLabelValue:'',
			}
		},
		created(){
			this.user_id=this.$route.params.id;
			this.getdata();	
		},
		beforeRouteUpdate(to,from,next){
			this.user_id=to.params.id;
			this.getdata();
			next();
		},
		methods:{
			//获得用户基本信息，渲染页面
			getdata(){
				this.userfllow=[];
				if(this.user_id==localStorage._id){
					this.falg=true;
				}
				if(this.user_id!==localStorage._id){
					this.falg=false;
				}
				if(this.user_id){
					// 获取用户信息
					this.axios.post('api/showUser',{user_id:this.user_id}).then(response=>{
	                   if(response.data.status==1){
	                   	this.mes.errorMessage(response.data.message);
	                   }
	                   else{
	                   	//获取用户标签
	                   	this.userLabel=response.data.data[0].userLabel.split('/');
	                   	// 获取用户基本信息
	                   	this.list=response.data.data[0];

	                   	let lists=response.data.data[0].userFllow.split(',');
	                   	//获取关注人的基本信息
	                   	lists.map(o=>{
	                   		this.axios.post('api/users/userDetail',{user_id:o}).then(res=>{
	                   			let abc=res.data.data[0];
	                   			this.userfllow.push(abc);
	                   		});
	                   		
	                   	});
	                   }                  
					});
				}
			},

			//点击编辑座右铭按钮
			onUserMotto(){
				this.$refs.userMotto.contentEditable=true;
				this.$refs.userMotto.focus();
			},
			//编辑座右铭失去焦点
			blurUserMotto(){
				this.$refs.userMotto.contentEditable=false;
				let userMotto=this.$refs.userMotto.innerText;
				//更新用户座右铭
				this.axios.post('api/users/updateUser',{user_id:localStorage._id,userMotto:userMotto,flay:5}).then(response=>{
					if(response.data.status==1){
						this.mes.errorMessage(response.data.message);
					}
					else{
						this.mes.successMessage('已经更新座右铭');
					}
				});
			},
			//图片上传成功之后
			handleAvatarSuccess(response,file,fileList){
				//更换新照片
				let userImg=response.data;
				this.axios.post('api/users/updateUser',{user_id:localStorage._id,flay:6,userImg:userImg}).then(response=>{
					if(response.data.status==0){
						this.getdata();
					}
				});
			},
			//成功上传成功之前
			beforeAvatarUpload(file){
				if(!(file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
		    		 this.mes.errorMessage('请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片!');
		             return false;
			    }
		        if (!(file.size / 1024 / 1024 < 2)) {
		            this.mes.errorMessage('上传头像图片大小不能超过 2MB!');
		            return false;
		        }
		        if(!(file.name.indexOf('user')!=-1)){
		        	this.mes.errorMessage('上传的头像图片命名必须包含user');
		        	return false;
		        }
				if(this.list.userImg==''){
					this.mes.errorMessage('图片为空');
					return false;
				}
				if(this.list.userImg.indexOf('default')==-1){
					this.axios.post('api/upload/userDel',{username:this.list.userImg}).then(response=>{
			    		if(response.data.status==0){
			    		}
			    		else{
			    			this.mes.errorMessage(response.data.message);
			    		}
			    	});
				}
		    		
			},
			//点击城市编辑按钮
			onUserCity(){
				this.$refs.userCity.contentEditable=true;
				this.$refs.userCity.focus();
			},
			//城市编写完成
			blurUserCity(){
				let userCity=this.$refs.userCity.innerText;
				//更新用户信息
				this.axios.post('api/users/updateUser',{user_id:localStorage._id,userCity:userCity,flay:2}).then(response=>{
					if(response.data.status==1){
						this.mes.errorMessage(response.data.message);
					}
					else{
						this.mes.successMessage('已经更新城市');
					}
				});
				this.$refs.userCity.contentEditable=false;
			},
			//关闭标签
			userLabelClose(item){
				 this.userLabel.splice(this.userLabel.indexOf(item), 1);
				 if(this.userLabel==false){
				 	var userLabel='';
				 }
				 else{
				 	var userLabel=this.userLabel.join('/')
				 }
				 //更新数据库
				 this.axios.post('api/users/updateUser',{user_id:localStorage._id,flay:3,userLabel:userLabel}).then(response=>{
				 });
			},
			//显示增加标签按钮
			showUserLabel(){
				this.flagUserLabel=true;
				this.$nextTick(_=>{
					this.$refs.userLabelInput.$refs.input.focus();
				})
			},
			//增加标签
			userLabelAdd(){
				if(this.userLabelValue){
					this.userLabel.push(this.userLabelValue);
				}
				this.flagUserLabel=false;
				this.userLabelValue='';
				var userLabel=this.userLabel.join('/');
				//更新数据库
				this.axios.post('api/users/updateUser',{user_id:localStorage._id,flay:3,userLabel:userLabel}).then(response=>{
					if(response.data.status==0){
						this.mes.successMessage('已添加标签');
					}
				 });

			},
			//发送站内信
			sendEmail(){
				if(localStorage._id){
					this.$router.push({path:'/sendEmail'});
				}
				else{
					this.mes.errorMessage('未登陆，两秒后调转登陆界面');
					this.$router.push({path:'/loginPage'});
				}
			},
			//添加关注，如果别人主页显示，如果自己主页显示更改密码
			addFllow(){
				if(localStorage._id)
					//取到登陆用户而不是看的用户详情
					this.axios.post('api/users/userDetail',{user_id:localStorage._id}).then(response=>{
						if(response.data.status==1){
							this.mes.errorMessage(response.data.message);
						}
						else{
							//已经关注过 
							if(response.data.data[0].userFllow.indexOf(this.user_id)>=0){
								this.mes.promptMessage('已经关注过，请不要重复操作');
							}
							else{
								let userFllow=response.data.data[0].userFllow+','+this.user_id;
								//数据更新
								this.axios.post('api/users/updateUser',{user_id:localStorage._id,userFllow:userFllow,flay:0}).then(response=>{
									if(response.data.status==1){
										this.mes.errorMessage(response.data.message);
									}
									else{
										this.mes.successMessage('已经关注');
									}
								});

							}
						}
					});
				else{
					this.mes.promptMessage('未登陆，两秒后调转登陆界面');
					setTimeout(()=>this.$router.push({path:'/loginPage'}),2000);
				}
			},
			//点击修改密码，密码界面出现
			showeUserPassword(){
				this.showRePassword=true;
			},
			//进行密码修改
			changeUserPassword(){
				if(this.password==''){
					this.$refs.password.focus();
					return this.mes.errorMessage('请输入密码');	
				}
				if(this.repassword==''){
					this.$refs.repassword.focus();
					return this.mes.errorMessage('请输入新设密码');
				}
				let token=localStorage.token;
				let sendDate={
					token:token,
					repassword:this.repassword,
					user_id:this.user_id,
					password:this.password
				};
				// 找回密码阶段
				this.axios.post('api/users/findPassword',sendDate).then(response=>{
					if(response.data.status==1){
						this.mes.errorMessage(response.data.message);
					}
					else{
						this.mes.successMessage(response.data.message);
						this.showRePassword=!this.showRePassword;
						this.password='';
						this.repassword='';
					}	
				});
			},
			//编辑个人描述
			onUserDescription(){
				this.$refs.userDescription.contentEditable=true;
				this.$refs.userDescription.focus();
			},
			//编辑完个人描述
			blurUserDescription(){
				this.$refs.userDescription.contentEditable=false;
				let userDescription=this.$refs.userDescription.innerText;
				this.axios.post('api/users/updateUser',{user_id:localStorage._id,flay:4,userDescription:userDescription}).then(response=>{
					if(response.data.status==1){
						this.mes.errorMessage(response.data.message);
					}
					else{
						this.mes.successMessage('已经更改描述');
					}
				})
				
			},
			
			
		},
		components:{
			MovieIndexHeader,
			CommonFooter,
			UserMessage
		}
		
	}
</script>
<style lang="scss">
.user_img{
	width:60px;
	float:left;
	.el-form-item{
		margin-bottom:0px;
	}
	.avatar-uploader {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	    width: 60px;
	    height: 60px;
	    &:hover{
	    	border-color: #409EFF;
	    }
	}
	.avatar{
		width:60px;
		height:60px;
	}
	.avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 60px;
	    height: 60px;
	    line-height: 60px;
	    text-align: center;
	}
}
</style>
<style lang="scss" scoped>
@import '../style/base/_base.scss';
@mixin edit{
	span{
		border:none;
		outline:none;
		padding:2px;
	}
	i{
		margin-left:10px;
	}
}
.container{
	.userMessage{
		@include userMessage;
		}
	.contentMain{
		@include contentMain;
		.icon_edit{
			cursor:pointer;
			&:hover{
				color:$base_color;
			}
		}
		.main{
			.user{
				img{
					width:48px;
					float:left;
				}
				>div{
					margin-left:60px;
					h3{
						font-size:26px;
						color:rgb(73,73,73);
					}
					.userMotto{
						font-size:12px;
						color:rgb(112,112,112);
						line-height:18px;
						@include edit;
						
					}
				}
			}
			.user_nav{
				margin-left:60px;
				margin-top:10px;
				a{
					@include base_link;
					margin-right:20px;
					font-size:15px;
				}
			}
			.user_content{
				margin-top:20px;
				margin-bottom:50px;	
			}
		}
		.side{
			.user_detail{
				overflow:hidden;
				background:rgb(255,246,237);
				padding:18px 20px 40px 20px;
				.user_des{
					margin-left:80px;
					p{
						font-size:13px;
						span{
							margin-left:10px;
						}
						&:first-child{
							@include edit;
						}
						&:last-child{
							span{
								margin-left:5px;
								margin-bottom:5px;
							}
						}
					}
				}
				.send_email{
					font-size:12px;
					margin-top:-10px;
					button{
						@include base_button;
					}

				}
				.send_password{
					font-size:11px;
				}
				.user_description{
					margin-top:10px;
					font-size:13px;
					line-height:20px;
					color:rgb(102,102,102);
					@include edit;
				}
			}
			.user_fllow{
				padding:18px 20px 40px 20px;
				margin-top:50px;
				background:#ddd;
				h3{
					@include base_h3;
				}
				.fllow{
					display:flex;
					flex-wrap:row wrap;
					align-contet:space-around;
					>div{
						margin-right:20px;
						flex:0,1,60px;
						img{
							width:60px;
						}
						p{
							font-size:11px;
							text-align:center;
						}
					}
				}
				.unfllow{
					font-size:11px;
				}

			}
		}

	}
}
</style>









