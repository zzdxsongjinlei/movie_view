<template>
	<div class="container">
		<div>
			<movie-index-header/>
		</div>
		<div class="contentMain">
			<el-row :gutter="40">
				<el-col :span="18" class="article">
					<div class="content">
						<div class="article_title">					
							<h2>
								{{list.articleTitle}}
							</h2>
							<p>
								<span>
									<i class="el-icon-thumb"></i>{{list.articleNumSuppose}}
								</span>
								<span>话题:
									<router-link :to="{path:'/topic/'+list.articleTopic}">{{list.articleTopic}}</router-link>
								</span>
							</p>
						</div>
						<div class="article_user">
							<img :src="user.userImg">
							<span>
								<router-link :to="{path:'/userInfo/'+user._id}">{{user.username}}
								</router-link> {{user.userMotto}}
							</span>
							<span>发布于: {{list.articleTime |forMatTime}}</span>
						</div>
						<div class="article_context"  v-html="list.articleContext">
						</div>
					</div>
					<div class="article_post">
						<article-comment :article_id="article_id"   @commentSuc="listenerComment" @supportSuc="listenerSupport" />
					</div>
					
					<div class="article_comment">
						<h2>{{list.articleTitle}}短评</h2>
						<comment :article_id="article_id" :flag="flag" />
					</div>
				</el-col>
				<el-col :span="6" class="user">
					<div class="user_info">
						<img :src="user.userImg">
						<div>
							<p>
								<router-link :to="{path:'/userInfo/'+user._id}">
									{{user.username}}
								</router-link>
								{{user.userCity}}
							</p>

							<p>{{user.userDescription}}</p>
						</div>
						
					</div>
					<div class="other_article">
						<div class="pagination">
							<h2>作者的其他文章</h2>	
							<el-pagination small layout="prev, pager, next" :total="Number(article_user_num)" :page-size="5" @current-change="articleUserChange">		
							</el-pagination>						
						</div>
						<news-list :list="article_list" />					
					</div>
					<div class="hot_article">
						<div class="pagination">
							<h2>热门文章</h2>		
							<el-pagination small layout="prev, pager, next" :total="article_hot_num" :page-size="5" @current-change="articleHotChange">		
							</el-pagination>						
						</div>
						<news-list :list="article_hot_list" />	
					</div>
					<div class="hot_topic">
						<h2>热门话题</h2>	
						<div>
							<span v-for="item in article_topic">
								<router-link :to="{path:'/topic/'+item}">{{item}}</router-link>
							</span>
						</div>				
					</div>
				</el-col>
			</el-row>	
		</div>
		<div >
			<common-footer/>
		</div>
	</div>
	
</template>
<script>
	import MovieIndexHeader from '../components/MovieIndexHeader.vue';
	import Comment from '../components/Comment.vue';
	import CommonFooter from '../components/CommonFooter.vue';
	import ArticleComment from '../components/ArticleComment.vue';
	import NewsList from '../components/NewsList.vue';
	import {mapState} from 'vuex';
	export default{
		name:'newDetail',
		data(){
			return{
				article_id:'',
				user:'',
				flag:1
			}
		},
		created(){
			this.article_id=this.$route.params.id;
			this.getData();
		},
		beforeRouteUpdate(to,from,next){
			this.article_id=to.params.id;
			this.getData();
			next();
		},
		methods:{
			getData(){
				this.$store.commit('article/getArticle',{article_id:this.article_id});
				this.$store.commit('article/getUserArticle',{articleUserId:this.list.articleUserId});
				this.$store.commit('article/setHotArticle');
				this.$store.commit('article/setTopic');
				this.$store.commit('article/setUserArticleList',{page:1,page_size:5});
				this.$store.commit('article/setHotArticleList',{page:1,page_size:5});
				this.axios.post('/api/showUser',{user_id:this.list.articleUserId}).then(res=>{
					this.user=res.data.data[0];	
				});
			},
			//作者文章换页
			articleUserChange(val){
				this.$store.commit('article/setUserArticleList',{page:val,page_size:5});
			},
			//文章热点换页
			articleHotChange(val){
				this.$store.commit('article/setHotArticleList',{page:val,page_size:5});
			},
			//监听子组件
			listenerComment:function(){
    			this.flag++;
    		},
    		//监听子组件
    		listenerSupport(){
    			this.list.articleNumSuppose++;
    		}
		},
		computed:{
			...mapState('article',{
				list:(state)=>state.article_detail[0],
				article_user_num:(state)=>state.article_user.length,
				article_list:(state)=>state.article_user_list,
				article_hot_num:(state)=>state.article_hot.length,
				article_hot_list:(state)=>state.article_hot_list,
				article_topic:(state)=>state.article_topic			
			})
		},
		components:{
			MovieIndexHeader,
			Comment,
			CommonFooter,
			ArticleComment,
			NewsList
		}
	}
</script>
<style lang="scss" scoped>
@import '../style/base/_base.scss';
	.container{
		width:100%;
		margin:0 auto;
		.contentMain{
			width:80%;
			margin:100px auto;
			.article{
				.content{
					.article_title{
						overflow:hidden;
						h2{
							float:left;
						}
						p{
							float:right;
							margin-top:10px;
							span{
								font-size:13px;
								margin-right:30px;
								color:#666;
								&:first-child{
									i{
										margin-right:5px;
									}
								}
								&:last-child{
									a{
										@include base_link;
									}
								}
							}
						}

					}
					.article_user{
						margin-top:10px;
						font-size:12px;
						overflow:hidden;
						span{
							display:inline-block;
							margin-left:10px;
							color:#666;
							&:last-child{
								float:right;
								margin-right:30px;
							}	
						}
						img{
							width:30px;
							vertical-align:middle;
						}
						
					}
					.article_context{
						margin-top:20px;
						font-size:16px;
						p{
							text-indent:2px;
							line-height:30px;
						}
					}

				}
				.article_post{
					margin-top:10px;
				}
				.article_comment{
					h2{
						font-size:16px;
						color:#25b753;
						padding:10px 0px;
						margin-top:30px;
					}
					margin-top:20px;
					font-size:12px;
				}
			}
			.user{
				h2{
					font-size:16px;
					color:#25b753;
					padding:10px 0px;
				}
				.user_info{
					overflow:hidden;
					background:rgb(255,246,237);
					padding:18px 20px 40px 20px;
					font-size:13px;
					img{
						width:50px;
						float:right;
					}
					div{
						margin-right:60px;
						p{
						line-height:21px;
						color:rgb(170,170,170);
							a{
								text-decoration:none;
								color:rgb(51,119,170);
								margin-right:20px;
							}
						}

					}
				}
				.other_article{
					.pagination{
						@include base_el_pagination;
					}
					
				}
				.hot_article{
					div{
						span {
							margin-right:20px;
						}
					}
					.pagination{
						@include base_el_pagination;
					}

				}
				.hot_topic{
					>div{
						display:flex;
						flex-flow:row wrap;
						align-content:space-around;
						span{
							flex:0 0 55px;
							text-align:center;
							display:inline-block;
							margin-right:7px;
							padding:5px 0px;
							background:#ddd;
							margin-top:5px;
							a{
								font-size:13px;
							}
						}
					}


				}
			}
			
		}
	}

</style>














