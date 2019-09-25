<template>
<div>
	<el-card>
		<h2>找回密码</h2>
		<!-- 找回密码界面 -->
		<el-form v-if="flagshowUserInfo" :model="form1">
			<el-form-item>
				<el-input placeholder="请输入用户名" v-model="form1.username" ref="username" @input="usernameOnInput">
					<i slot="prefix" class="el-input__icon  el-icon-user-solid"></i>
				</el-input>
				<div class="flagError">
					<span v-show="flagUsername" > 未输入用户名</span>
				</div>
			</el-form-item>
			<el-form-item>
				<el-input placeholder="请输入邮箱" v-model="form1.userMail" @focus="userMailOnFocus"  ref="userMail" @input="userMailOnInput">
					<i slot="prefix" class="el-input__icon  el-icon-message"></i>
				</el-input>
				<div class="flagError">
					<span v-show="flagUserMail" > 未输入邮箱</span>
				</div>
			</el-form-item>
			<el-form-item>
				<el-input placeholder="请输入手机" v-model="form1.userPhone" ref="userPhone" @focus="userPhoneOnFocus" @input="userPhoneOnInput">
					<i slot="prefix" class="el-input__icon  el-icon-mobile-phone"></i>
				</el-input>
				<div class="flagError">
					<span v-show="flagUserPhone" > 未输入手机号</span>
				</div>
			</el-form-item>
			<el-form-item>
				<el-button @click="checkUser"  type="primary">找回密码</el-button>
				<el-button @click="onRegister">注册</el-button>
				<el-button @click="onLogin">登陆</el-button>
			</el-form-item>
		</el-form>
		<!-- 修改密码界面 -->
		<el-form v-else :model="form2">
			<el-form-item>
				<el-input placeholder="请输入新密码" v-model="form2.repassword"  ref="repassword" @blur="repasswordOnBlur" @input="repasswordOnInput" ></el-input>
				<div class="flagError">
					<span v-show="flagRepasswrd">{{repasswordMessage}}</span>
				</div>
			</el-form-item>
			<el-form-item>
				<el-button @click="changeUserPassword"  type="primary">修改密码</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</div>
</template>
<script>
	export default{
		data(){
			return{
				form1:{
					userMail:'',
					userPhone:'',
					username:''
				},
				form2:{
					repassword:'',
				    password:''
				},
				repasswordMessage:'',
				flagUsername:false,
				flagUserMail:false,
				flagUserPhone:false,
				flagRepasswrd:false,

				flagshowUserInfo:true		
			}
		},
		methods:{
			//输入用户名，取消错误信息
			usernameOnInput(){
				this.flagUsername=false;
			},
			//焦点进入邮箱，检测用户信息
			userMailOnFocus(){
				if(this.form1.username==''){
					this.flagUsername=true;
					this.$refs.username.focus();
				}
			},
			//输入邮箱，取消错误信息；
			userMailOnInput(){
				this.flagUserMail=false;
			},
			//焦点进入电话，检测邮箱信息
			userPhoneOnFocus(){
				if(this.form1.userMail==''){
					this.flagUserMail=true;
					this.$refs.userMail.focus();
				}
			},
			//输入电话，取消错误信息
			userPhoneOnInput(){
				this.flagUserPhone=false;
			},
			//转去注册界面
			onRegister(){
				this.$router.push({path:'/registerPage'});
			},
			//转去登陆界面
			onLogin(){
				this.$router.push({path:'/loginPage'});
			},
			//找回密码按钮，
			checkUser(){
				//检测电话信息，
				if(this.form1.userPhone==''){
					this.flagUserPhone=true;
					this.$refs.userPhone.focus();
				}
				//存在错误信息，程序结束
				if(this.flagUsername||this.flagUserMail||this.flagUserPhone){
					return false;
				}
				//验证是否存在这个用户
				this.axios.post('api/users/findPassword',this.form1).then(response=>{
					if(response.data.status==1){
						this.mes.errorMessage(response.data.message);
						this.form1.userMail='';
						this.form1.userPhone='';
						this.form1.username='';
					}
					else{
						 this.form2.password=response.data.data[0].password;
						 this.flagshowUserInfo=false;
					}
				});
			},
			//新密码失去焦点时，检测和原来密码是否相同,检测密码是否符合要求；
			repasswordOnBlur(){
				let exp=/^[a-zA-z_]{1}[\w]{5,}$/;
				if(this.form2.repassword==this.form2.password){
					this.$refs.repassword.focus();
					this.repasswordMessage='新密码和原来密码相同';
					this.flagRepasswrd=true;
				}
				if(!exp.test(this.form2.repassword)){
					this.flagRepasswrd=true;
					this.repasswordMessage='书写不符合标准';
					return this.$refs.repassword.focus();
				}

			},
			//输入密码时，错误信息消失
			repasswordOnInput(){
				this.flagRepasswrd=false;
			},
			//修改密码按钮
			changeUserPassword(){
				//检测是否输入密码
				 if(this.form2.repassword==''){
				 	this.repasswordMessage="未输入密码"
				 	this.flagRepasswrd=true;
				 	return this.$refs.repassword.focus();
				 }
				 //存在错误信息时，返回程序 
				 if(this.flagRepasswrd){
				 	return false;
				 }

				let sendDate={...this.form1,repassword:this.form2.repassword};
				//修改密码
				this.axios.post('api/users/findPassword',sendDate).then(response=>{
					if(response.data.status==1){
						 this.mes.errorMessage(response.data.message);
					}
					else{
						this.mes.successMessage('更改成功,一秒后调转主页');
						setTimeout(()=>{this.$router.push({path:'/'})},1000);
					}
					
				});
			}

		}
	}
</script>
<style lang="scss" scoped>
	@import '../style/base/_base.scss';
	.el-card{
		@include base_el_card;
		h2{
			margin-bottom:20px;
		}
		.flagError{
			@include base_error_message;
		}
	}
	
</style>