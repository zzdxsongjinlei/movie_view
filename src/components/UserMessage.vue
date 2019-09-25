<template>
<div class="header">
	<div class="main">
		<div class="content">
			<div  v-if="!isLogin">
				<router-link to="/loginPage">
					<div class="header_menu">登陆</div>
				</router-link>
			</div>
			<div v-else>
				<el-dropdown @command="handleCommand">
					<span class="el-dropdown-link">
						{{username}}的个人账号
						<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
				        <el-dropdown-item  command="userInfo">个人主页</el-dropdown-item>
				        <el-dropdown-item  command="userAccount">账号管理</el-dropdown-item>
				        <el-dropdown-item  command="sendEmail">站内信</el-dropdown-item>
				        <el-dropdown-item  command="repassword">修改密码</el-dropdown-item>
				        <el-dropdown-item  command="cancelLogin" >退出</el-dropdown-item>
		     		</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
	</div>
</div>
</template>
<script>
	export default{
		data(){
			return {
				isLogin:false,
				username:'',
				user_id:''
			}
		},
		created(){
			let token=localStorage.getItem('token');
			if(token){
				this.isLogin=true;
				this.username=localStorage.getItem('username');
				this.user_id=localStorage.getItem('_id');
			}
		},
		methods:{
			handleCommand(command){
				if(command=='userInfo'){
					this.$router.push({path:'/userInfo/'+this.user_id});

				}
				if(command=='userAccount'){
					this.$router.push({path:'/userAccount/'+this.user_id});
				}
				if(command=='cancelLogin'){
					localStorage.removeItem('username');
					localStorage.removeItem('token');
					localStorage.removeItem('_id');
					this.isLogin=false;
				}
				if(command=='sendEmail'){
					this.$router.push({path:'/sendEmail'});

				}
				if(command=='repassword'){
					this.$router.push({path:'/repassword'});
				}

			}
		}

	}
</script>
<style lang="scss" scoped>
	.header{
		width:103%;
		height:30px;
		left:0;
		top:0;
		background:#edf4ed;
		.main{
			width:80%;
			margin:0px auto;
			.content{
				float:right;
				padding-top:10px;
				font-size:9px;
				.el-dropdown-link{
					cursor:pointer;
					font-size:9px;
				}

			}
			a{
				text-decoration:none;
				color:rgb(51,119,170);
			}
		}
	}
</style>