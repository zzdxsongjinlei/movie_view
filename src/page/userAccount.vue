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
					<div class="form" v-if="flag">
						<h2>账号管理</h2>
						<el-form ref="form" :model="form" label-width="85px" size="mini">

							<el-form-item label="头像">
							    <el-upload class="avatar-uploader" action="api/upload/user" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" >
								    <img v-if="form.userImg" :src="form.userImg" class="avatar">
								    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<span>点击更换头像</span>
							</el-form-item>
							<el-form-item label="邮箱" >
							    <el-input v-model="form.userMail" disabled></el-input>
							    <span>登陆邮箱不能进行更改</span>
							</el-form-item>
							<el-form-item label="用户名">
							    <el-input v-model="form.username"></el-input>
							    <span>限制在6个字符以上</span>
							</el-form-item>
							<el-form-item label="手机">
							    <el-input v-model="form.userPhone"></el-input>
							</el-form-item>
							<el-form-item label="城市">
							    <el-input v-model="form.userCity"></el-input>
							</el-form-item>
							<el-form-item label="铭言">
							    <el-input v-model="form.userMotto"></el-input>
							</el-form-item>
							<el-form-item label="注册时间" >
							    <el-input v-model="form.userJoinTime" disabled></el-input>
							    <span>注册时间不能进行更改</span>
							</el-form-item>
							<el-form-item label="用户状态" >
								<el-row type="flex" justify="start" :gutter="50">
									<el-col :span="10">
										<el-form-item label="是否管理员" >
											<template>
												<el-radio-group v-model="form.userAdmin" disabled>
													<el-radio  label="true">是</el-radio>
	 												<el-radio  label="false">否</el-radio>
	 											</el-radio-group>
											</template>
									    </el-form-item>

									</el-col>
									<el-col :span="10">
										<el-form-item label="账户状态" >
									     	<template>
									     		<el-radio-group v-model="form.userStop" disabled>
													<el-radio label="true" >封停</el-radio>
	 												<el-radio label="false">正常</el-radio>
	 											</el-radio-group>
											</template>
									     	
									    </el-form-item>
									</el-col>
									
								</el-row> 
								<el-row>
									<span>不能进行更改，如需帮助，请联系管理员</span>
								</el-row>   
							</el-form-item>
							<el-form-item label="简介">
							    <el-input type="textarea" v-model="form.userDescription"></el-input>
							</el-form-item>
							<el-form-item label="标签">
							    <el-input v-model="form.userLabel"></el-input>
							    <span>标签请以“/”隔开</span>
							</el-form-item>
							<el-form-item>
							    <el-button type="primary" @click="onSubmit">更新</el-button>
							    <el-button @click="rePassword">修改密码</el-button>
							 </el-form-item>
						</el-form>
					</div>

					<div v-else class="repassword">
						<h2>重置密码</h2>
						<el-form label-width="120px">
							<el-form-item label="输入旧密码">
								<el-input  type="password" v-model="password" />
							</el-form-item>
							<el-form-item label="输入新密码">
								<el-input  type="password" v-model="repassword"/>
							</el-form-item>
							<el-form-item >
								<el-button   type="primary" @click="changeUserPassword">修改密码</el-button>
							</el-form-item>
						</el-form>
					</div>
					
				</el-col>

				<el-col :span="8" class="side">
					<h2>其他链接</h2>
					<div>
						<span>><router-link to="/">主页</router-link></span>
						<span>><router-link to="/movieList">电影</router-link></span>
						<span>><router-link :to="{path:'/userInfo/'+user_id}">个人主页</router-link></span>
						<span>><router-link :to="{path:'/sendEmail'}">发送站内信</router-link></span>
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
				user_id:'',
				flag:true,
				form: {
				 	userImg:'',
				 	userMail:'',
				 	username:'',
				 	userPhone:'',
				 	userCity:'',
				 	userMotto:'',
				 	userJoinTime:'',
				 	userAdmin:'',
				 	userStop:'',
				 	userDescription:'',
				 	userLabel:''
			        },
			    password:'',
			    repassword:'' 
			}
		},
		created(){
			this.user_id=this.$route.params.id;	
			this.getData();	
		},
		methods:{
			getData(){
				this.axios.post('api/users/userDetail',{user_id:this.user_id}).then(response=>{
					this.form=response.data.data[0];
					if(this.form.userAdmin==true){
						this.form.userAdmin='true'
					}else{
						this.form.userAdmin='false'}
					if(this.form.userStop==true){
						this.form.userStop='true'
					}else{
						this.form.userStop='false'}
				});
			},
			//头像更换
			handleAvatarSuccess(response,file,fileLIst){
				//更换新照片
				let userImg=response.data;
				this.axios.post('api/users/updateUser',{user_id:localStorage._id,flay:6,userImg:userImg}).then(response=>{
					if(response.data.status==0){
						this.getData();
					}
				});
			},
			//照片上传之前
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
				if(this.form.userImg==''){
					this.mes.errorMessage('图片为空');
					return false;
				}
				if(this.form.userImg.indexOf('default')==-1){
					this.axios.post('/api/upload/userDel',{username:this.form.userImg}).then(response=>{
			    		if(response.data.status==0){
			    		}
			    		else{
			    			this.mes.errorMessage(response.data.message);
			    		}
			    	});
				}

			},
			//更新提交
			onSubmit(){
				if(this.form.username==''||this.form.userPhone==''){
					return this.mes.promptMessage('用户名和邮箱不能为空');
				}
				let sendData=this.form;
				//更新数据
				this.axios.post('api/users/updateUser',sendData).then(response=>{
					if(response.data.status==0){
						this.mes.successMessage('更新成功');
						this.getData();
					}
					else{
						this.mes.errorMessage(response.data.message);
					}
				});
			},
			//更改密码
			rePassword(){
				this.flag=false;
			},
			//更改密码
			changeUserPassword(){
				if(this.password==''){
					return this.errorMessage('新密码不能为空');
				}
				if(this.repassword==''){
					return this.errorMessage('原密码不能为空');
				}
				let token=localStorage.token;
				let sendDate={
					token:token,
					repassword:this.repassword,
					user_id:this.user_id,
					password:this.password
				};
				this.axios.post('/api/users/findPassword',sendDate).then(response=>{
					if(response.data.status==1){
						this.mes.errorMessage(response.data.message);
					}
					else{
						this.mes.successMessage(response.data.message);
						this.flag=true;
					}	
				});

			}

			
		},
		components:{
			MovieIndexHeader,
			CommonFooter,
			UserMessage
		}
		
	}
