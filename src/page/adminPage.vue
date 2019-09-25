<template>
	<div class="admin" >
		<sider-wrapper  :isCollapse="isCollapse"/>
		<div class="main-wrapper">
			<div class="navbar">
				<nav-bar @listenOnDrop="onDrop" />
			</div>
			<router-view class="main"> </router-view>
		</div>
	</div>
</template>
<script >
	import SiderWrapper from '../components/admin/SiderWrapper.vue'; 
	import NavBar from '../components/admin/NavBar.vue';
	export default{
		name:'admin',
		data(){
			return{
				//控制侧边栏是否隐藏
				isCollapse:false
			}
		},
		created(){
			if(!localStorage.token){
				this.mes.promptMessage('请先登录才能进入后台');
				this.$router.push({path:'/loginPage'});
			}
		},
		methods:{
			//顶部导航栏，被点击时，控制侧边栏隐藏
			onDrop(){
				if(this.isCollapse){
					this.isCollapse=false;
				}
				else{
					this.isCollapse=true;
				}
			}
			
		},
		components:{
			SiderWrapper,
			NavBar
		}

	}
</script>
<style lang="scss" scoped>
.admin{
	width:100%;
	height:100%;
	color:#333;
	display:flex;
	flex-flow:row nowrap;
	.sider-wrapper{
		flex: 0 0 auto;
		height:100%;
	}
	.main-wrapper{
		flex:1 1 auto;
		background:rgb(248,249,251);
		display:flex;
		flex-flow:column wrap;
		.navbar{
			flex:0 0 auto;
			height:50px;
			background:#fff;
			border-bottom:1px solid #eee;
			overflow:hidden;	
		}
		.main{
			flex:1 1 auto;
			margin:20px 10px 0px 10px;
			border:1px solid #ccc;
			background:#fff;
			border-radius:10px;
		}

	}
}
</style>