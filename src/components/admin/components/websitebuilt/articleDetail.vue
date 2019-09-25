<template>
	<div class="main">
		<div class="btn">
			<router-link :to="{path:'/adminPage/websiteBuilt/article/articleAdd'}"><el-button size="mini" type="primary"> 添加文章</el-button></router-link>
			<el-input v-model="search" size='mini' placeholder="输入电影名进行查找" style="width:200px;" suffix-icon="el-icon-search" />
		</div>

		<el-table ref="multipleTable" :data="articleList.filter(data => !search || data.articleTitle.toLowerCase().includes(search.toLowerCase()))" style="width: 100%"  border  @selection-change="handleSelectionChange" >
				<el-table-column type="expand" label="文章详情" width="100">
					<template slot-scope="scope">
						<el-form label-position="left" inline  class="demo-table-expand">
							<el-form-item label="文章详情">
								<span>{{scope.row.articleContext}}</span>
							</el-form-item>
						</el-form>
					</template>
				</el-table-column>

				<el-table-column type="selection" align="center" width="60"></el-table-column>
				
			    <el-table-column label="文章名"  prop="articleTitle"  align="center">
			     </el-table-column>
			     <el-table-column label="文章分类"  prop="articleTopic" width="120" align="center">
			     </el-table-column>
			  
			    <el-table-column label="发布时间" :sortable="true" :sort-method="sortByDate" align="center"  > 
			    	<template slot-scope="scope">
			    		<i class="el-icon-time"></i>
			    		<span style="margin-left:10px">{{scope.row.articleTime| forMatTime}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column label="操作"    align="center">
			     	<template slot-scope="scope">
			     		<el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
			     		<el-button type="danger" size="mini" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
			     	</template>
			     </el-table-column>
	    </el-table>
	    <el-dialog title="修改文章" :visible.sync="dialogFormVisible">
			<el-form ref="form1" label-width="85px" size="mini" :model="form1">
				<el-form-item label="文章名" >
		    		<el-input   v-model="form1.articleTitle"></el-input>
				</el-form-item>
				<el-form-item label="文章分类" >
		    		<el-input   v-model="form1.articleTopic"></el-input>
				</el-form-item>
				<el-form-item label="文章内容" >
		    		<el-input   v-model="form1.articleContext" type="textarea"></el-input>
				</el-form-item>
			</el-form>
		  	<div slot="footer" class="dialog-footer">
		    	<el-button @click="dialogFormVisible = false">取 消</el-button>
		    	<el-button type="primary" @click="onEdit">确 定</el-button>
		 	 </div>
		</el-dialog>
	    <div class="pagination">
	    	<el-button type="danger"  @click="handleDeleteAll" >删除所选</el-button>

	    	<el-pagination  @current-change="handleCurrentChange" :page-size="pagesize" layout="total, prev, pager, next" :total="article.length"></el-pagination>
		</div>
	    
	</div>
</template>
<script>
	export default{
		name:'articleDetail',
		data(){
			return{
				article:[],
				articleList:[],
				pagesize:5,
				search:'',
				multipleSelection:[],
				dialogFormVisible:false,
				form1:{
					articleTitle:'',
					articleContext:'',
					articleTopic:'',
					_id:''
				}

			}
		},
		created(){
			this.getData();	
		},
		methods:{
			getData(){
				this.axios.get('api/showArticle').then(response=>{
					this.article=response.data.data;
					this.getarticleList(1,this.pagesize);
				})
			},
			getarticleList(page,pagesize){
				 this.articleList=this.article.slice((page-1)*pagesize,page*pagesize);
			},
			handleCurrentChange(val){
				this.getarticleList(val,this.pagesize);
			},
			sortByDate(obj1,obj2){
				return obj1.articleTime-obj2.articleTime;
			},
			onEdit(){
				this.axios.post('api/admin/updateArticle',{
					token:localStorage.token,
					id:localStorage._id,
					username:localStorage.username,
					articleId:this.form1._id,
					articleTitle:this.form1.articleTitle,
					articleContext:this.form1.articleContext,
					articleTopic:this.form1.articleTopic
				}).then(response=>{
					if(response.data.status==0){
						this.mes.successMessage('编辑成功');
						this.dialogFormVisible=false;
						this.form1={
								articleTitle:'',
								articleContext:'',
								articleTopic:'',
								_id:''
							}
					}
					else{
						return this.mes.errorMessage(response.data.message);
					}

				});
			},
			handleEdit(index,row){
				this.dialogFormVisible=true;
				this.form1=row;

			},
			handleDelete(index,row){
				this.$confirm('将删除这个文章, 是否继续?','温馨提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}).then(() => {
					this.axios.post('api/admin/delArticle',{
						token:localStorage.token,
						id:localStorage._id,
						username:localStorage.username,
						articleId:row._id
					}).then(response=>{
						if(response.data.status==0){
							this.mes.successMessage('删除成功');
							this.getData();
						}
						else{
							return this.mes.errorMessage(response.data.message);
						}

					})
				}).catch(() => {
					this.mes.promptMessage('已取消'); 
				});	
			},
			handleSelectionChange(val) {
		        this.multipleSelection = val;
		    },
			async handleDeleteAll(){
				if(this.multipleSelection.length==0){
					return this.mes.promptMessage('选择框未选择');
				}
				await this.$confirm('将删除所选的所有文章, 是否继续?','温馨提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}).then(() => {
					this.multipleSelection.forEach(o=>{
						this.axios.post('api/admin/delArticle',{
							token:localStorage.token,
							id:localStorage._id,
							username:localStorage.username,
							articleId:o._id
						}).then(response=>{
							if(response.data.status==0){
								this.mes.successMessage('删除成功');								
							}
							else{
								return this.mes.errorMessage(response.data.message);
							}
						})
						
					});
				this.getData();
					
				}).catch(() => {
					this.mes.promptMessage('已取消'); 
				});	


			}

		}

	}
</script>
<style lang="scss">
.main{
	.el-table td,.el-table th{
		padding:2px 0px;
	}
	.demo-table-expand {
	    font-size: 0;
	}
	.demo-table-expand label {
	    width: 90px;
	    color: #99a9bf;
	}
	.demo-table-expand .el-form-item {
		margin-left:20px;
	}
	.demo-table-expand .el-form-item__content {
		line-height:28px;
	}
}

</style>
<style scoped lang="scss">
.main{
	padding:20px;
	.btn{
		margin-bottom:10px;
		overflow:hidden;
		.el-button{
			margin-right:10px;
		}
		.el-input{
			float:right;
		}
	}
	.pagination{
			.el-button{
				margin-left:20px;
			}
			margin-top:10px;
			overflow:hidden;
			.el-pagination{
				margin-top:10px;
				float:right;
			}

		}
		
}
</style>