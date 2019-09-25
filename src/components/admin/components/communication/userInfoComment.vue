<template>
	<div class="main">
		<div class="btn">
			<el-input v-model="search" size='mini' placeholder="输入留言人姓名进行查找" style="width:200px;" suffix-icon="el-icon-search" />
		</div>
		<el-table ref="multipleTable" :data="commentsList.filter(data => !search || data.fromUsername.toLowerCase().includes(search.toLowerCase()))" style="width: 100%"  border   @selection-change="handleSelectionChange">
				<el-table-column type="selection" align="center"></el-table-column>
				 <el-table-column prop="fromUsername" label="留言人" align="center"  width="100"></el-table-column>

				<el-table-column prop="fromUserImg" label="留言人头像" width="100" align="center">
					<template slot-scope="scope">
						<img :src="scope.row.fromUserImg" style="width:30px;">
					</template> 
				</el-table-column>
				 <el-table-column prop="toUsername" label="个人主页" align="center"  width="100"></el-table-column>

				<el-table-column prop="toUserImg" label="个人头像" width="100" align="center">
					<template slot-scope="scope">
						<img :src="scope.row.toUserImg" style="width:30px;">
					</template> 
				</el-table-column>
			    <el-table-column label="留言时间"  align="center" :sortable="true" :sort-method="sortByDate" width="200"> 
			    	<template slot-scope="scope">
			    		<i class="el-icon-time"></i>
			    		<span style="margin-left:10px">{{scope.row.sendTime|forMatTime}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column label="留言内容"  align="center"  prop="context"> 
			    </el-table-column>
			    <el-table-column label="操作"  align="center" prop="title" width="100"> 
			    	<template slot-scope="scope">
			    		<el-button type="danger" size="mini" @click="handelDelete(scope.$index,scope.row)">删除</el-button>
			    	</template>
			    </el-table-column> 
	    </el-table>
	    <div class="pagination">
	    	<el-button type="danger"  @click="handleDeleteAll" size="mini" >删除所选</el-button>
	    	<el-pagination  @current-change="handleCurrentChange" :page-size="pagesize" layout="total, prev, pager, next" :total="comments.length">
    		</el-pagination>
	    </div>
	   
	</div>
</template>
<script>
	export default{
		name:'userInfoComment',
		data(){
			return{
				comments:[],
				commentsList:[],
				pagesize:5,
				search:'',
				multipleSelection: []
			}
		},
		created(){
			this.getData();	
		},
		methods:{
			getData(){
				this.commentsList=[];
				this.comments=[];
				this.axios.post('api/admin/showMessage',{token:localStorage.token,id:localStorage._id,username:localStorage.username}).then(response=>{
					if(response.data.status==1){
						this.mes.errorMessage(response.data.message);
					}
					else{
						let list=response.data.data;
						list.map(o=>{
							this.axios.all([this.axios.post('api/users/userDetail',{user_id:o.fromUser}),this.axios.post('api/users/userDetail',{user_id:o.toUser})]).then(this.axios.spread((res1,res2)=>{
								o.fromUsername=res1.data.data[0].username;
								o.fromUserImg=res1.data.data[0].userImg;
								o.toUsername=res2.data.data[0].username;
								o.toUserImg=res2.data.data[0].userImg;
								this.comments.push(o);
								this.getcommentsList(1,this.pagesize);
							}))
						});
					}
				});
				
			},
			getcommentsList(page,pagesize){
				this.commentsList=this.comments.slice((page-1)*pagesize,page*pagesize);
			},
			handleSelectionChange(val){
				this.multipleSelection=val;
			},
			sortByDate(obj1,obj2){
				return obj1.userJoinTime-obj2.userJoinTime;
			},
			handelDelete(index,row){
				this.$confirm('将删除这封邮件, 是否继续?','温馨提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}).then(() => {
					this.axios.post('api/admin/delMessage',{username:localStorage.username,token:localStorage.token,id:localStorage._id,messageId:row._id}).then(response=>{
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
			async handleDeleteAll(){
				if(this.multipleSelection.length==0){
					return this.mes.promptMessage('选择框未选择');
				}
				await this.$confirm('将删除所选的所有邮件, 是否继续?','温馨提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}).then(() => {
					this.multipleSelection.forEach(o=>{
						this.axios.post('api/admin/delMessage',{username:localStorage.username,token:localStorage.token,id:localStorage._id,messageId:o._id}).then(response=>{
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
			handleCurrentChange(val){
				this.getcommentsList(val,this.pagesize);
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