<template>
	<div class="comments">
		<div v-if="commentList==undefined||commentList.length<=0 ? false:true">	
			<li  v-for="(item ,key) in commentList" :key="key" >
				<div class="user-info">
					<img :src="item.userImg">
					<p class="user">
						<span><router-link :to="{path:'/userInfo/'+item.user_id}">{{item.username}}</router-link></span><br>
						<span>发布于:{{item.commentTime|forMatTime}}</span>
					</p>
					<p class="suppose">
						<i class="el-icon-thumb" @click="commentSuppose(item._id)"></i>
						{{item.commentNumSuppose}}
					</p>					
				</div>
				<p>{{item.context}}</p>
			</li>
		</div>
		<div  v-else>暂无评论</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				commentList:[],
				isSupposeDisable:false
			}
		},
		props:['movie_id','article_id' ,'flag'],
		created(){
			this.getData();
		},
		watch:{
			article_id:function(newValue,oldValue){
				this.getData();
			},
			flag:function(newValue,oldValue){
				this.getData();
			}
		},
		methods:{
			getData(){
				let that=this;
				this.commentList=[];
				function userDetail(data){
					data.map((o)=>{
						that.axios.post('api/showUserByUserName',{username:o.username}).then(res=>{
							o.userImg=res.data.data[0].userImg;
							o.user_id=res.data.data[0]._id;
							that.commentList.push(o);
						});

					});
				}
				if(this.movie_id){
					this.axios.post('api/movie/commentMovie',{movie_id:this.movie_id}).then(response=>{
						userDetail(response.data.data);
					});
				}
				if(this.article_id){
					this.axios.post('api/movie/commentArticle',{article_id:this.article_id}).then(response=>{
						userDetail(response.data.data);
					});
				}	
			},
			commentSuppose(m_id){
				this.axios.post('api/movie/commentMovieUpdate',{_id:m_id}).then(response=>{
					this.getData();
				});
			}
		}
	}
</script>
<style lang="scss" scoped>
.comments{
	>div{
		margin-top:20px;
	}
	li{
		list-style:none;
		padding:12px 15px;
		border-top:1px solid rgb(221,221,221);
		&:last-child{
			border-bottom:1px solid rgb(221,221,221);
		}
		.user-info{
			overflow:hidden;
			img{
				float:left;
				width:50px;
				margin-right:15px;
			}
			p{
				font-size:13px;
				color:rgb(170,170,170);
			}
			.user{
				float:left;
				a{
					color:rgb(51,119,170);
					text-decoration:none;
				}	
			}
			.suppose{
				float:right;
				i{
					margin-right:10px;
					cursor:pointer;
					&:hover{
						color:rgb(51,119,170);
					}
				}
			}
		}
		>p{
			color:rgb(73,73,73);
			font-size:13px;
			margin-top:10px;
			padding-left:15px;
		}
	}
}
</style>