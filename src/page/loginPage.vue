<template>
	<div>
		<el-card>
			<h2>请登录</h2>
			<el-form :model="form" ref="form" >
				<el-form-item >
					<el-input placeholder="请输入用户名" v-model="form.username"   ref="username" @input="usernameOninput">
						<i slot="prefix" class="el-input__icon  el-icon-user-solid"></i>
					</el-input>
					<div class="flagError">
						<span v-show="flagUsername" > 未输入用户名</span>
					</div>
				</el-form-item>
				<el-form-item >
					<el-input placeholder="请输入密码" v-model="form.password" show-password ref="password"  @focus="passwordOnfocus"  @input="passwordOninput">
						<i slot="prefix" class="el-input__icon el-icon-s-opportunity"></i>
					</el-input>
					<div class="flagError">
						<span v-show="flagPassword" > 未输入密码</span>
					</div>
					<router-link to="/repassword">忘记密码</router-link>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="userLogin(form)" >登陆</el-button>
					<el-button @click="userRegister">注册</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				form:{
					username:'',
					password:''
				},
				flagPassword:false,
				flagUsername:false
			}
		},
		methods:{
			//输入用户名，报错信息隐藏
			usernameOninput(){
				this.flagUsername=false;
			},
			//密码获得焦点，检测名字是否填写，否则焦点转移用户名，并且提醒信息
			passwordOnfocus(){
				if(this.form.username==''){
					this.flagUsername=true;
					this.$refs.username.focus();
				}

			},
			//输入密码，密码提醒信息消失
			passwordOninput(){
				this.flagPassword=false;
			},
			//用户登陆
			userLogin:function(form){
				//检测密码是否填写，否则，出现相关提醒信息，密码获得焦点
				if(this.form.password==''){
					this.flagPassword=true;
					this.$refs.password.focus();
				}
				//存在错误信息，程序不再继续执行
				if(this.flagUsername||this.flagPassword){
					return false;
				}
				this.axios.post('api/users/login',{username:this.form.username,password:this.form.password}).then(response=>{
					if(response.data.status==1){
						this.mes.errorMessage(response.data.message);
						this.form.username='';
						this.form.password='';
					}
					else{
						localStorage.setItem('token',response.data.data.token);
						localStorage.setItem('username',response.data.data.user[0].username);
						localStorage.setItem('_id',response.data.data.user[0]._id);
						this.mes.successMessage('成功注册,两秒后跳转到主页');
						setTimeout(()=>{
							this.$router.push({path:'/'});
						},2000);
					}
				});
				
			},
			//用户注册按钮，转回注册界面
			userRegister(){
				this.$router.push({path:'/registerPage'});
			}
		}


	}
</script>
<style lang="scss" scoped>
	@import'../style/base/_base.scss';
	.el-card{
		@include base_el_card;
		h2{
			margin-bottom:20px;
		}
		.flagError{
			@include base_error_message;
		}
		a{
			float:right;
			font-size:10px;
			color:black;
			text-decoration:none;
			&:hover{
				color:red;
			}
		}
	}
	
</style>