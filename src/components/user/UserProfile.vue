<template>
	<div class="userprofile">
		<el-collapse v-model="activeName" accordion>
			<el-collapse-item title="文章" name="1">
				<user-article :_id="user_id" />   
			</el-collapse-item>
			<el-collapse-item title="日记" name="2">
			    <user-diary  :_id="user_id" />
			</el-collapse-item>
			<el-collapse-item title="广场" name="3">
			    <user-square :_id="user_id" />
			</el-collapse-item>
			<el-collapse-item title="留言板" name="4">
			   <user-message  :_id="user_id" />
			</el-collapse-item>
		</el-collapse>
	</div>
</template>
<script>
	import UserArticle from './UserArticle.vue';
	import UserDiary from './UserDiary.vue';
	import UserSquare from './UserSquare.vue';
	import UserMessage from './UserMessage.vue';
	export default{
		data(){
			return{
				activeName: '4',
				user_id:''
			}
		},
		created(){
			this.user_id=this.$route.params.id;
		},
		beforeRouteUpdate(to,from,next){
			this.user_id=to.params.id;
			next();
		},
		components:{
			UserArticle,
			UserDiary,
			UserSquare,
			UserMessage
		}	
	}
</script>
<style lang="scss">
	.el-collapse-item__header{
		font-size:16px;
		color:rgb(0,119,34);
	}
</style>
<style scoped lang="scss">
</style>