<template>
<div>
	<div class="movieList">
		<el-popover placement="right"  trigger="hover" offset="20" width="180" >
			<div class="hidden" style="padding:28px 0px">
				<h3 >{{list.movieName}} </h3>
				<p style="margin:15px 0px">***{{list.movieMark}}***({{list.movieNumDownload}}人想看)</p>
				<P style="margin-bottom:15px"><span>{{list.movieDuration}}分钟   </span><span>{{list.movieCountry}}</span></P>
				<p style="margin-bottom:15px; overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">导演: <span>{{list.movieDirector}}</span></p>
				<p  style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">演员: <span>{{list.movieActor}}</span></p>
			</div>
			<div slot="reference">
				<router-link :to="{path:'/movieDetail/'+list._id}">
					<img :src="list.movieImg">
					<h3>{{list.movieName}}</h3>
				</router-link>
				<p>
					<el-rate  v-model="list.movieMark" disabled show-score text-color="#ff9900" >
					</el-rate>
				</p>
				<button @click="btnBuy">选座购票</button>
			</div>
		</el-popover>
	</div>
</div>
</template>
<script>
	export default{
		data(){
			return{
			}
		},
		props:['list'],
		created(){

		},
		methods:{
			btnBuy(){
				this.$router.push({path:'/movieBuy'})
			}
		}

	}
</script>
<style lang="scss">
.movieList{
	.el-rate{
		.el-rate__item{
			.el-rate__icon{
				margin-right:0px;
			}
		}

	}
}
</style>
<style lang="scss" scoped>
@import '../style/base/_base.scss';

.movieList{
	text-align:center;

	.hidden{
		overflow:hidden
	}
	h3{
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap;
		font-size:14px;
		text-align:center;
		color:#000;
		text-decoration:none;
		margin-top:10px;
	}
	p{
		margin:5px 0px;
		text-align:center;
		font-size:10px;
	}
	button{
		@include base_button;
	}
	img{
		width:115px;
		height:160.5px;
	}
	
}
</style>