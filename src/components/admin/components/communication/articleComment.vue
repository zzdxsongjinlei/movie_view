<template>
	<div class="main">
		<div class="btn">
			<el-input v-model="search" size='mini' placeholder="输入文章名进行查找" style="width:200px;" suffix-icon="el-icon-search" />
		</div>
		<el-table ref="multipleTable" :data="commentsList.filter(data => !search || data.articleTitle.toLowerCase().includes(search.toLowerCase()))" style="width: 100%"  border   @selection-change="handleSelectionChange">

				<el-table-column type="selection" align="center"></el-table-column>
				 <el-table-column prop="username" label="评论人" align="center"  width="100"></el-table-column>

				<el-table-column prop="userImg" label="评论人头像" width="100" align="center">
					<template slot-scope="scope">
						<img :src="scope.row.userImg" style="width:30px;">
					</template> 
				</el-table-column>
				 <el-table-column prop="articleTitle" label="文章" align="center"  width="180"></el-table-column>
			    <el-table-column label="评论时间"  align="center" :sortable="true" :sort-method="sortByDate" width="200"> 
			    	<template slot-scope="scope">
			    		<i class="el-icon-time"></i>
			    		<span style="margin-left:10px">{{scope.row.commentTime|forMatTime}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column label="评论内容"  align="center"  prop="context"> 
			    </el-table-column>

				<el-table-column label="审核"  prog="check" :filters="[{text:'已批准',value:true},{text:'审核中',value:false}]" :filter-method="filterCheck" filter-placement="bottom-end" align="center" width="100">
				    	<template slot-scope="scope">
				    		<el-tag size="mini" type="danger" disable-transitions v-if="scope.row.check">
				    		{{scope.row.check|formatCheck}}
				    		</el-tag>
				    		<el-button size="mini" type="danger" v-else @click="onCheck(scope.$index,scope.row)">
				    			{{scope.row.check|formatCheck}}
				    		</el-button>
				    	</template> 
				</el-table-column> 
			    <el-table-column label="操作"  align="center" prop="title" width="100"> 
			    	<template slot-scope="scope">
			    		<el-button type="danger" size="mini" @click="handleDelete(scope.$index,scope.row)">删除
			    		</el-button>
			    	</template>
			    </el-table-column> 
	    </el-table>
	    <div class="pagination">
	    	<el-button type="danger"  @click="handleDeleteAll" size="mini" >删除所选</el-button>
	    	<el-button type="danger"  @click="onCheckAll" size="mini" >审核所选</el-button>
	    	<el-pagination  @current-change="handleCurrentChange" :page-size="pagesize" layout="total, prev, pager, next" :total="comments.length">
    		</el-pagination>
	    </div>
	</div>
</template>
<script>
	export default{
		name:'articleComment',
		data(){
			return{
				comments:[],
				commentsList:[],
				pagesize:5,
				multipleSelection:[],
				search:''

			}
		},
		created(){
			this.getData();
		},
		filters:{
			formatCheck(value){
				if(value){
					return '已批准';
				}
				else{
					return '审核中';
				}
			}
		},
		methods:{
			getData(){
				this.commentsList=[];
				this.comments=[];
				this.axios.get('api/admin/commentsList').then(response=>{
					let list=response.data.data.filter(o=>{return o.article_id});
					list.map(p=>{
						this.axios.all([this.axios.post('api/users/userDetail',{username:p.username}),this.axios.post('api/articleDetail',{article_id:p.article_id})]).then(this.axios.spread((res1,res2)=>{
								p.user_id=res1.data.data[0]._id;
								p.userImg=res1.data.data[0].userImg;
								p.articleTitle=res2.data.data[0].articleTitle;
								this.comments.push(p);
								console.log(this.comments);
								this.getcommentsList(1,this.pagesize);
							}))
					});
				})

			},
			async handleDeleteAll(){
				if(this.multipleSelection.length==0){
					return this.mes.promptMessage('选择框未选择');
				}
				await this.$confirm('将删除所选的所有评论, 是否继续?','温馨提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}).then(() => {
					this.multipleSelection.forEach(o=>{
						this.axios.post('api/admin/delComment',{username:localStorage.username,token:localStorage.token,id:localStorage._id,commentId:o._id}).then(response=>{
							if(response.data.status==0){
								this.mes.successMessage('删除成功');	
							}
							else{
								this.mes.errorMessage(response.data.message);
							}
						});
					});
					this.getData();
					
				}).catch(() => {
					this.mes.promptMessage('已取消'); 
				});	


			},
			handleDelete(index,row){
				this.$confirm('将删除这个评论, 是否继续?','温馨提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}).then(() => {
					this.axios.post('api/admin/delComment',{username:localStorage.username,token:localStorage.token,id:localStorage._id,commentId:row._id}).then(response=>{
						if(response.data.status==0){
							this.mes.successMessage('删除成功');
							this.getData();
						}
						else{
							this.mes.errorMessage(response.data.message);
						}
					});
				}).catch(() => {
					this.mes.promptMessage('已取消'); 
				});	

			},
			onCheck(index,row){
				this.$confirm('将通过这个评论, 是否继续?','温馨提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}).then(() => {

					this.axios.post('api/admin/checkComment',{username:localStorage.username,token:localStorage.token,id:localStorage._id,commentId:row._id}).then(response=>{
						if(response.data.status==0){
							this.mes.successMessage('审核成功');
							this.getData();
						}
						else{
							this.mes.errorMessage(response.data.message);
						}
					});
				}).catch(() => {
					this.mes.promptMessage('已取消'); 
				});	

			},
			async onCheckAll(){

				if(this.multipleSelection.length==0){
					return this.mes.promptMessage('选择框未选择');
				}
				await this.$confirm('将审核所选的所有评论, 是否继续?','温馨提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}).then(() => {
					this.multipleSelection.forEach(o=>{
						this.axios.post('api/admin/checkComment',{username:localStorage.username,token:localStorage.token,id:localStorage._id,commentId:o._id}).then(response=>{
							if(response.data.status==0){
								this.mes.successMessage('审核成功');
								
							}
							else{
								this.mes.errorMessage(response.data.message);
							}
						});
					});

					this.getData();
				}).catch(() => {
					this.mes.promptMessage('已取消'); 
				});	

			},
			getcommentsList(page,pagesize){
				this.commentsList=this.comments.slice((page-1)*pagesize,page*pagesize);
			},
			handleSelectionChange(val){
				this.multipleSelection=val;
			},
			handleCurrentChange(val){
				this.getcommentsList(val,this.pagesize);
			},
			sortByDate(obj1,obj2){
				return obj1.userJoinTime-obj2.userJoinTime;
			},
			filterCheck( value,row){
				return row.check===value;
			}
		}

	}
</script>
<style lang="scss">
.el-table td{
	padding:2px;
}
	
</style>
<style scoped lang="scss">


.main{
	padding:10px 20px;
	.btn{
		margin-bottom:10px;
		overflow:hidden;
		.el-input{
			float:right;
		}
	}
	.pagination{
		margin-top:10px;
		overflow:hidden;
		.el-button{
			margin-left:10px;
		}
		.el-pagination{	
			float:right;
		}
	}
}
</style>