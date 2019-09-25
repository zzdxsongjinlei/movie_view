<template>
	<div class="downloaddetail">
		<p class="download">
			<button @click="movieDownload" :disabled="isDownloadDisable">下载</button>
			<button @click="support"  :disabled="isSupposeDisable">点赞</button>
			<button @click="wantsee" :disabled="isWantseeDisable">想看</button>
			<span> 评价:<el-rate v-model="commentmark" show-text> </el-rate>
			</span>
		</p>
		<p class="write">
			<span>
				<i class="el-icon-chat-dot-square"></i>
				<span @click="review">写短评</span>
			</span>
			<span>
				<i class="el-icon-edit"></i>
				<span @click="film">写影评</span>
			</span>
			<span>
				<i class="el-icon-plus"></i>
				<span @click="issue">提问题</span>
			</span>
			<span>
				<span @click="share">分享到</span>
			</span>
		</p>
		<div class="comment" v-show="showstatus">
			<h3>{{title}}</h3>
			<el-input style="width:80%" type="textarea" placeholder="内容" v-model="context"></el-input>
			<el-button @click="sendComment"> 评论</el-button>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				showstatus:false,
				title:'',
				context:'',
				commentmark:'',
				username:'',
				isSupposeDisable:false,
				isWantseeDisable:false,
				isDownloadDisable:false
			}
		},
		props:['movie_id'],
		created(){
		},
		methods:{
			review:function(){
				this.showstatus=true;
				this.title='写短评';
			},
			film:function(){
				this.showstatus=true;
				this.title='写影评';
			},
			issue:function(){
				this.showstatus=true;
				this.title='提问题';
			},
			share:function(){
			},
			sendComment:function(){
				if(this.commentmark==''){
					return this.mes.errorMessage('评分不能为空');
				}
				if(this.context==''){
					return this.mes.errorMessage('评论不能为空');
				}
				if(localStorage.username){
					let send_data={
						movie_id:this.movie_id,
						context:this.context,
						movieMark:this.commentmark,
						username:localStorage.username
					}
					this.axios.post('api/users/postComment',send_data).then(response=>{
						if(response.data.status==0){
							this.commentmark='';
							this.showstatus=false;
							this.context='';
							this.mes.successMessage('评论成功');
							this.$emit('commentSuc');
						}
					});
				}
				else{
					setTimeout(()=>this.$route.push({path:'/loginPage'}),2000);
					return this.mes.promptMessage('请先进行登陆，2秒后跳转登陆界面');
				}
			},
			support:function(){
    			this.axios.post('api/users/support',{movie_id:this.movie_id}).then(response=>{
    				if(response.data.status==0){	
    					this.mes.successMessage('点赞成功');
    					this.$emit('supportSuc');
    					this.isSupposeDisable=true;
    				}
    			});
    		},
    		wantsee:function(){
    			this.axios.post('api/users/wantsee',{movie_id:this.movie_id}).then(response=>{
    				if(response.data.status==0){
    					this.mes.successMessage('操作成功');
    					this.$emit('wantseeSuc');
    					this.isWantseeDisable=true;
    				}
    			});
    		},
    		movieDownload:function(){
    			this.axios.post('api/users/download',{movie_id:this.movie_id}).then(response=>{
    				if(response.data.status==0){
    					this.mes.successMessage('下载成功，只会增加下载条数');
    					this.$emit('downloadSuc');
    					this.isDownloadDisable=true;
						setTimeout(()=>{
							window.location=res.data.data.movieDownload;
						},20000)
    						
    				}

    			});
    		}
		}

	}
</script>
<style lang="scss" scoped>
@import '../style/base/_base.scss';
.downloaddetail{
	p{
		margin-bottom:10px;
		font-size:12px;
	}
	.download{
		button{
			@include base_button;
		}
		span{
			line-height:22px;
			height:22px;
			.el-rate{
				margin-left:10px;
				display:inline-block;
			}
		}

	}
	.write{
		>span{
			margin-right:10px;
			span{
				color:rgb(51,119,170);
				font-weight:bold;
				&:hover{
					color:#fff;
					background:rgb(51,119,170);
					cursor:pointer;
				}
			}
			i{
				margin-right:5px;
			}
		}

	}
	.comment{
		h3{
			font-size:16px;
			color:rgb(0,119,34);
			margin-top:30px;
			margin-bottom:15px;
		}
		button{
			display:block;
			margin-top:10px;
			margin-left:80px;
		}
	}

}
</style>