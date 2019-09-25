<template>
	<div class="main">
		<h2>首页轮播图</h2>
		<el-row :gutter="50">
			<el-col :span="16" class="left">
				<el-table :data="imagesList" border>
					<el-table-column  type="index">
					</el-table-column>
					<el-table-column label="图片" >
						<template slot-scope="scope">
							<img :src="scope.row.recommendImg" style="height:40px;">	
						</template>
					</el-table-column>
					<el-table-column label="链接" prop="recommendScr">
					</el-table-column>
					<el-table-column label="文字" prop="recommendTitle">
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
							<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
						</template>
						
					</el-table-column>
				</el-table>
				<el-dialog title="修改轮播图" :visible.sync="dialogFormVisible">
					<el-form ref="form1" label-width="85px" size="mini" :model="form1">
						<el-form-item label="轮播图">
						    <el-upload class="avatar-uploader"  name="file" action="api/upload/plating" ref="upload"    :before-upload="handleREBeforeUpload" :on-success="handleReSuccess" >
						    	<img v-if="form1.recommendImg" :src="form1.recommendImg" class="avatar" />
						    	<i  v-else class="el-icon-plus avatar-uploader-icon"></i> 
							</el-upload>
							<span v-if="form1.recommendImg">点击更换轮播图</span>
							<span v-else >点击添加轮播图</span>
						</el-form-item>
						<el-form-item label="链接" >
				    		<el-input   v-model="form1.recommendScr"></el-input>
						</el-form-item>
						<el-form-item label="标题" >
				    		<el-input   v-model="form1.recommendTitle"></el-input>
						</el-form-item>
					</el-form>
				  	<div slot="footer" class="dialog-footer">
				    	<el-button @click="dialogFormVisible = false">取 消</el-button>
				    	<el-button type="primary" @click="onEdit">确 定</el-button>
				 	 </div>
				</el-dialog>
			</el-col>
			<el-col :span="8" class="right">
				<h3>添加轮播图</h3>
				<el-form ref="form" label-width="85px" size="mini" :model="form" >
					<el-form-item label="轮播图">
					    <el-upload class="avatar-uploader"  name="file" action="api/upload/plating" ref="upload"    :before-upload="handleBeforeUpload" :on-success="handleSuccess" >
					    	<img v-if="form.recommendImg" :src="form.recommendImg" class="avatar" />
					    	<i  v-else class="el-icon-plus avatar-uploader-icon"></i> 
						</el-upload>
						<span v-if="form.recommendImg">点击更换轮播图</span>
						<span v-else >点击添加轮播图</span>
					</el-form-item>
	
					<el-form-item label="链接" >
			    		<el-input   v-model="form.recommendScr"></el-input>
					</el-form-item>
					<el-form-item label="标题" >
			    		<el-input   v-model="form.recommendTitle"></el-input>
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
</template>
<script>
	export default{
		name:'planting',
		data(){
			return{
				imagesList:[],
				dialogFormVisible:false,
				form:{
					recommendScr:'',
					recommendImg:'',
					recommendTitle:''
				},
				form1:{
					_id:'',
					recommendScr:'',
					recommendImg:'',
					recommendTitle:''
				}

			}
		},
		created(){
			this.getData();	
		},
		methods:{
			getData(){
				this.axios.get('api/admin/showIndex').then(response=>{
					this.imagesList=response.data.data;
				});
			},
			handleEdit(index,row){
				this.dialogFormVisible=true;
				this.form1=row;
			},
			handleDelete(index,row){
				this.$confirm('将删除这个轮播图, 是否继续?','温馨提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}).then(() => {
					this.axios.all([ 
						this.axios.post('api/upload/platingDel',{username:row.recommendImg}),
						this.axios.post('api/admin/delRecommend',{token:localStorage.token,username:localStorage.username,id:localStorage._id,recommendId:row._id})
					]).then(this.axios.spread((res1,res2)=>{
						if(res1.data.status==0&&res2.data.status==0){
							this.mes.successMessage('删除成功');
							this.getData();
						}
						else{
							this.mes.errorMessage(res1.data.message);
							this.mes.errorMessage(res2.data.message);
						}
					}))
				}).catch(() => {
					this.mes.promptMessage('已取消'); 
				});					
			},
			handleREBeforeUpload(file){
				if(!(file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
		    		 this.mes.errorMessage('请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片!');
		             return false;
			    }
		        if (!(file.size / 1024 / 1024 < 2)) {
		            this.mes.errorMessage('上传头像图片大小不能超过 2MB!');
		            return false;
		        }
		        if(!(file.name.indexOf('index')!=-1)){
		        	this.mes.errorMessage('上传的头像图片命名必须包含index');
		        	return false;
		        }
				if(this.form1.recommendImg==''){
					return this.mes.errorMessage('图片为空');
				}
				this.axios.post('api/upload/platingDel',{username:this.form1.recommendImg}).then(response=>{
					if(response.data.status==0){
					}
					else{
						return this.mes.errorMessage(response.data.message);
					}
				});
			},
			handleReSuccess(response,file,fileList){
				this.form1.recommendImg=response.data;
			},
			handleBeforeUpload(file){

				if(!(file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
		    		 this.mes.errorMessage('请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片!');
		             return false;
			    }
		        if (!(file.size / 1024 / 1024 < 2)) {
		            this.mes.errorMessage('上传头像图片大小不能超过 2MB!');
		            return false;
		        }
		        if(!(file.name.indexOf('index')!=-1)){
		        	this.mes.errorMessage('上传的头像图片命名必须包含index');
		        	return false;
		        }
			},
		    handleSuccess(response,file,fileList){
		    	this.form.recommendImg=response.data;
		    },
			onEdit(){
				this.axios.post('api/admin/updateRecommend',{token:localStorage.token,username:localStorage.username,id:localStorage._id,recommendScr:this.form1.recommendScr,
					recommendImg:this.form1.recommendImg,recommendTitle:this.form1.recommendTitle,recommendId:this.form1._id}).then(response=>{
						if(response.data.status==1){
							return this.mes.errorMessage(response.data.message);
						}
						else{
							this.mes.successMessage('修改成功');
							this.dialogFormVisible=false,
							this.getData();
						}
					})
			},
			onSubmit(){
				if(this.form.recommendImg==''){
					return this.mes.errorMessage('照片未上传成功');
				}
				this.axios.post('api/admin/addRecommend',{token:localStorage.token,username:localStorage.username,id:localStorage._id,recommendScr:this.form.recommendScr,recommendImg:this.form.recommendImg,recommendTitle:this.form.recommendTitle}).then(response=>{
						if(response.data.status==1){
							return this.mes.errorMessage(response.data.message);
						}
						else{
							this.mes.successMessage('添加成功');
							this.getData();
							this.form={
								recommendScr:'',
								recommendImg:'',
								recommendTitle:''
							}

						}
					})

			}


		}

	}
</script>

<style lang="scss">
		.avatar-uploader {
		    border: 1px dashed #d9d9d9;
		    border-radius: 6px;
		    cursor: pointer;
		    position: relative;
		    overflow: hidden;
		    width: 120px;
		    height: 60px;
		    &:hover{
		    	border-color: #409EFF;

		    }
		}
		.avatar{
			width:120px;
			height:60px;
		}
		.avatar-uploader-icon {
		    font-size: 28px;
		    color: #8c939d;
		    width: 120px;
		    height: 60px;
		    line-height: 60px;
		    text-align: center;
		}
</style>>
<style scoped lang="scss">
.main{
	padding:10px;
	h2{
		margin-bottom:10px;

	}
	.right{
		h3{
			margin:10px 0px;
		}
	}

}
</style>