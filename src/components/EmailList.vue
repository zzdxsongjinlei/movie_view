<template>
	<div class="message">
		<li>
			<div class="left">
				<img :src="user.userImg">
				<p>
					<span><router-link :to="{path:'/userInfo/'+user._id}">{{user.username}}</router-link></span>
					<router-link to="" @click="btnSay">[打招呼]</router-link>
				</p>
			</div>
			<div class="title">
				<p  @click="btnEmail(item.context)">
					<router-link to="">
					{{item.title}}
					</router-link>
				</p>	
			</div>
			<div class="right">
				<p>{{item.sendTime |forMatTime}}</p>
				<p class="btn">
					<span @click="addBlack">加入黑名单</span>
					<span @click="delEmail">删除</span>
				</p>
			</div>
		</li>	
	</div>
</template>
<script>
	export default{
		data(){
			return{
				user_id:'',
				user:''
			}
		},
		props:['item'],
		created(){
			this.user_id=(localStorage._id==this.item.toUser?this.item.fromUser:this.item.toUser);
			this.getData();
		},
		methods:{
			//删除邮件，点击触发父类的删除事件，
			delEmail:function(){
				this.$emit('listenDelEmail',this.item);
			},
			//添加黑明单
			addBlack:function(){

				this.axios.post('api/users/userDetail',{user_id:localStorage._id}).then(response=>{
					if(response.data.status==1){
						this.mes.errorMessage(response.data.message);
					}
					else{
						if(response.data.data[0].userBlack.indexOf(this.user_id)>=0){
							this.mes.errorMessage('已经加入黑名单，不可重复操作');
						}
						else{
							this.$confirm('将加入黑名单, 是否继续?','温馨提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}).then(() => {
									let userBlack=response.data.data[0].userBlack+','+this.user_id;

									this.axios.post('api/users/updateUser',{user_id:localStorage._id,userBlack:userBlack,flay:1}).then(response=>{
										if(response.data.status==1){
											this.mes.errorMessage(response.data.message);
										}
										else{
											this.mes.errorMessage('加入黑名单成功，但是邮件需要手动删除');
										}
									});
								
							}).catch(() => {
								this.mes.promptMessage('已取消加入黑名单'); 
							});
						}
					}

				});
			},
			getData(){
				this.axios.post('/api/showUser',{user_id:this.user_id}).then(response=>this.user=response.data.data[0]);
			},
			btnEmail(message){
				console.log('11');
				this.$alert(message, '邮件内容', {
		          confirmButtonText: '确定'
		        });


			},
			btnSay(){
				this.$alert('暂未开通此功能', '内容', {
		          confirmButtonText: '确定'
		        });


			}
		}
	}
</script>
<style lang="scss" scoped>
.message{
	li{
		padding:10px;
		list-style:none;
		border-top:1px solid #ddd;
		overflow:hidden;
		display:flex;
		flex-flow:row nowrap;
		justify-content:space-between;
		&:last-child{
			border-bottom:1px solid #ddd;
		}
		.left{
			font-size:13px;
			img{
				width:50px;
				float:left;
				vertical-align:middle;
			}
			p{	color:rgb(102,102,102);
				margin-left:60px;
				a{
					margin-bottom:10px;
					display:block;
					color:rgb(51,119,170);
				}
			}
		}
		.title{
			display:flex;
			align-items:center;
			font-size:15px;
		}
		.right{
			font-size:13px;
			>p{
				color:rgb(153,153,153);
				margin-bottom:10px;
			}
			.btn{
				span{
					margin-left:10px;
					&:hover{
						cursor:pointer;
					}
				}
			}
		}
	}
	
}

</style>