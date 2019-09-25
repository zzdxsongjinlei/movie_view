<template>
<div>
	<li class="newslist" v-for="(item ,key) in list" :key="key">
		<div class="newsList">
			<router-link :to="{path:'/newDetail/'+item._id}" class="goods-list-link" >
				{{item.articleTitle}}
			</router-link>
		</div>
	</li>
</div>
</template>
<script>
	export default{
		name:'newsList',
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
@import '../style/base/_base.scss';
	.newslist{
		list-style: none;
		.newsList{
			padding:10px;
			border-bottom:1px dashed #ababab;
			border-top:1px dashed #ababab;
			margin-top:-1px;
			overflow:hidden;	
			a{
				@include  base_link;
			}
		}

	}
	
</style>