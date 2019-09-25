<template>
	<div class="messagelist">
		<img :src="item.userImg">
		<div class="message">
			<p>
				<span>
					<router-link :to="{path:'/userInfo/'+item.fromUser}">{{item.username}}:</router-link>
				</span>
				<span>{{item.context}}</span>
				<span>{{item.sendTime|forMatTime}}</span>
			</p>
			
		</div>
		
	</div>
</template>
<script>
	export default{
		name:'messagelist',
		data(){
			return{
			}
		},
		props:['item'],
		created(){
		},
		methods:{
			
		}
	}
</script>
<style lang="scss" scoped>
.messagelist{
	overflow:hidden;
	padding:10px 0px;
	border-top:1px solid #ddd;
	border-bottom:1px #ddd solid;
	margin-top:-1px;
	img{
		width:50px;
		float:left;
		margin-right:20px;
	}
	.message{
		p{
			span{
				font-size:12px;
				color:rgb(112,112,112);
				&:first-child{
					margin-right:10px;
				}
				&:last-child{
					margin-left:10px;
					color:#333;
				}
			}
		}

	}
}

</style>