</script>
<style lang="scss" scoped>
@import '../style/base/_base.scss';
.container{
	width:100%;
	margin:0 auto;
	.userMessage{
		@include userMessage;
	}
	.contentMain{
		@include contentMain;
		.main{
			.form{
				width:80%;
				margin:0px auto 100px auto;
				h2{
					margin-bottom:20px;
				}
				.avatar-uploader {
				    border: 1px dashed #d9d9d9;
				    border-radius: 6px;
				    cursor: pointer;
				    position: relative;
				    overflow: hidden;
				    width: 178px;
				    height: 178px;
				    &:hover{
				    	border-color: #409EFF;
				    }
				}
				.avatar{
					width:178px;
					height:178px;
				}
				.avatar-uploader-icon {
				    font-size: 28px;
				    color: #8c939d;
				    width: 178px;
				    height: 178px;
				    line-height: 178px;
				    text-align: center;
				}
				.el-form-item span{
					color:rgb(71,172,152);
					margin-left:20px;
				}
			}
			.repassword{
				width:60%;
				h2{
					margin-bottom:30px;
				}
			}
		}	
		.side{
			h2{
				margin-bottom:20px;
			}
			span{
				display:block;
				height:30px;
				line-height:30px;
				a{
					margin-left:5px;
					@include base_link;
					font-size:15px;
				}
			}

			
		}

	}
}
</style>