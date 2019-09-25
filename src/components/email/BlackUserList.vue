<template>
	<div class="blackuser">
		<div class="btn">
			<button @click="delBlack">移出黑名单</button>
		</div>
		<div class="user">
			<img :src="user.userImg">
			<p>
				<span>
					<router-link :to="{path:'/userInfo/'+user._id}">{{user.username}}</router-link>
				</span>
				<span>{{user.userCity}}</span>
			</p>
			<p>{{user.userMotto}}</p>
		</div>		
	</div>
</template>
<script>
	export default{
		name:'blackuser',
		data(){
			return{
				user:''
			}
		},
		props:['user_id'],
		created(){
			this.getData();
		},
		methods:{
			getData(){
				if(this.user_id){
					this.axios.post('api/users/userDetail',{user_id:this.user_id}).then(response=>{
						if(response.data.status==1){
						}
						else{
							this.user=response.data.data[0];
						}
					});
				}
				
			},
			delBlack(){
				this.$emit('listenDelBlack',this.user_id);
			}

		}
	}
</script>
<style lang="scss" scoped>
.blackuser{
	padding:10px 20px;
	border-bottom:1px solid #ddd;
	overflow:hidden;
	font-size:13px;
	.user{
		img{
			float:left;
			width:50px;
			margin-right:10px;
		}
		p{	
			margin-bottom:10px;	
			color:#333;
			span{
				margin-right:20px;
			}
		}
	}
	.btn{
		margin-top:15px;
		float:right;
		button{
			line-height:13px;
			padding:4px 10px;
			background:#edc72f;
			font-weight:bold;
			border-radius:4px;
		}
	}
}
</style>