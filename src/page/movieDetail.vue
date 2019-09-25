<template>
	<div class="container">
		<div>
			<movie-index-header/>
		</div>
		<div class="contentMain">
			<el-row :gutter="60">
				<el-col :span="16">
					<div class="content">
						<div class="movie_title">
							<h2>{{list.movieName}}</h2>
						</div>
						<div class="detail">
							<div class="movie_img">
								<img :src="list.movieImg" >
							</div>
							<div class="movie_detail">
								<p>导演: 
									<span><router-link to="">{{list.movieDirector}}</router-link></span>
								</p>
								<p>编剧: 
									<span><router-link to="">{{list.movieWrite}}</router-link></span>
								</p>
								<p>演员: 
									<span><router-link to="">{{list.movieActor}}</router-link></span>
								</p>
								<p>制片国家/地区: 
									<span>{{list.movieCountry}}</span>
								</p>
								<p>上映日期: 
									<span>{{list.movieShowTime | forMatDate}}</span>
								</p>
								<p>片长时间: 
									<span>{{list.movieDuration}}</span>
								</p>
							</div>
							<div class="comment_detail">
								<p>
									豆瓣评分:
									<span>
										<el-rate  v-model="list.movieMark" disabled show-score text-color="#ff9900" >
										</el-rate>

									</span>
								</p>
								<p>
									想看:<span>{{list.movieNumWantSee}}</span>
								</p>
								<p>
									下载:<span>{{list.movieNumDownload}}</span>
								</p>
								<p>
									支持:<span>{{list.movieNumSuppose}}</span>
								</p>
							</div>
						</div>

						<div class="download_detail">	
							<download-detail :movie_id="movie_id" @commentSuc="listenerComment" @supportSuc="getData" @wantseeSuc="getData" @downloadSuc="getData" />
						</div>

						<div class="story_detail">
							<h3>{{list.movieName}}剧情简介......</h3>
							<p>{{list.movieDetail}}</p>
						</div>
						<div class="comment_detail">
							<h3>{{list.movieName}}的短评......</h3>
							<comment :movie_id="movie_id" :flag="flag" />
						</div>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="side">
						<div class="movie_buy">
							<button @click="btnBuy">购票</button>
						</div>
						
					</div>
					
				</el-col>
			</el-row>		
		</div>
		<div>
			<common-footer/>
		</div>
	</div>
	
</template>
<script>
	import MovieIndexHeader from '../components/MovieIndexHeader.vue';
	import Comment from '../components/Comment.vue';
	import CommonFooter from '../components/CommonFooter.vue';
	import DownloadDetail from '../components/DownloadDetail.vue';
    export default{
    	name:'moviedetail',
    	data(){
    		return {
    			list:'',
    			movie_id:'',
    			flag:1
    		}
    	},
    	created(){
    		this.movie_id=this.$route.params.id;
    		this.getData();	
    	},
    	methods:{
    		getData:function(){
    			//电影详情
	    		this.axios.post('api/movieDetail',{movie_id:this.movie_id}).then(response=>{
	    			this.list=response.data.data;
	    		});
    		},
    		listenerComment:function(){
    			this.flag++;
    		},
    		btnBuy(){
    			this.$router.push({path:'/movieBuy'})
    		}

    	},
    	components:{
    		MovieIndexHeader,
    		Comment,
    		CommonFooter,
    		DownloadDetail
    	}
    }
</script>
<style scoped lang="scss">
@import '../style/base/_base.scss';
.container{
	width:100%;
	margin:0 auto;
	.contentMain{
		width:1150px;
		margin:100px auto;
		.content{
			display:flex;
			flex-direction:column;
			justify-content:space-between;
			.movie_title{
				flex:0 1 70px;
				h2{
					font-size:26px;
					color:rgb(73,73,73);
				}
			}
			.detail{
				flex:0 1 auto;
				display:flex;
				flex-flow:row nowrap;
				.movie_img{
					flex:0 1 150px;
					img{
						width:150px;
					}
				}
				.movie_detail{
					flex:0 1 auto;
					margin:0px 20px;
					p{
						margin-bottom:10px;
						font-size:13px;
						color:#666;
						span{
							color:#111;
							a{
								@include base_link;
							}
						}
					}
				}
				.comment_detail{
					flex:0 1 200px;
					border-left:1px solid #ddd;
					padding-left:20px;
					p{
						font-size:13px;
						color:#666;
						margin-top:10px;
						span{
							color:#111;
							margin-left:7px;
						}
					}
				}
			}
			.download_detail{
				flex:0 1 auto;
				margin:15px 0px;
				

			}
			.story_detail{
				margin:15px 0px;
				flex:0 1 auto;
				h3{
					font-size:16px;
					color:rgb(0,119,34);
					margin-bottom:15px;
				}
				p{
					font-size:13px;
					color:rgb(13,13,13);
					line-height:21px;
				}

			}
			.comment_detail{
				margin:15px 0px;
				flex:0 1 auto;
				h3{
					font-size:16px;
					color:rgb(0,119,34);
					margin-bottom:15px;
				}
			}	
		}
		.side{
			margin-top:70px;
			width:100%;
			.movie_buy{
				width:100%;
				padding:20px 0px;
				background:#ddd;
				text-align:center;
				button{
					padding:5px 50px;
					color:#fff;
					font-size:14px;
					background:#356eee;
				}

			}
		}
	}
}
</style>


























































