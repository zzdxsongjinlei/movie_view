<template>
	<div>
		<el-card>
			<h2>请注册</h2>
			<el-form :model="form">
				<el-form-item>
					<el-input placeholder="请输入用户名" v-model="form.username" ref="username" @input="usernameOnInput" @blur="usernameOnBlur">
						<i slot="prefix" class="el-input__icon  el-icon-user-solid"></i>
					</el-input>
					<div class="flagError">
						<span v-if="!flagUsername" class="flag_black">{{usernameMessage}}</span>
						<span v-else>{{usernameMessage}}</span>
					</div>
				</el-form-item>
				<el-form-item>
					<el-input placeholder="请输入密码" v-model="form.password" show-password ref="password" @focus="passwordOnFocus"  @input="passwordOnInput">
						<i slot="prefix" class="el-input__icon  el-icon-more"></i>
					</el-input>
					<div class="flagError">
						<span v-if="!flagPassword" class="flag_black">{{passwordMessage}}</span>
						<span v-else>{{passwordMessage}}</span>
					</div>
				</el-form-item>
				<el-form-item>
					<el-input placeholder="请再次输入密码" v-model="form.repassword" show-password  ref="repassword" @focus="repasswordOnFocus" @input="repasswordOnInput">
						<i slot="prefix" class="el-input__icon  el-icon-more"></i>
					</el-input>
					<div class="flagError">
						<span v-if="!flagRepassword" class="flag_black">{{repasswordMessage}}</span>
						<span  v-else>{{repasswordMessage}}</span>

					</div>
				</el-form-item>
				<el-form-item>
					<el-input placeholder="请输入邮箱" v-model="form.userMail" ref="userMail" @focus="userMailOnFocus" @input="userMailOnInput" >
						<i slot="prefix" class="el-input__icon  el-icon-message"></i>
					</el-input>
					<div class="flagError">
						<span v-if="flagUserMail" > {{userMailMessage}}</span>
					</div>
				</el-form-item>
				<el-form-item>
					<el-input placeholder="请输入手机" v-model="form.userPhone" @focus="userPhoneOnFocus" @input="userPhoneOnInput" ref="userPhone">
						<i slot="prefix" class="el-input__icon  el-icon-mobile-phone"></i>
					</el-input>
					<div class="flagError">
						<span v-if="flagUserPhone" > {{userPhoneMessage}}</span>
					</div>
				</el-form-item>				
				<el-form-item>
					<el-button @click="userRegister" type="primary">注册</el-button>
				
					<el-button @click="userLogin">登陆</el-button>
			
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
					password:'',
					repassword:'',
					userMail:'',
					userPhone:''
				},
				flagUsername:false,
				usernameMessage:' 至少使用六个字母、数字、下划线，且第一位是字母 ',
				flagPassword:false,
				passwordMessage:' 至少使用六个字母、数字、下划线，且第一位是字母 ',
				flagRepassword:false,
				repasswordMessage:' 请确认两次密码相同 ',
				flagUserPhone:false,
				userPhoneMessage:'',
				flagUserMail:false,
				userMailMessage:'',	
			}
		},
		methods:{
			//输入用户名，错误信息消失
			usernameOnInput(){
				this.flagUsername=false;
				this.usernameMessage='至少使用六个字母、数字、下划线，且第一位是字母 ';
			},
			//用户名离开时，判断系统是否已经存在用户名
			usernameOnBlur(){
				this.axios.post('api/users/userDetail',{username:this.form.username}).then(response=>{
					if(response.data.status==0){
						this.form.username='';
						this.usernameMessage="用户名已经存在";
						this.flagUsername=true;
						return this.$refs.username.focus();
					}
				});
			},
			//密码获得焦点，检测用户名是否符合要求
			passwordOnFocus(){
				let exp=/^[a-zA-z_]{1}[\w]{5,}$/;
				if(this.form.username==''){
					this.flagUsername=true;
					this.usernameMessage='用户名不能为空';
					return this.$refs.username.focus();
				}
				if(!exp.test(this.form.username)){
					this.flagUsername=true;
					this.usernameMessage='书写不符合标准';
					return this.$refs.username.focus();
				}
			},
			//输入密码，错误信息消失;
			passwordOnInput(){
				this.flagPassword=false;
				this.passwordMessage='至少使用六个字母、数字、下划线，且第一位是字母';
			},
			//再次输入密码获得焦点，检测密码是否符合要求
			repasswordOnFocus(){
				let exp=/^[a-zA-z_]{1}[\w]{5,}$/;
				if(this.form.password==''){
					this.flagPassword=true;
					this.passwordMessage='密码不能为空';
					return this.$refs.password.focus();
				}
				if(!exp.test(this.form.password)){
					this.flagPassword=true;
					this.passwordMessage='书写不符合标准';
					return this.$refs.password.focus();
				}
			},
			//再次输入密码，密码消失;
			repasswordOnInput(){
				this.flagRepassword=false;
				this.repasswordMessage='请确认两次密码相同'
			},
			//焦点进入邮箱，检测再次输入密码界面
			userMailOnFocus(){
				if(this.form.repassword==''){
					this.flagRepassword=true;
					this.repasswordMessage='密码不能为空';
					return this.$refs.repassword.focus();
				}
				if(this.form.password!==this.form.repassword){
					this.flagRepassword=true;
					this.repasswordMessage='两次密码必须一样';
					return this.$refs.password.focus();
				}
			},
			//邮箱输入，此时邮箱错误信息消失
			userMailOnInput(){
				this.flagUserMail=false;
			},
			//焦点进入手机，检测邮箱是否符合标准
			userPhoneOnFocus(){
				let exp=/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
				if(this.form.userMail==''){
					this.flagUserMail=true;
					this.userMailMessage='邮箱不能为空';
					return this.$refs.userMail.focus();
				}
				if(!exp.test(this.form.userMail)){
					this.flagUserMail=true;
					this.userMailMessage='邮箱格式不正确';
					return this.$refs.userMail.focus();
				}
			},
			//手机输入，此时手机错误提示信息消失；
			userPhoneOnInput(){
				this.flagUserPhone=false;
			},
			//跳转到登陆界面
			userLogin(){
				this.$router.push({path:'/loginPage'})
			},

			//点击注册事件
			userRegister(){
				//检测手机是否填写
				let exp=/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
				if(this.form.userPhone==''){
					this.flagUserPhone=true;
					this.userPhoneMessage='手机号不能为空';
					return this.$refs.userPhone.focus();
				}
				//检测手机格式是否正确
				if(!exp.test(this.form.userPhone)){
					this.flagUserPhone=true;
					this.userPhoneMessage='手机号格式不正确';
					return this.$refs.userPhone.focus();
				}
				//存在错误信息，不再继续执行程序
				if(this.flagUsername||this.flagPassword||this.flagRepassword||this.flagUserMail||this.flagUserPhone){
					return false;
				}
				//调用注册api进行注册
				this.axios.post('api/users/register',this.form).then(response=>{
					if(response.data.status==1){
						this.errorMessage(response.data.message);
					}
					else{
						//注册成功后进行登陆
						this.login();
					}
				});
			},
			//登陆程序
			login(){
				this.axios.post('api/users/login',{username:this.form.username,password:this.form.password}).then(response=>{
					if(response.data.status==1){
						this.mes.errorMessage(response.data.message);
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
			.flag_black {
				color:#333;
			}
		}

		
	}
	
</style>