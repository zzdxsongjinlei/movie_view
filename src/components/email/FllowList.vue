<template>
	<div class="fllowlist">
		<h2>我关注的人</h2>
		<div v-if="user_list==undefined||user_list.length<=0 ? false:true "  class="main">
			<div v-for="(item,key) in user_list" :key="key">
				<fllow-user-list  :user_id="item" @listenDelFllow="delFllow" />
			</div>
		</div>
		<div v-else class="side">
			<p>你还没关注任何成员</p>
		</div>
	</div>
</template>
<script>
	import FllowUserList from '../email/FllowUserList.vue';
	export default{
		name:'fllowlist',
		data(){
			return{
				user_list:[]
			}
		},
		created(){
			this.getData();
		},
		methods:{
			//取出关注的人的列表
			getData(){
				let user_id=localStorage._id;
				if(user_id){
					this.axios.post('api/users/userDetail',{user_id:user_id}).then(response=>{
						if(response.data.status==1){
							this.mes.errorMessage(response.data.message);
						}
						else{
							if(response.data.data[0].userFllow){
							 	this.user_list=response.data.data[0].userFllow.split(',');	 
							}
						}
					})	
				}
				else{
					this.mes.promptMessage('没有登陆，2秒后返回登陆界面');
					setTimeout(()=>this.$router.push({path:'/loginPage'}),2000);
				}
			},
			//取消关注，子组件触发时取消关注;
			delFllow(fllow_id){
				this.$confirm('将取消关注, 是否继续?','温馨提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}).then(() => {
					let user_id=localStorage._id;
					if(user_id){
						let start=this.user_list.indexOf(fllow_id);					
						this.user_list.splice(start,1);				
						let userFllow=this.user_list.join(',');
						this.axios.post('api/users/updateUser',{user_id:user_id,userFllow:userFllow,flay:0}).then(response=>{
							if(response.data.status==1){
								this.mes.errorMessage(response.data.message);
							}
							else{
								this.mes.successMessage('已取消关注');
							}
						});
					}
					else{
						this.mes.promptMessage('没有登陆，2秒后返回登陆界面');
						setTimeout(()=>this.$router.push({path:'/loginPage'}),2000);
					}
				}).catch(() => {
					this.mes.promptMessage('已取消删除'); 
				});

			},
			
		},
		components:{
			FllowUserList
		}

	}
</script>
<style lang="scss" scoped>
.fllowlist{
	.main{
		margin-top:20px;
		border-top:1px solid #ddd;
	}
	.side{
		margin-top:20px;
	}

}
</style>