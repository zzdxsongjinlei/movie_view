<template>
	<div>
		<div class="nav-left">
			<i class="el-icon-menu" @click="onDrop"></i>
		</div>
		<div class="nav-bread">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  	<el-breadcrumb-item v-for="item in levelList" :key="item.path" v-if="item.meta.title">
			  		<router-link :to="{path:item.path}">{{item.meta.title}}</router-link>
			  	</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div class="nav-right">
			<el-dropdown @command="handleCommand">
				<span class="el-dropdown-link">
					<i class="el-icon-user-solid"></i>
					个人中心
				</span>
				<el-dropdown-menu slot="dropdown">
			        <el-dropdown-item  command="userInfo">个人主页</el-dropdown-item>
			        <el-dropdown-item  command="userAccount">账号管理</el-dropdown-item>
			        <el-dropdown-item  command="sendEmail">站内信</el-dropdown-item>
			        <el-dropdown-item  command="repassword">修改密码</el-dropdown-item>
	     		</el-dropdown-menu>
			</el-dropdown>
			<span @click="cancelLogin"><i class="el-icon-s-unfold"></i>退出</span>
		</div>
	</div>
</template>
<script>
	export default{
		name:'navbar',
		data(){
			return{
				levelList:null
			}
		},
		created(){
				
		},
		mounted(){
			this.getBread();
		},
		watch:{
			$route(to,from){
				this.getBread();
			}
		},
		methods:{
			//点击切换侧边栏是否关闭
			onDrop(){
				this.$emit('listenOnDrop');
			},
			getBread(){
				let matched=this.$route.matched.filter(item=>item.name);
				const first=matched[0];
				if(first&&first.name!=='adminPage'){
					matched=[{path:'/adminPage' ,mata:{title:'首页'}}].concat(matched);
				}
				this.levelList=matched;

			},
			handleCommand(command){
				if(command=='userInfo'){
					this.$router.push({path:'/userInfo/'+localStorage._id});
				}
				if(command=='userAccount'){
					this.$router.push({path:'/userAccount/'+localStorage._id});
				}
				if(command=='sendEmail'){
					this.$router.push({path:'/sendEmail'});

				}
				if(command=='repassword'){
					this.$router.push({path:'/repassword'});
				}
			},
			cancelLogin(){
				this.$router.push({path:'/'});
			}


		}

	} 
</script>
<style lang="scss" scoped>
	.nav-left{
		float:left;
		i{
			margin-left:10px;
			margin-top:8px;
			font-size:14px;
			padding:10px 12px;
			color:rgb(68,68,68);
			border-radius:4px;
			&:hover{
				background:rgb(230,230,230);
				cursor:pointer;
			}
		}
		
	}
	.nav-bread{
		float:left;
		overflow:hidden;
		margin-left:20px;
		span{
			line-height:50px;
			height:50px;
			font-size:14px;
			color:rgb(68,68,68);
		}
		
	}
	.nav-right{
		float:right;
		font-size:14px;
		span{
			display:inline-block;
			padding:0px 15px;
			line-height:50px;
			height:50px;
			border-radius:4px;
			color:rgb(68,68,68);
			&:hover{
				background:rgb(230,230,230);
				cursor:pointer;
			}

		}
		
	}

</style>