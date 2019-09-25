<template>
	<div class="downloaddetail">
		<p class="download">
			<button @click="support" :disabled="isSupposeDisable">点赞</button>
			<span> 评价:<el-rate v-model="commentmark" show-text> </el-rate>
			</span>
		</p>
		<p class="write">
			<span>
				<i class="el-icon-chat-dot-square"></i>
				<span @click="review">写评论</span>
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
				commentmark:null,
				isSupposeDisable:false
			}
		},
		props:['article_id'],
		created(){
		},
		methods:{
			review:function(){
				this.showstatus=true;
				this.title='写短评';
			},
			issue:function(){
				this.showstatus=true;
				this.title='提问题';
			},
			share:function(){
			},
			//发送评论
			sendComment:function(){
				if(this.commentmark==''){
					return this.mes.promptMessage('评分不能为空');
				}
				if(this.context==''){
					return this.mes.promptMessage('评论不能为空');
				}
				if(localStorage.username){
					let send_data={
						article_id:this.article_id,
						context:this.context,
						username:localStorage.username,
						movieMark:this.commentmark
					};
					this.axios.post('api/users/postComment',send_data).then(response=>{
						if(response.data.status==0){
							this.showstatus=false;
							this.commentmark=null;
							this.context='';
							this.mes.promptMessage('评论成功');
							//触发父组件
							this.$emit('commentSuc');

						}
						
					});
				}
				else{
					this.mes.promptMessage('未登陆，2秒后调转登陆界面');
					setTimeout((o)=>{this.route.push({path:'/loginPage'});},2000);
				}

				
			},
			//点赞
			support:function(){
				console.log('11');
				console.log(this.article_id);
				console.log('22');
    			this.axios.post('api/users/support',{article_id:this.article_id}).then(response=>{
    				if(response.data.status==0){	
    					this.mes.successMessage('点赞成功');
    					//触发父组件
    					this.$emit('supportSuc');
    					this.isSupposeDisable=true;
    				}
    				else{
    					this.mes.promptMessage(response.data.message);
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