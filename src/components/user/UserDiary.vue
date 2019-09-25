<template>
	<div class="diary">
		<div>暂无日记内容</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				user:'',
				user_id:''
			}
		},
		created(){
			this.user_id=this.$route.params.id;
			this.getData();

		},
		methods:{
			getData(){
				this.axios.post('api/showUser',{user_id:this.user_id}).then(response=>{
                   	this.user=response.data.data[0];                
				});
			}
		}
	}
</script>
<style scoped lang="scss">
</style>