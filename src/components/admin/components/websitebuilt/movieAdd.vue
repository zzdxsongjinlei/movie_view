<template>
	<div class="main">
		<h3>添加电影</h3>
		<el-form ref="form" label-width="100px" size="mini" :model="form">
			<el-form-item label="宣传海报">
			    <el-upload class="avatar-uploader" name="file" action="api/upload/movie"  :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" >
			    	<img v-if="form.movieImg" :src="form.movieImg" class="avatar" />
				    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<span v-if="form.movieImg">点击更换宣传海报</span>
				<span v-else>点击添加宣传海报</span>
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
						<el-date-picker v-model="form.movieShowTime" type="datetime"placeholder="选择上映时间">
    					</el-date-picker>
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
				<el-button type="primary" size="mini" @click="onSubmit">
					提交
				</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	export default{
		name:'movieAdd',
		data(){
			return{
				form:{
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
			
		},
		methods:{
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

			},
			onSubmit(){
				this.axios.post('api/admin/movieAdd',{
					username:localStorage.username,
					token:localStorage.token,
					id:localStorage._id,
					...this.form
					// movieImg:this.form.movieImg,
					// movieName:this.form.movieName,
					// movieDirector:this.form.movieDirector,
					// movieWrite:this.form.movieWrite,
					// movieActor:this.form.movieActor,
					// movieDuration:this.form.movieDuration,
					// movieShowTime:this.form.movieShowTime,
					// movieTopic:this.form.movieTopic,
					// movieCountry:this.form.movieCountry,
					// movieVideo:this.form.movieVideo,
					// movieDownload:this.form.movieDownload,
					// movieDetail:this.form.movieDetail
				}).then(response=>{
					if(response.data.status==1){
						return this.mes.errorMessage(response.data.message);
					}
					else{
						this.mes.successMessage('添加成功');
						this.form={
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

				});

			}

		}

	}
</script>
<style lang="scss">
.main{
	.avatar-uploader {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	    width: 60px;
	    height: 120px;
	    &:hover{
	    	border-color: #409EFF;
	    }
	}
	.avatar{
		width:60px;
		height:120px;
	}
	.avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 60px;
	    height: 120px;
	    line-height: 60px;
	    text-align: center;
	}

}

</style>
<style scoped lang="scss">
.main{
	width:80%;
	margin:5px auto 0px auto;
	h3{
		margin-bottom:5px;
	}
}
</style>