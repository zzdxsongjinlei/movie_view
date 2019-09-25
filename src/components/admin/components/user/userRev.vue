<template>
	<div>
		<div class="main"  v-if="flag">
			<div class="btn">
				<router-link :to="{path:'/adminPage/user/userManage/userAdd'}"><el-button size="mini" type="primary"> 添加用户</el-button></router-link><router-link :to="{path:'/adminPage/user/userAll'}"><el-button size="mini" type="primary"> 全部用户</el-button></router-link>
				<el-input v-model="search" size='mini' placeholder="输入姓名进行查找" style="width:200px;" suffix-icon="el-icon-search" />
			</div>

			<el-table ref="multipleTable" :data="userList.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))" style="width: 100%"  border @selection-change="handleSelectionChange" highlight-current-row >
					<el-table-column type="selection" align="center"></el-table-column>
					<el-table-column prop="userImg" label="头像" width="60" align="center">
						<template slot-scope="scope">
							<img :src="scope.row.userImg" style="width:30px;">
						</template> 
					</el-table-column>
				    <el-table-column label="用户名"  width="100" align="center">
				    	<template slot-scope="scope">
				    		<el-tag size="medium">
				    			{{scope.row.username}}
				    		</el-tag>
				    	</template>
				     </el-table-column>
				     <el-table-column prop="userMail" label="邮箱" align="center"></el-table-column>
				    <el-table-column prop="userCity" label="地址" align="center" width="100"> </el-table-column>
				    <el-table-column label="注册时间" :sortable="true" :sort-method="sortByDate" align="center"> 
				    	<template slot-scope="scope">
				    		<i class="el-icon-time"></i>
				    		<span style="margin-left:10px">{{scope.row.userJoinTime| forMatTime}}</span>
				    	</template>
				    </el-table-column>
				    <el-table-column label="管理员"  prog="userAdmin" :filters="[{text:'是',value:true},{text:'否',value:false}]" :filter-method="filterAdmin" filter-placement="bottom-end" align="center" width="100">
				    	<template slot-scope="scope">
				    		<el-tag size="medium" :type="scope.row.userAdmin===true ?'primary' :'success'" disable-transitions>{{scope.row.userAdmin|formatAdmin}}</el-tag>
				    	</template> 
				    
				    </el-table-column>

				    <el-table-column  label="账户状态" prog="userStop" :filters="[{text:'正常',value:false},{text:'封停',value:true}]" :filter-method="filterStop" filter-placement="bottom-end" align="center" width="100"> 
						<template slot-scope="scope">
							<el-tag size="medium" :type="scope.row.userStop===true ?'danger':'primary'">{{scope.row.userStop|formatStop}}</el-tag>
						</template>
				    </el-table-column>
				    <el-table-column label="操作" align="center">
				    	<template slot-scope="scope">
					        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					    </template>
				    	
				    </el-table-column>
		    </el-table>
		    <div class="pagination">
		    	<el-button type="danger"  @click="handleDeleteAll" >删除所选</el-button>

		    	<el-pagination  @current-change="handleCurrentChange" :page-size="pagesize" layout="total, prev, pager, next" :total="user.length"></el-pagination>
		    </div>	
		</div>
		<div class="btn-form" v-else>
			<el-form ref="form" :model="form" label-width="85px" size="mini">
				<el-form-item label="头像">
				    <el-upload class="avatar-uploader" name="file" action="api/upload/user" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					    <img v-if="form.userImg" :src="form.userImg" class="avatar">
					    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<span>点击更换头像</span>
				</el-form-item>

				<el-row type="flex" justify="start" :gutter="50">
					<el-col :span="10">
						<el-form-item label="邮箱" >
				    		<el-input v-model="form.userMail" ></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="10">
						<el-form-item label="密码">
							<el-input v-model="form.password" ></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row type="flex" justify="start" :gutter="50">
					<el-col :span="10">
						<el-form-item label="用户名">
				    		<el-input v-model="form.username"></el-input>
				    		<span>限制在6个字符以上</span>
						</el-form-item>
					</el-col>
					<el-col :span="10">
						<el-form-item label="手机">
				    		<el-input v-model="form.userPhone"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="城市">
				    <el-input v-model="form.userCity"></el-input>
				</el-form-item>
				<el-form-item label="铭言">
				    <el-input v-model="form.userMotto"></el-input>
				</el-form-item>
				<el-form-item label="注册时间" >
				    <el-input v-model="form.userJoinTime" disabled></el-input>
				    <span>注册时间不能进行更改</span>
				</el-form-item>
				<el-form-item label="用户状态" >
					<el-row type="flex" justify="start" :gutter="50">
						<el-col :span="10">
							<el-form-item label="是否管理员" >
								<template>
									<el-radio-group v-model="form.userAdmin" >
										<el-radio  :label="true">是</el-radio>
										<el-radio  :label="false">否</el-radio>
									</el-radio-group>
								</template>
						    </el-form-item>

						</el-col>
						<el-col :span="10">
							<el-form-item label="账户状态" >
						     	<template>
						     		<el-radio-group v-model="form.userStop" >
										<el-radio :label="true" >封停</el-radio>
										<el-radio :label="false">正常</el-radio>
									</el-radio-group>
								</template>
						     	
						    </el-form-item>
						</el-col>
					</el-row>  
				</el-form-item>
				<el-form-item label="简介">
				    <el-input type="textarea" v-model="form.userDescription"></el-input>
				</el-form-item>
				<el-form-item label="标签">
				    <el-input v-model="form.userLabel"></el-input>
				</el-form-item>
				<el-form-item>
				    <el-button type="primary" @click="onSubmit">更新</el-button>
				 </el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	export default{
		name:'userRev',
		data(){
			return{
		        user:[],
		        search:'',
		        pagesize:10,
		        userList:[],
		        multipleSelection: [],
		        flag:true,
		        form: {
				 	userImg:'',
				 	userMail:'',
				 	username:'',
				 	password:'',
				 	userPhone:'',
				 	userCity:'',
				 	userMotto:'',
				 	userJoinTime:'',
				 	userAdmin:'',
				 	userStop:'',
				 	userDescription:'',
				 	userLabel:''
			        },

			}
		},
		created(){
			this.getData();
			
		},
		filters:{
			formatAdmin(value){
				if(value){
					return '是';
				}
				else{
					return '否';
				}
			},
			formatStop(value){
				
				if(value){
					return '封停';
				}
				else{
					return '正常';
				}

			}

		},
		methods:{
			sortByDate(obj1,obj2){
				return obj1.userJoinTime-obj2.userJoinTime;
			},
			filterAdmin( value,row){
				return row.userAdmin===value;
			},
			filterStop(value,row){
				return row.userStop===value;
			},
			handleCurrentChange(val){
				this.getuserList(val,this.pagesize);
			},
			handleSelectionChange(val) {
		        this.multipleSelection = val;
		    },
		    handleAvatarSuccess(response,file,fileList){
		    	this.form.userImg=response.data;
				this.axios.post('api/users/updateUser',{user_id:this.form._id,flay:6,userImg:response.data}).then(response=>{
					if(response.data.status==0){
						this.getData();
					}
				});
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
		        if(!(file.name.indexOf('user')!=-1)){
		        	this.mes.errorMessage('上传的头像图片命名必须包含user');
		        	return false;
		        }
				if(this.form.userImg==''){
					this.mes.errorMessage('图片为空');
					return false;
				}
				if(this.form.userImg.indexOf('default')==-1){
					this.axios.post('/api/upload/userDel',{username:this.form.userImg}).then(response=>{
			    		if(response.data.status==0){
			    		}
			    		else{
			    			this.mes.errorMessage(response.data.message);
			    		}
			    	});
				}
		    },
			getData(){
				let username=localStorage.username;
				let token=localStorage.token;
				let id=localStorage._id;
				this.axios.post('api/admin/showUser',{username:username,token:token,id:id}).then(response=>{
					this.user=response.data.data;
					this.getuserList(1,10);
				});
			},
			getuserList(page,pagesize){
				 this.userList=this.user.slice((page-1)*pagesize,page*pagesize);
			},
			handleEdit(index,row){
				this.flag=false;
				this.form=row;
			},
			handleDelete(index,row){
				this.$confirm('将删除这个用户, 是否继续?','温馨提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}).then(() => {

					if(row.userImg.indexOf('default')==-1){
						this.axios.all([
							this.axios.post('/api/upload/userDel',{username:row.userImg}),
							this.axios.post('api/admin/delUser',{username:localStorage.username,token:localStorage.token,id:localStorage._id,_id:row._id})
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
					}
					else{
						this.axios.post('api/admin/delUser',{username:localStorage.username,token:localStorage.token,id:localStorage._id,_id:row._id}).then(response=>{
							if(response.data.status==0){
								this.mes.successMessage('删除成功');
								this.getData();
							}
							else{
								this.mes.errorMessage(response.data.message);
							}

						})

					}
				}).catch(() => {
					this.mes.promptMessage('已取消'); 
				});	
								
			},
			async handleDeleteAll(){
				if(this.multipleSelection.length==0){
					return this.mes.promptMessage('选择框未选择');
				}
				await this.$confirm('将删除所选的所有用户, 是否继续?','温馨提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}).then(() => {
					this.multipleSelection.forEach(o=>{

						if(o.userImg.indexOf('default')==-1){
							this.axios.all([
								this.axios.post('/api/upload/userDel',{username:o.userImg}),
								this.axios.post('api/admin/delUser',{username:localStorage.username,token:localStorage.token,id:localStorage._id,_id:o._id})
							]).then(this.axios.spread((res1,res2)=>{
								if(res1.data.status==0&&res2.data.status==0){
									this.mes.successMessage('删除成功');
								}
								else{
									this.mes.$errorMessage(res1.data.message);
									this.mes.$errorMessage(res2.data.message);
								}
							}))
						}
						else{
							this.axios.post('api/admin/delUser',{username:localStorage.username,token:localStorage.token,id:localStorage._id,_id:o._id}).then(response=>{
								if(response.data.status==0){
									this.mes.successMessage('删除成功');
									this.getData();
								}
								else{
									this.mes.errorMessage(response.data.message);
								}

							})
						}
						
					});
					this.getData();
					
				}).catch(() => {
					this.mes.promptMessage('已取消'); 
				});	
			},
			onSubmit(){
				if(this.form.username==''||this.form.userPhone==''){
					return this.mes.promptMessage('用户名和邮箱不能为空');
				}
				let sendData=this.form;
				this.axios.post('api/admin/updateUser',sendData).then(response=>{
					if(response.data.status==0){
						this.mes.successMessage('更新成功');
						this.getData();
						this.flag=true;
					}
					else{
						this.mes.errorMessage(response.data.message);
					}
				});
			}

		}

	}
</script>
<style  lang="scss">


.main{
		padding:10px 10px 0px 10px;
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
		.el-table td,.el-table th{
			padding:2px;
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
.btn-form{
	padding:10px 10px 0px 10px;
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
		    height: 60px;
		    &:hover{
		    	border-color: #409EFF;

		    }
		}
		.avatar{
			width:60px;
			height:60px;
		}
		.avatar-uploader-icon {
		    font-size: 28px;
		    color: #8c939d;
		    width: 60px;
		    height: 60px;
		    line-height: 60px;
		    text-align: center;
		}
	}
}
		
}
</style>