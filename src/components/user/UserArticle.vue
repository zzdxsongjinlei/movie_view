<template>
	<div class="article">
		<div v-if="list==undefined || list.length<=0 ? false:true">
			<news-list :list="list" />
		</div>
		<div v-else class="art">
			暂无文章
		</div>
	</div>
</template>
<script>
	import NewsList from '../NewsList.vue';
	export default{
		data(){
			return{
				user:'',
				list:'',
				user_id:''
			}
		},
		props:['_id'],
		created(){
			this.user_id=this.$route.params.id;
			this.getData();
		},
	
		beforeRouteUpdate(to,from,next){
			this.user_id=to.params.id;
			this.getData();
			next();
		},
		//检测父组件_id是否发生变化
		watch:{
			_id:function(newValue,oldValue){
				this.user_id=newValue;
				this.getData();
			}
		},
		methods:{
			getData(){
				this.axios.post('/api/admin/article',{user_id:this.user_id}).then(re=>{
						this.list=re.data.data;
				});	
			}
		},
		components:{
			NewsList
		}
	}
</script>
<style scoped lang="scss">

</style>