<template>
	<el-menu class="sider-wrapper" :unique-opened="true" @select="handleSelect" background-color="#2f4050" text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse" :default-active="$route.path">

		<div class="profile" >
			<img :src="user.userImg" v-if="!isCollapse">
			<h3 v-if="!isCollapse">{{user.username}}</h3>
		</div>
		<template v-for= "menuItem in leftMenus" >
			<el-menu-item-group-ex :menu="menuItem" />
			<el-menu-item-ex :menu="menuItem" />
			<el-submenu-ex :menu="menuItem" />
		</template>     	
	</el-menu>
</template>
<script>
	import ElMenuItemGroupEx from './ElMenuItemGroupEx.vue';
	import ElSubmenuEx from './ElSubmenuEx.vue';
	import ElMenuItemEx from './ElMenuItemEx.vue';
	export default{
		name:'siderwrapper',
		data(){
			return{
				user:'',
				leftMenus:[]

			}
		},
		props:['isCollapse'],
		created(){
			this.getData();
			this.mockData();
		},
		methods:{
			getData(){
				this.axios.post('api/users/userDetail',{user_id:localStorage._id}).then(response=>{
					this.user=response.data.data[0];
					if(!this.user.userAdmin){
						this.mes.promptMessage('您不是管理员，不能登录后台');
						this.$router.go(-1);
					}
					if(this.user.userStop){
						this.mes.promptMessage('您的账号被禁停，请联系管理员');
						this.$router.go(-1);
					}
				})
			},
			handleSelect (key, keyPath, item) {
		        if (item.route) {
		          if (item.route.type === 'inner') {
		            this.$router.push(item.route.path)
		          }
		        }
		    },
		    mockData(){
		        this.leftMenus.push({
		          	type: 'submenu',
		          	index: '/adminPage/user',
		          	lable: '用户',
		          	icon: 'el-icon-user',
		          	route: {
	                        type: 'inner',
	                        path: '/adminPage/user'
	                    },
		          	childs: [{
	                    type: 'item',
	                    index: '/adminPage/user/userAll',
	                    lable: '所有用户',
	                    icon: 'el-icon-s-check',
	                    route: {
	                        type: 'inner',
	                        path: '/adminPage/user/userAll'
	                    }
	                },
	                {
			          	type: 'submenu',
			          	index: '/adminPage/user/userManage',
			          	lable: '用户管理',
			          	icon: 'el-icon-edit',
			          	route: {
		                        type: 'inner',
		                        path: '/adminPage/user/userManage'
		                    },
			          	childs:[{
		                    type: 'item',
		                    index: '/adminPage/user/userManage/userAdd',
		                    lable: '添加用户',
		                    icon: 'el-icon-circle-plus',
		                    route: {
		                        type: 'inner',
		                        path: '/adminPage/user/userManage/userAdd'
		                    }
			          	},
			          	{
			          		type: 'item',
		                    index: '/adminPage/user/userManage/userRev',
		                    lable: '编辑用户',
		                    icon: 'el-icon-remove',
		                    route: {
		                        type: 'inner',
		                        path: '/adminPage/user/userManage/userRev'
		                    }
			          	}
			          	]
		            }]
		        });

		        this.leftMenus.push({
		          	type: 'submenu',
		          	index: '3',
		          	lable: '网站建设',
		          	icon: 'el-icon-setting',
		          	childs: [{
	                    type: 'submenu',
	                    index: '3-1',
	                    lable: '网站首页',
	                    icon: 'el-icon-s-data',
	                    childs:[{
		                    type: 'item',
		                    index: '/adminPage/websiteBuilt/websiteIndex/planting',
		                    lable: '轮播图',
		                    icon: 'el-icon-loading',
		                    route: {
		                        type: 'inner',
		                        path: '/adminPage/websiteBuilt/websiteIndex/planting'
		                    }
	                	},
	                	{
		                    type: 'item',
		                    index: '/adminPage/websiteBuilt/websiteIndex/websiteNotice',
		                    lable: '网站公告',
		                    icon: 'el-icon-tickets',
		                    route: {
		                        type: 'inner',
		                        path: '/adminPage/websiteBuilt/websiteIndex/websiteNotice'
		                    }
	                	}]
	                },
	                {
	                    type: 'submenu',
	                    index: '3-2',
	                    lable: '电影',
	                    icon: 'el-icon-monitor',
	                  	childs:[
	                  	{
		                    type: 'item',
		                    index: '/adminPage/websiteBuilt/movie/movieDetail',
		                    lable: '电影详情',
		                    icon: 'el-icon-more-outline',
		                    route: {
		                        type: 'inner',
		                        path: '/adminPage/websiteBuilt/movie/movieDetail'
		                    }
			            },
			            {
		                    type: 'item',
		                    index: '/adminPage/websiteBuilt/movie/movieAdd',
		                    lable: '添加电影',
		                    icon: 'el-icon-circle-plus',
		                    route: {
		                        type: 'inner',
		                        path: '/adminPage/websiteBuilt/movie/movieAdd'
		                    }
			            },
			            {
		                    type: 'item',
		                    index: '/adminPage/websiteBuilt/movie/movieActivity',
		                    lable: '电影活动',
		                    icon: 'el-icon-message',
		                    route: {
		                        type: 'inner',
		                        path: '/adminPage/websiteBuilt/movie/movieActivity'
		                    }
			            }]
	                },
	                {
			          	type: 'submenu',
			          	index: '3-3',
			          	lable: '文章',
			          	icon: 'el-icon-document-copy',
			          	childs:[{
		                    type: 'item',
		                    index: '/adminPage/websiteBuilt/article/articleDetail',
		                    lable: '文章详情',
		                    icon: 'el-icon-more-outline',
		                    route: {
		                        type: 'inner',
		                        path: '/adminPage/websiteBuilt/article/articleDetail'
		                    }
			            },
			            {
		                    type: 'item',
		                    index: '/adminPage/websiteBuilt/article/articleAdd',
		                    lable: '添加文章',
		                    icon: 'el-icon-circle-plus',
		                    route: {
		                        type: 'inner',
		                        path: '/adminPage/websiteBuilt/article/articleAdd'
		                    }
			            }]
		            }]
		        });
		        this.leftMenus.push({
		          	type: 'submenu',
		          	index: '4',
		          	lable: '站内通信',
		          	icon: 'el-icon-message',
		          	childs: [{
	                    type: 'item',
	                    index: '/adminPage/communication/email',
	                    lable: '站内信',
	                    icon: 'el-icon-message',
	                    route: {
	                        type: 'inner',
	                        path: '/adminPage/communication/email'
	                    }
	                },
	                {
	                    type: 'item',
	                    index: '/adminPage/communication/userInfoComment',
	                    lable: '主页留言',
	                    icon: 'el-icon-chat-line-round',
	                    route: {
	                        type: 'inner',
	                        path: '/adminPage/communication/userInfoComment'
	                    }
	                },
	                {
	                    type: 'item',
	                    index: '/adminPage/communication/movieComment',
	                    lable: '电影评论',
	                    icon: 'el-icon-chat-round',
	                    route: {
	                        type: 'inner',
	                        path: '/adminPage/communication/movieComment'
	                    }
	                },
	                {
	                    type: 'item',
	                    index: '/adminPage/communication/articleComment',
	                    lable: '文章评论',
	                    icon: 'el-icon-chat-dot-square',
	                    route: {
	                        type: 'inner',
	                        path: '/adminPage/communication/articleComment'
	                    }
	                }]
		        });
		    }

		},
		components:{
			ElSubmenuEx,ElMenuItemEx,ElMenuItemGroupEx
		}

	} 
</script>
<style lang="scss" scoped>
.sider-wrapper:not(.el-menu--collapse) {
    width: 200px;
}
.sider-wrapper{
	height:100%;
	.profile{
		width:100%;
		height:200px;
		background:rgb(36,52,67);
		margin-bottom:10px;
		img{
			width:80px;
			height:80px;
			border-radius:50%;
			margin:30px 60px 10px;
		}
		h3{
			font-size:16px;
			text-align:center;
			color:rgb(169, 176, 194);
			font-weight:bold;
		}

	}
}

</style>