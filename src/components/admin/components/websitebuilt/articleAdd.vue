<template>
	<div class="main">
		<h3>添加电影</h3>
		<el-form ref="form" label-width="100px"  :model="form">
			<el-row type="flex" justify="start" :gutter="50">
				<el-col :span="10">
					<el-form-item label="标题" >
			    		<el-input v-model="form.articleTitle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="10">
					<el-form-item label="话题">
						<el-input v-model="form.articleTopic" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-form-item label="文章内容">
			    <el-input v-model="form.articleContext" type="textarea"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" size="mini" @click="onSubmit">
					提交
				</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	export default{
		name:'articleAdd',
		data(){
			return{
				form:{
					articleTitle:'',
					articleTopic:'',
					articleContext:''
				}

			}
		},
		created(){
			
		},
		methods:{
			onSubmit(){
				this.axios.post('api/admin/addArticle',{
					token:localStorage.token,
					username:localStorage.username,
					id:localStorage._id,
					articleTitle:this.form.articleTitle,
					articleContext:this.form.articleContext,
					articleTopic:this.form.articleTopic
				}).then(response=>{
					if(response.data.status==0){
						this.mes.successMessage('添加成功');
						this.form={
							articleTitle:'',
							articleTopic:'',
							articleContext:''
						}
					}
					else{
						 return this.mes.errorMessage(response.data.message);
					}

				});
			}

		}

	}
</script>
<style lang="scss">

</style>
<style scoped lang="scss">
.main{
	width:80%;
	margin:20px auto;
	h3{
		margin-bottom:20px;
	}
}
</style>