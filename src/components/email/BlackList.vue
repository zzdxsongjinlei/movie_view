<template>
	<div class="blacklist">
		<h2>黑名单管理</h2>
		<div class="main" v-if="user_list==undefined||user_list.length<=0 ? false:true">
			<div v-for="(item,key) in user_list" :key="key">
				<black-user-list :user_id="item" @listenDelBlack="delBlack" />	
			</div>
		</div>
		<div class="sider" v-else>
			<p>你还没将任何成员列入黑名单</p>
		</div>	
	</div>	
</template>
<script>
	import BlackUserList from '../email/BlackUserList.vue';
	export default{
		name:'blacklist',
		data(){
			return{
				user_list:[]
			}
		},
		created(){
			this.getData();
		},
		methods:{
			getData(){
				let user_id=localStorage._id;
				if(user_id){
					this.axios.post('api/users/userDetail',{user_id:user_id}).then(response=>{
						if(response.data.status==1){
							this.mes.errorMessage(response.data.message);
						}
						else{
							if(response.data.data[0].userBlack){
							 	this.user_list=response.data.data[0].userBlack.split(',');	 
							}
						}
					})	
				}
				else{
					this.mes.promptMessage('没有登陆，2秒后返回登陆界面');
					setTimeout(()=>this.$router.push({path:'/loginPage'}),2000);
				}
			},
			delBlack(black_id){
				this.$confirm('将移出黑名单, 是否继续?','温馨提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}).then(() => {
					let user_id=localStorage._id;
					if(user_id){
						let start=this.user_list.indexOf(black_id);
						this.user_list.splice(start,1);					
						let userBlack=this.user_list.join(',');
						this.axios.post('api/users/updateUser',{user_id:user_id,userBlack:userBlack,flay:1}).then(response=>{
							if(response.data.status==1){
								this.mes.errorMessage(response.data.message);
							}
							else{
								this.mes.successMessage('已移出黑明单');
							}
						});
					}
					else{
						this.mes.promptMessage('没有登陆，2秒后返回登陆界面');
						setTimeout(()=>this.$router.push({path:'/loginPage'}),2000);
					}
				}).catch(() => {
					this.mes.promptMessage('已取消'); 
				});
			}
		},
		components:{
			BlackUserList
		}

	}
</script>
<style lang="scss" scoped>
.blacklist{
	.main{
		margin-top:20px;
		border-top:1px solid #ddd;
	}
	.sider{
		margin-top:20px;
	}
}
</style>