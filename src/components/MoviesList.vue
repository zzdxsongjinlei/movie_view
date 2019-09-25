<template>
<div>
	<li class="movies" v-for="(item ,key) in list" :key="key">
		<div class="movieslist">
			<p class="left" >
				{{key+1}}:<router-link :to="{path:'/movieDetail/'+item._id}" >{{item.movieName}}
			</router-link>
			</p>
			<p class="right">下载量:<span>{{item.movieNumDownload}}</span></p>
			
		</div>
	</li>
</div>
</template>
<script>
	export default{
		name:'moviesList',
		data(){
			return{
			}
		},
		props:['list'],
		created(){
		},
		methods:{
		}
	}
</script>
<style lang="scss" scoped>
	.movies{
		list-style: none;
		.movieslist{
			padding:10px;
			font-size:12px;
			border-bottom:1px dashed #ababab;
			border-top:1px dashed #ababab;
			margin-top:-1px;
			overflow:hidden;
			font-size:13px;
			.left{
				float:left;
				a{
					font-size:12px;
					margin-left:10px;
					text-decoration:none;
					color:rgb(51,119,170);
					&:hover{
							color:#fff;
							background:rgb(51,119,170);
						}
				}
			}
			.right{
				float:right;
				color:#ddd;
				
			}
			


		}

	}
	
</style>