<template>
	<div class="message">
		<div class="showMessage" >
			<div v-if="messagelist==undefined||messagelist.length<=0? false:true">
				<message-list v-for="(item ,key) in messagelist" :item="item" :key="key" />
			</div >
			<div v-else>目前暂无留言</div>
		</div>
		<div class="sendMessage"  v-if="flag">
			<h5>请留言</h5>
			<el-input type="textarea" v-model="context">
			</el-input>
			<el-button type="primary" size="mini" @click="sendMessage">留言</el-button>
		</div>	
	</div>
</template>
<script >
	import MessageList from './MessageList.vue';
	export default{
		name:'usermessage',
		data(){
			return{
				user_id:'',
				//判断是否自己主页，决定留言界面是否存在；
				flag:true,
				context:'',
				messagelist:[]
			}
		},
		props:['_id'],
		created(){
			this.user_id=this.$route.params.id;
			this.getData();	
		},
		watch:{
			//观察父组件_id是否发生变化，如果变化就更新数据；
			_id:function(newValue,oldValue){
				this.user_id=newValue;
				this.getData();
			}
		},
		beforeRouteUpdate(){
			this.user_id=to.params.id;
			this.getData();
			next();
		},
		methods:{
			getData(){
				this.messagelist=[];
				if(localStorage._id){
					if(localStorage._id==this.user_id){
						this.flag=false;
					}
				}
				//后台读取留言
				this.axios.post('api/users/showMessage',{toUser:this.user_id}).then(response=>{
					if(response.data.status==1){
						this.mes.errorMessage(response.data.message);
					}
					else{
						let list=[...response.data.data];
						list.forEach(o=>{
							this.axios.post('api/users/userDetail',{user_id:o.fromUser}).then(res=>{
								o.userImg=res.data.data[0].userImg;
								o.username=res.data.data[0].username;

								this.messagelist.push(o);
							})
						})
					}
				});
			},
			//发送个人留言
			sendMessage(){
				if(this.context==''){
					this.mes.errorMessage('留言框不能为空');
					return false;
				}
				if(localStorage._id){
					let sendDate={
						context:this.context,
						toUser:this.user_id,
						token:localStorage.token,
						user_id:localStorage._id,
					};
					this.axios.post('api/users/sendMessage',sendDate).then(response=>{
						if(response.data.status==1){
							this.mes.errorMessage(response.data.message);
						}
						else{
							this.context='';
							this.mes.successMessage('留言成功');	
							//重新刷新页面
							this.getData();					
						}
					});
				}
				else{
					setTimeout(()=>{
						this.$router.push({path:'/loginPage'});
					},2000);
				}
			}

		},
		components:{
			MessageList
		}

	}
</script>
<style lang="scss" scoped>
.message{
	.showMessage{
		padding:10px 20px;
	}
	.sendMessage{
		h5{
			margin-bottom:10px;
			color:rgb(51,119,170);
		}
		.el-button{
			margin-top:20px;
		}
	}
}
	

</style>