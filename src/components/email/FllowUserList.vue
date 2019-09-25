<template>
	<div class="fllowuser">
		<div class="btn">
			<button @click="delFllow">取消关注</button>
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
		name:'fllowuser',
		data(){
			return {
				user:''
			}
		},
		props:['user_id'],
		created(){
			this.getData();
		},
		methods:{
			getData(){
				this.axios.post('api/users/userDetail',{user_id:this.user_id}).then(response=>{
					if(response.data.status==1){
					}
					else{
						this.user=response.data.data[0];
					}
				});
			},
			//监听组件取消关注事件，触发父组件
			delFllow(){
				this.$emit('listenDelFllow',this.user_id);
			}
		}

	}
</script>
<style lang="scss" scoped>
.fllowuser{
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