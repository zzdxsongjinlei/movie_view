<template>
	<div>
		<div class="main">
		<h2>首页公告</h2>
		<el-row :gutter="50">
			<el-col :span="16" class="left" >
				<div class="btn">
					<el-input v-model="search" size='mini' placeholder="输入标题进行查找" style="width:200px;" suffix-icon="el-icon-search" />
					</div>
				<el-table :data="noticeList.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"  @selection-change="handleSelectionChange" border >
					<el-table-column type="selection"  align="center"></el-table-column>
					<el-table-column label="标题" prop="title" align="center" width="150"></el-table-column>
					<el-table-column label="内容" prop="context" align="center" width="190"></el-table-column>
					<el-table-column label="公布时间" width="190" align="center" :sortable="true" :sort-method="sortByDate">
						<template slot-scope="scope">
				    		<i class="el-icon-time"></i>
				    		<span style="margin-left:10px">{{scope.row.time| forMatTime}}</span>
				    	</template>
					</el-table-column>
					<el-table-column label="操作" align="center" width="160">
						<template slot-scope="scope">
							<el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
							<el-button type="danger" size="mini" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-dialog title="修改公告" :visible.sync="dialogFormVisible">
					<el-form ref="form1" label-width="85px" size="mini" :model="form1">
						<el-form-item label="标题" >
				    		<el-input   v-model="form1.title"></el-input>
						</el-form-item>
						<el-form-item label="内容" >
				    		<el-input   v-model="form1.context" type="textarea"></el-input>
						</el-form-item>
						<el-form-item label="发布时间" >
				    		<el-input   v-model="form1.time" disabled></el-input>
						</el-form-item>
					</el-form>
				  <div slot="footer" class="dialog-footer">
				    <el-button @click="dialogFormVisible = false">取 消</el-button>
				    <el-button type="primary" @click="onEdit">确 定</el-button>
				  </div>
				</el-dialog>
				<div class="pagination">
			    	<el-button type="danger"  @click="handleDeleteAll" >删除所选</el-button>

			    	<el-pagination  @current-change="handleCurrentChange" :page-size="pagesize" layout="total, prev, pager, next" :total="notice.length"></el-pagination>
		    	</div>	
			</el-col>
			<el-col :span="8" class="right">
				<h3>添加首页公告</h3>
				<el-form ref="form" label-width="85px" size="mini" :model="form">
					<el-form-item label="标题" >
			    		<el-input   v-model="form.title"></el-input>
					</el-form-item>
					<el-form-item label="内容" >
			    		<el-input   v-model="form.context"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" size="mini" @click="onSubmit">
							提交
						</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		</div>
	</div>
</template>
<script>
	export default{
		name:'websiteNotice',
		data(){
			return{
				form:{
					title:'',
					context:''
				},
				form1:{
					titlw:'',
					context:'',
					_id:'',
					time:''
				},
				dialogFormVisible:false,
				notice:[],
				noticeList:[],
				search:'',
				pagesize:10,
				multipleSelection:[]

			}
		},
		created(){
			this.getData();
			
		},
		methods:{
			getData(){
				this.axios.get('api/showNotice').then(response=>{
					if(response.data.status==0){
						this.notice=response.data.data;
						this.getnoticeList(1,this.pagesize);

					}
					else{
						this.mes.errorMessage('出现错误');
					}
				})

			},
			onSubmit(){
				this.axios.post('api/admin/noticeAdd',{username:localStorage.username,token:localStorage.token,id:localStorage._id,title:this.form.title,context:this.form.context}).then(response=>{
					if(response.data.status==0){
						this.mes.successMessage('添加成功');
						this.form={
							title:'',
							context:''
						}
						this.getData();
					}
					else{
						this.mes.errorMessage(response.data.message);
					}
				});
			},
			sortByDate(obj1,obj2){										
				return obj1.time-obj2.time;
			},
			getnoticeList(page,pagesize){
				 this.noticeList=this.notice.slice((page-1)*pagesize,page*pagesize);
			},
			async handleDeleteAll(){
				if(this.multipleSelection.length==0){
					return this.mes.promptMessage('选择框未选择');
				}
				await this.$confirm('将删除所选的所有公告, 是否继续?','温馨提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}).then(() => {

					let username=localStorage.username;
					let token=localStorage.token;
					let id=localStorage._id;
					this.multipleSelection.forEach(o=>{
						this.axios.post('api/admin/noticeDel',{username:username,token:token,id:id,noticeId:o._id}).then(response=>{
							if(response.data.status==1){
								this.mes.errorMessage(response.data.message);
							}
							else{
								this.mes.successMessage('删除成功');

							}
						});
						
					});
					this.getData();
				}).catch(() => {
					this.mes.promptMessage('已取消'); 
				});	

			},
			handleDelete(index,row){
				this.$confirm('将删除这个公告, 是否继续?','温馨提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}).then(() => {
					let username=localStorage.username;
					let token=localStorage.token;
					let id=localStorage._id;
					let _id=row._id;
					this.axios.post('api/admin/noticeDel',{username:username,token:token,id:id,noticeId:_id}).then(response=>{
						if(response.data.status==0){
							this.mes.successMessage('删除成功')
							this.getData();
						}
					});
				}).catch(() => {
					this.mes.promptMessage('已取消'); 
				});	

			},
			handleEdit(row){
				this.form1=row;
				this.dialogFormVisible=true;
			},
			onEdit(){
				this.axios.post('api/admin/noticeUpdate',{username:localStorage.username,id:localStorage._id,token:localStorage.token,noticeId:this.form1._id,title:this.form1.title,context:this.form1.context}).then(response=>{
					if(response.data.status==0){
						this.mes.successMessage('修改成功');
						this.dialogFormVisible=false;
						this.getData();
					}
					else{
						this.mes.errorMessage(response.data.message);
					}
				});
			},
			handleCurrentChange(val){
				this.getnoticeList(val,this.pagesize);
			},
			handleSelectionChange(val){
				this.multipleSelection = val;
			}

		}

	}
</script>
<style lang="scss">
.main{
	.el-table td, .el-table th{
		padding:2px;
	}
}
</style>
<style scoped lang="scss">
.main{
	margin:10px 20px;
	h2{
		margin-bottom:10px;
	}
	.left{
		.btn{
			margin-bottom:10px;
			overflow:hidden;
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
	.right{
		h3{
			margin-bottom:20px;
		}
	}
	
}
</style>