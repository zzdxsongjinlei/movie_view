<template>
<div class="email">
	<h2 >我的站内信</h2>
	<div class="email-nav">
		<p>邮件(未读)</p>
		<p>
			<span>
				筛选:
				<select v-model="value" @change="selectValue">
					<option v-for="item in options" :key="item.value" :value="item.value">{{item.label}}</option>
				</select>
			</span>	
		</p>
	</div>
	<div class="email-in" v-if="email_in">
		<h3>收件箱</h3>
		<email-list v-for="(item ,key) in receive_items " :key='key' :item='item' @listenDelEmail="delEmail"/>
		
	</div>
	<div class="email-out" v-if="email_out">
		<h3>发件箱</h3>
		<email-list v-for="(item ,key) in send_items " :key='key' :item='item' @listenDelEmail="delEmail" />
	</div>
</div>
</template>

<script>
	import EmailList from './EmailList.vue';
	export default{
		data(){
			return{
				receive_items:[],
				send_items:[],
				value:'both',
				options:[
					{
						value:'both',
						label:'全部邮件'
					},
					{
						value:'outbox',
						label:'发件箱'
					},
					{
						value:'inbox',
						label:'收件箱'
					}
				],
				email_in:true,
				email_out:true
			}
		},
		created(){
			this.getData();
		},
		methods:{

			getData(){
				let userId=localStorage._id;
				let sendDate={
					token:localStorage.token,
					user_id:localStorage._id,
					receive:0
				};
				let receiveDate={
					token:localStorage.token,
					user_id:localStorage._id,
					receive:1
				};
				if(userId){
					this.axios.post('api/users/showEmail',sendDate).then(response=>{	
						if(response.data.status==0){
							this.send_items=response.data.data;	
						}
						else{
							this.mes.errorMessage(response.data.message);
						}
					});
					this.axios.post('api/users/showEmail',receiveDate).then(response=>{
						if(response.data.status==0){
							this.receive_items=response.data.data;							
						}
						else{
							this.mes.errorMessage(response.data.message);
						}
					});
				}
			},
			//切换条件
			selectValue(){
				if(this.value=='both'){
					this.email_in=true;
					this.email_out=true;
				}
				if(this.value=='inbox'){
					this.email_in=true;
					this.email_out=false;
				}
				if(this.value=='outbox'){
					this.email_out=true;
					this.email_in=false;
				}
			},
			//组件点击删除命令，父件监听执行命令；
			delEmail(data){
				this.$confirm('将删除这个邮件, 是否继续?','温馨提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}).then(() => {
					let receive=this.receive_items.indexOf(data);
					let send=this.send_items.indexOf(data);
					if(receive!==-1){
						this.axios.post('api/users/delEmail',{mail_id:data._id}).then(response=>{
							if(response.data.status==0){
								this.receive_items.splice(receive,1);
								this.mes.successMessage('删除成功!');
							}
							else{
								this.mes.errorMessage(response.data.message);
							}
						});
					};
					if(send!==-1){
						this.axios.post('api/users/delEmail',{mail_id:data._id}).then(response=>{
							if(response.data.status==0){
								this.send_items.splice(send,1);
								this.mes.successMessage('删除成功!');
							}
							else{
								this.mes.errorMessage(response.data.message);
							}
						});
					}
				}).catch(() => {
					this.mes.promptMessage('已取消删除'); 
				});	
			},
			
			

		},
		components:{
			EmailList
		}

	}
</script>
<style scoped lang="scss">
.email{
	h2{
		color:rgb(73,73,73);
		font-size:26px;
		line-height:28px;
		padding-bottom:15px;
	}
	h3{
		font-size:16px;
		color:rgb(0,119,34);
		margin-top:10px;
		margin-bottom:15px;
	}
	.email-nav{
		overflow:hidden;
		padding:10px 0px;
		border-bottom:1px solid #ddd;
		font-size:13px;
		p{
			&:first-child{
				float:left;
				padding:3px 10px;
				color:#fff;
				background:rgb(131,191,115);
				border-radius:3px;
			}
			&:last-child{
				float:right;

			}
		}	
	}
}



</style>