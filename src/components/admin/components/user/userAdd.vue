<template>
	<div class="btn-form">
		<h2>添加用户</h2>
		<el-form ref="form" :model="form" label-width="85px" size="mini">
			<el-form-item label="头像">
			    <el-upload class="avatar-uploader" name="file" action="api/upload/user" :before-upload="handleBeforeUpload" :on-success="handleSuccess" >
				    <img v-if="form.userImg" :src="form.userImg" class="avatar">
				    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>

				<span v-if="form.userImg">点击更换头像</span>
				<span v-else>点击添加头像</span>
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
			<el-form-item label="用户状态" >
				<el-row type="flex" justify="start" :gutter="50">
					<el-col :span="10">
						<el-form-item label="是否管理员" >
							<template>
								<el-radio-group v-model="form.userAdmin" >
									<el-radio   :label="true">是</el-radio>
									<el-radio   :label="false">否</el-radio>
								</el-radio-group>
							</template>
					    </el-form-item>

					</el-col>
					<el-col :span="10">
						<el-form-item label="账户状态" >
					     	<template>
					     		<el-radio-group  v-model="form.userStop">
									<el-radio   :label="true">封停</el-radio>
									<el-radio   :label="false">正常</el-radio>
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
			    <el-button type="primary" @click="onSubmit">添加新用户</el-button>
			    <el-button type="primary" @click="onRest">取消</el-button>
			 </el-form-item>
		</el-form>

	</div>
</template>
<script>
	export default{
		name:'userAdd',
		data(){
			return{
				form: {
				 	userImg:'',
				 	userMail:'',
				 	username:'',
				 	password:'',
				 	userPhone:'',
				 	userCity:'',
				 	userMotto:'',
				 	userAdmin:'',
				 	userStop:'',
				 	userDescription:'',
				 	userLabel:''
			        },
			}
		},
		created(){
			
		},
		methods:{
		    handleSuccess(response,file,fileList){
		    	this.form.userImg=response.data;
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
		        if(!(file.name.indexOf('user')!=-1)){
		        	this.mes.errorMessage('上传的头像图片命名必须包含user');
		        	return false;
		        }
		    },
		    onSubmit(){
		    	if(this.form.username==''||this.form.password==''||this.form.userMail==''){
		    		return this.mes.errorMessage('用户名、手机号、密码不能为空');
		    	}
		    	this.axios.post('api/admin/register',this.form).then(response=>{
		    		if(response.data.status==1){
		    			return this.mes.errorMessage(response.data.message);
		    		}
		    		else{
		    			this.mes.successMessage(response.data.message);
		    			this.onRest();
		    		}
		    	});

		    },
		    onRest(){
		    	this.form ={
				 	userImg:'',
				 	userMail:'',
				 	username:'',
				 	password:'',
				 	userPhone:'',
				 	userCity:'',
				 	userMotto:'',
				 	userAdmin:'',
				 	userStop:'',
				 	userDescription:'',
				 	userLabel:''
			        };
		    }

		}

	}
</script>
<style  lang="scss">

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
</style>