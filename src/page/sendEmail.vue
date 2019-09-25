<template>
	<div class="container">
		<div>
			<movie-index-header/>
		</div>

		<div class="userMessage">
			<user-message/>
		</div>
		<div class="contentMain">
			<el-row :gutter="60">
				<el-col :span="16" class="main"> 
					<router-view></router-view>
				</el-col>
				<el-col :span="8" class="sider">
					<div class="nav">
						<span>><router-link to="/sendEmail">收件箱</router-link></span>
						<span>><router-link to="/sendEmail/sendtalkbox">发邮件</router-link></span>
						<span>><router-link to="/sendEmail/followlist">关注人列表</router-link></span>
						<span>><router-link to="/sendEmail/blacklist">管理黑名单</router-link></span>
						<span>><router-link to="/sendEmail/junkemail">垃圾邮件</router-link></span>
					</div>
				</el-col>
			</el-row>
		</div>
		<div><common-footer/></div>
	</div>	
</template>
<script>
	import MovieIndexHeader from '../components/MovieIndexHeader.vue';
	import CommonFooter from '../components/CommonFooter.vue';
	import UserMessage from '../components/UserMessage.vue';
	export default{
		name:'sendEmail',
		data(){
			return{
				detail:'',
			}
		},
		created(){
		},
		components:{
			MovieIndexHeader,
			CommonFooter,
			UserMessage,
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
		.sider{
			.nav{
				span{
					display:block;
					height:30px;
					line-height:30px;
					a{
						@include base_link;
						margin-left:5px;
						font-size:15px;
					}
				}
				span{
					&:last-child{
						a{
							color:#ddd;
							&:hover{
								background:#fff;
								color:#ddd;
							}
						}
					}
				}
			}

		}

	}
}


</style>