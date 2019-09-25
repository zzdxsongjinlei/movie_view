<template>
<div>
	<div class="container">
		<div>
			<movie-index-header/>
		</div>
		<div class="userMessage">
			<user-message/>
		</div>
		<div class="contentPic">
			<index-header-pic :list="indexPic" />
		</div>
		<div class="contentMain">
			<el-row :gutter="60">
				<el-col :span="14">
					<div class="show">
						<div class="pagination">
							<h2>正在上映</h2>
							<el-pagination small layout="prev, pager, next" :total="Number(getOnPage)" :page-size="5" @current-change="onChange" >
							</el-pagination>
						</div>
						<div class="onshow">
							<div  v-for="(item,key) in getOnMovieList" :key="key">
								<movie-list :list="item" />
							</div>
						</div>
					</div>
					<div class="show">
						<div class="pagination">
							<h2>将要上映</h2>
							<el-pagination small layout="prev, pager, next" :total="Number(getComingPage)" :page-size="5" @current-change="comingChange">	
							</el-pagination>
						</div>
						<div class="onshow">
							<div v-for="(item,key) in getComingMovieList" :key="key">
								<movie-list :list="item" />
							</div>
						</div>
					</div>
				</el-col>
				<el-col :span="10" class="news">
					<div class="pagination">
						<h2>文章区域</h2>
						<el-pagination small layout="prev, pager, next" :total="Number(getArticlePage)" :page-size="10" @current-change="articleChange">		
						</el-pagination>						
					</div>
					<news-list :list="getArticleList"/>
					<h2>网站公告</h2>
					<notice/>
				</el-col>
			</el-row>
		</div>
	</div>
	<div>
		<common-footer/>
	</div>
</div>
</template>
<script>
	import MovieIndexHeader from '../components/MovieIndexHeader.vue';
	import CommonFooter from '../components/CommonFooter.vue';
	import NewsList from '../components/NewsList.vue';
	import MovieList from '../components/MovieList.vue';
	import IndexHeaderPic from '../components/IndexHeaderPic.vue';
	import UserMessage from '../components/UserMessage.vue';
	import notice from '../components/notice.vue';
	import {mapMutations,mapState} from 'vuex'
	export default{
		name:'index',
		data(){
			return{
				indexPic:[],
			}
		},
		components:{
			MovieIndexHeader,
			CommonFooter,
			NewsList,
			MovieList,
			IndexHeaderPic,
			UserMessage,
			notice
		},
		created(){
			this.getData();		
		},
		methods:{
			getData(){
				this.$store.dispatch('movie/getData');
				this.$store.dispatch('article/getData');
				//主页轮播图
				this.axios.get('api/showIndex').then(response=>{
					this.indexPic=response.data.data;
				});
			},
			//
			onChange:function(val){
				this.$store.commit('movie/getOnMovieList',{page:val,page_size:5});	
			},
			comingChange:function(val){
				this.$store.commit('movie/getComingMovieList',{page:val,page_size:5});
			},
			articleChange:function(val){
				this.$store.commit('article/getArticleList',{page:val,page_size:5});
			}				
		},
		computed:{
				...mapState('movie',{
					getOnMovieList:state=> state.on_movie_list,
					getOnPage:state=>state.on_movie.length,
					getComingPage:state=>state.coming_movie.length,
					getComingMovieList:state=>state.coming_movie_list
				}),
				...mapState('article',{
					getArticleList:state=>state.article_list,
					getArticlePage:state=>state.article.length
				})
		}
	}
</script>
<style lang="scss" scoped>
@import '../style/base/_base.scss';
	.container{
		width:100%;
		margin:0 auto;
		.userMessage{
			@include userMessage;
		}
		.contentPic{
			padding-top:5px;
		}
		.contentMain{
			width:1150px;
			margin:30px auto 100px auto;
			.show{
				.pagination{
					@include base_el_pagination;
					border-bottom:1px solid #ddd;
					
				}
				
				.onshow{
					overflow:hidden;
					display:flex;
					flex-direction:row;
					flex-wrap:wrap;
					justify-content:space-between;
					align-items:stretch;
					align-content:flex-start;
					>div{
						width:115px;
						margin-bottom:30px;
					}
				}
			}
			.news{
				.pagination{
					@include base_el_pagination;
				}
				h2{
					font-size:16px;
					color:#25b753;
					padding:10px 0px;

				}
			}	
		}

	}


</style>














