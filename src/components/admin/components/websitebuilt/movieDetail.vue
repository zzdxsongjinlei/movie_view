<template>
	<div>
		<div class="main" v-if="flag">
			<div class="btn">
				<router-link :to="{path:'/adminPage/websiteBuilt/movie/movieAdd'}"><el-button size="mini" type="primary"> 添加电影</el-button></router-link><router-link :to="{path:'/adminPage/websiteBuilt/movie/movieActivity'}"><el-button size="mini" type="primary"> 电影活动</el-button></router-link>
				<el-input v-model="search" size='mini' placeholder="输入电影名进行查找" style="width:200px;" suffix-icon="el-icon-search" />
			</div>

			<el-table ref="multipleTable" :data="moviesList.filter(data => !search || data.movieName.toLowerCase().includes(search.toLowerCase()))" style="width: 100%"  border  @selection-change="handleSelectionChange" >
					<el-table-column type="expand" label="其他" width="60">
						<template slot-scope="scope">
							<el-form label-position="left" inline  class="demo-table-expand">
								<el-form-item label="剧情简介">
									<span>{{scope.row.movieDetail}}</span>
								</el-form-item>
							</el-form>
						</template>
					</el-table-column>
					<el-table-column type="selection" align="center" width="40"></el-table-column>
					<el-table-column  label="海报" width="60" align="center">
						<template slot-scope="scope">
							<img :src="scope.row.movieImg" style="width:20px;">
						</template> 
					</el-table-column>
				    <el-table-column label="电影名"  prop="movieName" width="150" align="center">
				     </el-table-column>
				     <el-table-column label="电影导演"  prop="movieDirector" width="100" align="center">
				     </el-table-column>
				     <el-table-column label="电影演员"  prop="movieActor" width="200" align="center">
				     </el-table-column>
				     <el-table-column label="电影时常"  prop="movieDuration" width="100" align="center">
				     </el-table-column>
				     <el-table-column label="国家"   width="80" align="center">
				     	<template slot-scope="scope">
				     		<el-tag type="primary" size="mini">{{scope.row.movieCountry}}</el-tag>
				     	</template>
				     </el-table-column>
				    <el-table-column label="放映时间" :sortable="true" :sort-method="sortByDate" align="center"> 
				    	<template slot-scope="scope">
				    		<i class="el-icon-time"></i>
				    		<span style="margin-left:10px">{{scope.row.movieShowTime| forMatTime}}</span>
				    	</template>
				    </el-table-column>
				    <el-table-column label="操作"   width="180" align="center">
				     	<template slot-scope="scope">
				     		<el-button type="primary" size="mini" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
				     		<el-button type="danger" size="mini" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
				     	</template>
				     </el-table-column>
		    </el-table>

		     <div class="pagination">
			    	<el-button type="danger"  @click="handleDeleteAll" >删除所选</el-button>

			    	<el-pagination  @current-change="handleCurrentChange" :page-size="pagesize" layout="total, prev, pager, next" :total="movies.length"></el-pagination>
			</div>
		    
		</div>
		<div class="btn-form" v-else>
			<h2>修改电影信息</h2>
			<el-form ref="form1" label-width="100px" size="mini" :model="form">
				<el-form-item label="宣传海报">
				    <el-upload class="avatar-uploader" name="file" action="api/upload/movie"  :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" >
				    	 <img v-if="form.movieImg" :src="form.movieImg" class="avatar">
					    <i  v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<span>点击更改宣传海报</span>
				</el-form-item>

				<el-row type="flex" justify="start" :gutter="50">
					<el-col :span="10">
						<el-form-item label="电影名" >
				    		<el-input v-model="form.movieName" ></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="10">
						<el-form-item label="导演">
							<el-input v-model="form.movieDirector" ></el-input>
							<span>中间以“/”隔开</span>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row type="flex" justify="start" :gutter="50">
					<el-col :span="10">
						<el-form-item label="编剧">
				    		<el-input v-model="form.movieWrite"></el-input>
				    		<span>中间以“/”隔开</span>
						</el-form-item>
					</el-col>
					<el-col :span="10">
						<el-form-item label="演员">
				    		<el-input v-model="form.movieActor"></el-input>
				    		<span>中间以“/”隔开</span>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row type="flex" justify="start" :gutter="50">
					<el-col :span="10">
						<el-form-item label="电影时常">
				    		<el-input v-model="form.movieDuration"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="10">
						<el-form-item label="上映时间">
							<el-input v-model="form.movieShowTime"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row type="flex" justify="start" :gutter="50">
					<el-col :span="10">
						<el-form-item label="电影分类">
				    		<el-input v-model="form.movieTopic"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="10">
						<el-form-item label="片源地">
				    		<el-input v-model="form.movieCountry"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row type="flex" justify="start" :gutter="50">
					<el-col :span="10">
						<el-form-item label="电影视频地址">
				    		<el-input v-model="form.movieVideo"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="10">
						<el-form-item label="电影下载地址">
				    		<el-input v-model="form.movieDownload"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="电影剧情">
				    <el-input v-model="form.movieDetail" type="textarea"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="mini" @click="onEdit">
						更新
					</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	export default{
		name:'movieDetail',
		data(){
			return{
				movies:[],
				moviesList:[],
				pagesize:5,
				search:'',
				flag:true,
				multipleSelection: [],
				form:{
					_id:'',
					movieImg:'',
					movieName:'',
					movieDirector:'',
					movieWrite:'',
					movieActor:'',
					movieDuration:'',
					movieShowTime:'',
					movieTopic:'',
					movieCountry:'',
					movieVideo:'',
					movieDownload:'',
					movieDetail:''
				}

			}
		},
		created(){
			this.getData();	
		},
		methods:{
			getData(){
				this.axios.get('api/showRanking').then(response=>{
					this.movies=response.data.data;
					this.getmoviesList(1,this.pagesize);
				})
			},
			handleAvatarSuccess(response,file,fileList){
				this.form.movieImg=response.data;
			},
			beforeAvatarUpload(file){
				if(!(file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
		    		 this.mes.errorMessage('请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片!');
		             return false;
			    }
		        if (!(file.size / 1024 / 1024 < 2)) {
		            this.mes.errorMessage('上传头像图片大小不能超过 2MB!');
		            return false;
		        }
		        if(!(file.name.indexOf('movie')!=-1)){
		        	this.mes.errorMessage('上传的头像图片命名必须包含movie');
		        	return false;
		        }
				if(this.form.movieImg==''){
					return this.mes.errorMessage('没有图片');
				}
				this.axios.post('api/upload/movieDel',{username:this.form.movieImg}).then(response=>{
					if(response.data.status==0){
					}
					else{
						return this.mes.errorMessage(response.data.message);
					}
				})
			},
			handleEdit(index,row){
				this.flag=false;
				this.form=row;
			},
			onEdit(){
				this.axios.post('api/admin/movieUpdate',{
					token:localStorage.token,
					id:localStorage._id,
					username:localStorage.username,
					...this.form
				}).then(response=>{
					if(response.data.status==1){
						return this.mes.errorMessage(response.data.message);
					}
					else{
						this.flag=true;
						this.mes.successMessage('更新成功');
					}

				});

			},
			handleDelete(index,row){
				this.$confirm('将删除这个电影, 是否继续?','温馨提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}).then(() => {
					this.axios.all([
						this.axios.post('api/upload/movieDel',{username:row.movieImg}),
						this.axios.post('api/admin/movieDel',{username:localStorage.username,token:localStorage.token,id:localStorage._id,movieId:row._id})
					]).then(this.axios.spread((res1,res2)=>{
						if(res1.data.status==0&&res2.data.status==0){
							this.mes.successMessage('删除成功');
							console.log(res1);
							console.log(res2);
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
			getmoviesList(page,pagesize){
				 this.moviesList=this.movies.slice((page-1)*pagesize,page*pagesize);
			},
			handleSelectionChange(val){
				this.multipleSelection=val;
			},
			handleCurrentChange(val){
				this.getmoviesList(val,this.pagesize);
			},
			sortByDate(obj1,obj2){
				return obj1.movieShowTime-obj2.movieShowTime;
			},
			async handleDeleteAll(){
				if(this.multipleSelection.length==0){
					return this.mes.promptMessage('选择框未选择');
				}
				await this.$confirm('将删除所选的所有电影, 是否继续?','温馨提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}).then(() => {
					this.multipleSelection.forEach(o=>{
						this.axios.all([
							this.axios.post('api/upload/movieDel',{username:o.movieImg}),
							this.axios.post('api/admin/movieDel',{username:localStorage.username,token:localStorage.token,id:localStorage._id,movieId:o._id})
						]).then(this.axios.spread((res1,res2)=>{
							if(res1.data.status==0&&res2.data.status==0){
								this.mes.successMessage('删除成功');
								
							}
							else{
								this.mes.errorMessage(res1.data.message);
								this.mes.errorMessage(res2.data.message);

							}
						}))
						
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
.btn-form{
	padding:10px 10px 0px 10px;
	h2{margin-left:30px;}
	.el-form{
		width:75%;
		margin:0px auto;
		.el-form-item{
			margin-bottom:10px;
		}
		.avatar-uploader {
		    border: 1px dashed #d9d9d9;
		    border-radius: 6px;
		    cursor: pointer;
		    position: relative;
		    overflow: hidden;
		    width: 60px;
		    height: 80px;
		    &:hover{
		    	border-color: #409EFF;

		    }
		}
		.avatar{
			width:60px;

		}
		.avatar-uploader-icon {
		    font-size: 28px;
		    color: #8c939d;
		    width: 60px;
		    height:80px;
		    line-height: 80px;
		    text-align: center;
		}
	}
}
</style>