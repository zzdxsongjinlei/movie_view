
<template>
	<div class="container">
		<div>
			<movie-index-header/>
		</div>
		<div class="contentMain">
			<el-row :gutter="60">
				<el-col :span="14" class="main">
					<div class="show">
						<div class="pagination">
							<h2>正在上映</h2>
							<el-pagination small layout="prev, pager, next"  :page-size="5"  :total="Number(getOnPage)"  @current-change="onChange">
								
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
							<h2>最近热门的电影</h2>
						</div>
						<div class="onshow">
							<div v-for="(item,key) in getHotMovieList" :key="key">
								<movie-list :list="item" />
							</div>
						</div>
					</div>
					<div class="show">
						<div class="pagination">
							<h2>最受欢迎的影评</h2>
							<el-pagination small layout="prev, pager, next"  :page-size="5"  :total="commentList.length"  @current-change="getCommentList">
							</el-pagination>
						</div>
						<div class="comment">
							<div v-for="(item ,key) in list" :key="key">
								<movie-comment :commentList="item" />
							</div>
						</div>
					</div>
				</el-col>
				<el-col :span="10" class="sider">
					<div class="activity">
						<h2>电影活动</h2>
						<router-link :to="{}" @click.native="showMessage">
							{{activity.title}}
						</router-link>
						<p>活动将于{{activity.startTime|forMatTime}}开展，详情请戳上方链接哦</p>

					</div>
					<div>
						<h2>电影下载周榜</h2>
						<movies-list :list="getDownloadMovieList" />
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
	import {mapGetters,mapMutations,mapState}from 'vuex';
	import MovieIndexHeader from '../components/MovieIndexHeader.vue';
	import CommonFooter from '../components/CommonFooter.vue';
	import MovieList from '../components/MovieList.vue';
	import MovieComment from '../components/MovieComment.vue';
	import MoviesList from '../components/MoviesList.vue';
	

	export default{
		name:'movielist',
		data(){
			return{
				commentList:[],
				list:[],
				moviedownload:[],
				activity:''
			}
		},
		created(){

			 this.getData();		
						
		},
		methods:{
			 getData(){
				this.$store.dispatch('movie/getData');
				this.axios.post('api/movie/commentAll').then(response=>{
						response.data.data.forEach(o=>{if(o.movie_id){this.commentList.push(o)}});
						
						this.commentList.sort(function(a,b){return b.commentNumSuppose-a.commentNumSuppose});
						this.commentList.forEach((o)=>{
							this.axios.post('api/showUserByUserName',{username:o.username}).then(res=>{
								o.userImg=res.data.data[0].userImg;
								o.user_id=res.data.data[0]._id;
							});
						});	
						this.commentList.forEach((o)=>{
							this.axios.post('api/movie/movieDetail',{movie_id:o.movie_id}).then(re=>{
							
								o.movieName=re.data.data.movieName;
								o.movieImg=re.data.data.movieImg;
							});
						});		
				});
				this.axios.get('api/showActivity').then(response=>{
					this.activity=response.data.data[0];
				});										
			},
			showMessage(){
				this.mes.errorMessage('暂未开通这个链接');
			},
			getCommentList(val){
				let num=Number(val);
				this.list=this.commentList.slice((num-1)*5,num*5);
			},
			onChange(val){
				this.$store.commit('movie/getOnMovieList',{page:val,page_size:5});
			}
		},
		computed:{
			...mapState('movie',{
				getOnMovieList:state=>state.on_movie_list,
				getOnPage:state=>state.on_movie.length
			}),
			...mapGetters('movie',[
				'getHotMovieList',
				'getDownloadMovieList'
			])
		},
		components:{
			MovieIndexHeader,
			CommonFooter,
			MovieList,
			MovieComment,
			MoviesList
		}
	}
</script>
<style lang="scss" scoped>
@import '../style/base/_base.scss';
.container{
	width:100%;
	margin:0 auto;
	.contentMain{
		width:1150px;
		margin:100px auto;
		.main{
			.show{
				.pagination{
					@include base_el_pagination;
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
		}
		.sider{
			.activity{
				background:rgb(242,247,246);
				padding:18px;
				h2{
					margin-top:0px;
					margin-bottom:0px;
				}
				a{
					@include base_link;
				}
				p{
					font-size:13px;
					margin-top:10px;
				}
			}
		
			h2{
				font-size:16px;
				color:#25b753;
				padding:10px 0px;
				margin-top:30px;
				margin-bottom:10px;
			}
		}
		
	}
}
</style>