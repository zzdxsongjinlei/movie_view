<template>
	<div>
			<li >
				<img :src="commentList.movieImg">
				<div class="comment">
					<p class="movie_name">
						<router-link :to="{path:'/movieDetail/'+commentList.movie_id}">{{commentList.movieName}}</router-link>
					</p>
					<p class="user">
						<span><router-link :to="{path:'/userInfo/'+commentList.user_id}">{{commentList.username}}</router-link></span>
						<span>评论于:{{commentList.commentTime|forMatTime}}</span>
					</p>
					<p class="comment_content">
						{{commentList.context}}
					</p>
					<p class="comment_btn">
						<span><i class="el-icon-thumb"></i>{{commentList.commentNumSuppose}}</span>
						<span><button>点赞</button></span>
					</p>
				</div>
				
				
			</li>
	</div>
</template>
<script>
	export default{
		data(){
			return{
			}
		},
		props:['commentList'],
		created(){
			
		},
		methods:{
			
		}
	}
</script>
<style lang="scss" scoped>
	li{
		list-style:none;
		padding:12px 15px;
		border-bottom:1px solid rgb(221,221,221);
		overflow:hidden;
		>img{
			height:120px;
			float:left;
			margin-right:20px;
		}
		.comment{
			p{
				margin-bottom:10px;
			}	
			.movie_name{
				a{      
					color:rgb(51,119,170);
					text-decoration:none;
					font-size:15px;
				}	
			}
			.user{
				color:rgb(102,102,102);
				font-size:13px;
				span{
					margin-right:5px;
					a{
						color:rgb(102,102,102);
						text-decoration:none;
						&:hover{
							background:rgb(51,119,170);
							color:#fff;
						}
					}

				}
				

			}
			.comment_content{
				font-size:13px;
				color:rgb(17,17,17);
				line-height:18px;

			}
			.comment_btn{
				font-size:13px;
				overflow:hidden;
				span{
					&:first-child{
						float:left;
						i{
							color:#edc72f;
							margin-right:5px;
						}

					}
					&:last-child{
						float:right;
						button{
							line-height:13px;
							padding:4px 10px;
							margin-right:10px;
							background:#edc72f;
							font-weight:bold;
							border-radius:4px;
						}

					}
				}

			}		
			
		}
	}
</style>